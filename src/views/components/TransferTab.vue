<template>
  <div class="form__wrapper">
    <form
      action="#"
      class="converter__form"
    >
      <TransferVariantCoin
        v-model="coinAmount"
        :fiat-amount="fiatAmount"
        :exchange-rate="exchangeRate"
        :coin-list="coinList"
      />

      <template v-if="transferable">
        <TransferVariantPayment
          v-model="fiatAmount"
          :coin-amount="coinAmount"
          :exchange-rate="exchangeRate"
        />

        <!-- PRIVATE KEY FIELD -->
        <PrivateKeyModal
          :visible="privateKeyModalVisible"
          @close="privateKeyModalVisible = false"
        />

        <gas-row :service-fees="serviceFees" />

        <buttons-row />

        <custom-info-row />

        <video-card />
      </template>

      <template v-else>
        <div class="px-5 py-3">
          <p
            class="converter__text text-center px-10"
            :class="{ light__font_two: light}"
          >
            Due to an overwhelming response and high demand,
            transfers have been temporarily placed on hold and
            will resume as soon as possible.
          </p>

          <p
            class="converter__text text-center py-3"
            :class="{ light__font_two: light}"
          >
            Apologies for the inconvenience.
          </p>
        </div>
      </template>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import TransferVariantCoin from "@/components/transferTab/TransferVariantCoin.vue";
  import TransferVariantPayment from "@/components/transferTab/TransferVariantPayment.vue";
  import ConnectWalletButton from "@/components/transferTab/ConnectWalletButton.vue";
  import CButton from "@/components/tags/cButton.vue";
  import VideoCard from "@/components/transferTab/VideoCard.vue";
  import PrivateKeyModal from "@/components/modals/PrivateKeyModal.vue";
  import GasRow from "@/components/transferTab/GasRow.vue";
  import CustomInfoRow from "@/components/transferTab/CustomInfoRow.vue";
  import ButtonsRow from "@/components/transferTab/ButtonsRow.vue";
  import * as signalR from "@microsoft/signalr";
  import axios from "axios";
  import Entity from '@/interfaces/Entity';
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import MetamaskService from '@/MetamaskService';
  import { getAfterCommaSigns, rounded } from '@/utils/utils';
  import { erc20TokenContractAbi } from '@/constants';

  const baseURL = "https://api-cash4crypto.azurewebsites.net/api"
  type GasInfo = {
    mediumGasPrice: number;
    gasLimit: number;
  };

  @Component({
    name: 'TransferTab',
    components: {
      ButtonsRow,
      CustomInfoRow,
      GasRow,
      PrivateKeyModal,
      VideoCard,
      CButton,
      ConnectWalletButton,
      TransferVariantPayment,
      TransferVariantCoin
    }
  })

  export default class TransferTab extends Vue {

    public coinAmount = 0
    public fiatAmount = 0
    public exchangeRate = 0
    public transferable = true
    public privateKeyModalVisible = false
    public connection: signalR.HubConnection | null = null
    public connectionHeartBeat: signalR.HubConnection | null = null

    public coinList: (CommonSelectBox & {
      contractAddress: string;
    })[] = [];

    public maxCoinPrecisions = 2
    public maxFiatPrecisions = 2

    public estimatedGas: GasInfo = {
      gasLimit: -1,
      mediumGasPrice: -1
    }
    public getGasIntervalID = setInterval(this.getGas, 30000)

    public balance = 0;
    public account = '';

    /** ------------------------------------------------------- **/
    /** ------------------------------------------------------- **/

    get light () {
      return this.$store.getters.theme == 'light'
    }

    get serviceFees() {
      return rounded(
        MetamaskService.getFees(
          this.coinAmount * this.exchangeRate
        )
      );
    }

    get currentCoin() {
      return this.$store.getters.coin
    }

    get currentFiat() {
      return this.$store.getters.fiat
    }

    /** ------------------------------------------------------- **/

    @Watch('currentCoin')
    async onChangeCoin(nVal: any, oVal: any) {
      if (this.connection) {
        await this.connection.invoke(
          'Unsubscribe',
          oVal.id,
          this.currentFiat.id,
        )

        await this.connection.invoke(
          'Subscribe',
          nVal.id,
          this.currentFiat.id
        )

        if (nVal) {
          // console.log('balance', this.balance)
          const balance = await MetamaskService.getBalance(this.account, nVal)
          // console.log('new balance', balance)
          this.balance = parseFloat(parseFloat(balance.toString()).toFixed(4))
          // console.log('new balance', this.balance)
        }

        await this.updateEstimatedGas()
      }
    }

    @Watch('currentFiat', { immediate: true, deep: true })
    async onChangeFiat(nVal: any, oVal: any) {
      if (this.connection) {
        await this.connection.invoke(
          'Unsubscribe',
          this.currentCoin.id,
          oVal.id,
        )

        await this.connection.invoke(
          'Subscribe',
          this.currentCoin.id,
          nVal.id,
        )
      }

      await this.updateEstimatedGas()
    }

    /** ------------------------------------------------------- **/

    async created() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseURL}/exchangeRateHub`)
        .withAutomaticReconnect()
        .build();

      this.connection.on("NewExchangeRate", (data) => {
        if (
          this.$store.getters.coinType === data.cryptocurrency &&
          this.$store.getters.fiatType.value === data.currency
        ) {
          this.exchangeRate = +data.amount;
          if (this.exchangeRate <= 1) {
            this.maxCoinPrecisions = 2
          } else {
            this.maxCoinPrecisions = 5
          }

          // this.minCoinAmount = 0.01 / this.currencyExchangeRate;
          // this.maxCoinPrecisions = getAfterCommaSigns(this.minCoinAmount);
          // console.log("received new exchange rate:", this.currencyExchangeRate);
        }
      });

      await this.connection.start();
      await this.loadFiatList();
      await this.loadCoinList();
      await this.updateEstimatedGas();

      this.connectionHeartBeat = new signalR.HubConnectionBuilder()
        .withUrl(`${baseURL}/heartbeatHub`)
        .withAutomaticReconnect()
        .build();

      this.connectionHeartBeat.on("heartbeat", (heartbeat) => {
        this.transferable = heartbeat
        // console.log('heartbeat', this.transferable, heartbeat)
      })

      await this.connectionHeartBeat.start();
    }

    public async loadFiatList() {
      const response = await axios.get(`${baseURL}/supported-tokens/currencies`);
      this.$store.commit('setFiatList', response.data)
    }

    public async loadCoinList() {
      const response = await axios.get<Entity[]>(
        `${baseURL}/supported-tokens/cryptocurrencies`
      )
      // console.log(response);

      this.coinList = response.data
        .map((crypto) => ({
          ...crypto,
          value: crypto.name.toLowerCase(),
          icon: `coins/${crypto.name.toLowerCase()}.svg`,
          isAllowed: true,
          contractAddress: '',
        }))

      if (process.env.NODE_ENV === 'development') {
        this.coinList = this.coinList.map(i => ({
          ...i,
          contractAddress: '0xf6fe970533fe5c63d196139b14522eb2956f8621' // TENJ
        }))
      }

      this.$store.commit('setCoin', this.coinList[0])
      if (this.connection) {
        await this.connection.invoke(
          'Subscribe',
          this.coinList[0].id,
          this.$store.getters.fiat.id
        )
      }
    }

    public updateEstimatedGas () {
      if (this.getGasIntervalID) {
        clearInterval(this.getGasIntervalID)
      }
      this.getGas()
      this.getGasIntervalID = setInterval(this.getGas, 30000)
    }

    /** -----------------------------Get Gas---------------------------- **/

    public async getGas ()/*: Promise<GasInfo>*/ {
      console.log('getGas CALLED')
      let gasLimit = 21000

      const coin = this.currentCoin

      if (!coin) {
        return {
          gasLimit: -1,
          mediumGasPrice: -99
        }
      }

      if (coin.value.toLowerCase() !== 'eth') {
        const { contractInstance, decimals } = await this.getContractInstanceAndDecimals(coin)
        const tokenDecimals = window.web3.utils.toBN(decimals)

        // console.log("got token decimals", tokenDecimals);
        const serviceFeePercent = MetamaskService.getFeesPercent(
          +this.coinAmount * this.exchangeRate
        )
        const amountToSend = '' + (this.coinAmount + this.coinAmount * serviceFeePercent)

        // web3 library does not understand decimals
        const countAfterComma = getAfterCommaSigns(amountToSend)
        const integerTransferAmount = '' + Math.floor(+amountToSend * (10 ** countAfterComma))

        // console.log("integerTransferAmount: ", integerTransferAmount);

        // WARNING here - the order of mul and div is IMPORTANT
        // WARNING here - it's important for it to be 10 ** countAfterComma since countAfterComma here is a number not a BN.
        // warning please be thriple careful before messing up with this code.
        const calculatedTransferValue = window.web3.utils.toBN(integerTransferAmount)
          .mul(window.web3.utils.toBN(10).pow(tokenDecimals)) // multiply by ERC20 token decimals
          .div(window.web3.utils.toBN(10 ** countAfterComma)) // return the actual amount (we multiplied it earlier to get rid of decimal)

        // console.log("calculatedTransferValue", calculatedTransferValue);

        // random address just to estimate gas
        const receiver = '0xF231C3443c2725E534c828B1e42e71c16875d0f3' // TBD - replace with our address - estimate how crucial it is
        const sender = window.web3.currentProvider.selectedAddress

        // console.log("sender: ", sender);
        // using the promise
        await contractInstance.methods.transfer(receiver, calculatedTransferValue)
          .estimateGas({ from: sender }, function (error, gasAmount) {
            // console.log("got gas amount: ", gasAmount);
            // console.log("got error: ", error);

            gasLimit = gasAmount
          })

        // console.log("fetched gas limit to be", gasLimit);
      }

      const gasPriceResponse = await axios.get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=M18A5B2C77P86CC29B34NT15H7SDWU51Y2'
      )

      const med = gasPriceResponse.data.result.ProposeGasPrice * 1_000_000_000

      const gasInfo: GasInfo = {
        gasLimit: gasLimit,
        mediumGasPrice: med
      }

      // console.log("gasinfo:", gasInfo);

      this.estimatedGas = gasInfo
    }

    private async getContractInstanceAndDecimals (coin: any) {
      const contractInstance = this.getContractInstance(coin.contractAddress)
      const decimals = await contractInstance.methods.decimals().call()
      return { contractInstance, decimals }
    }

    public getContractInstance (contractAddress: string) {
      const tokenContract = new web3.eth.Contract(
        erc20TokenContractAbi,
        contractAddress
      )

      return tokenContract
    }

    /** ---------------------------------------------------------- **/


  }

</script>
