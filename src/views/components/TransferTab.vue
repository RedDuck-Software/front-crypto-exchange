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
        :balance="balance"
      />

      <template v-if="transferable">
        <TransferVariantPayment
          v-model="fiatAmount"
          :coin-amount="coinAmount"
          :exchange-rate="exchangeRate"
          :is-limit-exceed="isLimitExceed"
        />

        <!-- PRIVATE KEY FIELD -->
        <PrivateKeyModal
          :visible="privateKeyModalVisible"
          @close="privateKeyModalVisible = false"
        />

        <gas-row :service-fees="serviceFees" />

        <buttons-row
          v-model="account"
          :transfer-now-disabled="transferNowDisabled"
        />

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
  import {getAfterCommaSigns, rounded, toMaxPrecisions} from '@/utils/utils';
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
    public exchangeRate = 1.023
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
    public ethBalance = 0;
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

    get isLimitExceed() {
      console.log('TransferTab-isLimitExceed')
      let coinFee = this.exchangeRate ? this.serviceFees / this.exchangeRate : 0
      coinFee = +toMaxPrecisions(''+coinFee, this.maxCoinPrecisions)

      if (!this.account) return false
      if (!this.currentCoin) return false

      const userEthAmount = this.ethBalance
      const gasInEthAmount =
        (this.estimatedGas.mediumGasPrice * this.estimatedGas.gasLimit) /
        1_000_000_000 /
        1_000_000_000

      if (userEthAmount < gasInEthAmount) return true

      let summedPrice = this.coinAmount + +coinFee
      if (this.currentCoin.value === 'eth') {
        summedPrice += gasInEthAmount
      }
      return summedPrice > this.balance
    }

    get payment() {
      return this.$store.getters.payment
    }

    get desEmail() {
      return this.$store.getters.desEmail
    }

    get transferNowDisabled () {
      return (
        !this.account ||
        (this.fiatAmount && this.fiatAmount > 200) ||
        !this.coinAmount || this.coinAmount <= 0 ||
        this.isLimitExceed ||
        !this.payment || !this.desEmail
      )
    }

    /** ------------------------------------------------------- **/

    @Watch('$store.getters.coin')
    async onChangeCoin(nVal: any, oVal: any) {
      console.log('TransferTab-onChangeCoin', nVal, oVal)
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
          const balance = await MetamaskService.getBalance(this.account, nVal)
          this.balance = parseFloat(parseFloat(balance.toString()).toFixed(4))
        }

        await this.updateEstimatedGas()
      }
    }

    @Watch('$store.getters.fiat', { immediate: true, deep: true })
    async onChangeFiat(nVal: any, oVal: any) {
      console.log('TransferTab-onChangeFiat', nVal, oVal)
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

    @Watch('account')
    async onChangeAccount() {
      console.log('TransferTab-onChangeAccount')
      let balance = 0
      let ethBalance = 0
      const coin = this.currentCoin
      if (coin) {
        balance = await MetamaskService.getBalance(this.account, coin)
        ethBalance = await MetamaskService.getEthBalancePromise(this.account)
      }

      this.balance = parseFloat(parseFloat(balance.toString()).toFixed(4))
      this.ethBalance = ethBalance
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
          this.currentFiat.id
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
      const fakeGas = Math.floor(Math.random() * (5 - 1) + 1) / 100
      console.log('TransferTab-getGas CALLED', fakeGas)
      return this.estimatedGas = {
        gasLimit: fakeGas,
        mediumGasPrice: 1
      }
      // TODO uncomment below code
    }

    /** ---------------------------------------------------------- **/


  }

</script>
