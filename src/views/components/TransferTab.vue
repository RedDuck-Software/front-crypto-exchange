<template>
  <div class="form__wrapper">
    <form
      action="#"
      class="converter__form"
    >
    <div class="arrow-down mx-auto mt-16" />
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
          class="mb-3"
        />

        <!-- PRIVATE KEY FIELD -->
        <PrivateKeyModal
          :visible="privateKeyModalVisible"
          @close="privateKeyModalVisible = false"
        />

        <gas-row :service-fees="serviceFees" />

        <buttons-row
          v-model="account"
          :coin-amount="coinAmount"
          :transfer-now-disabled="transferNowDisabled"
          @send="sendMoney"
        />

        <transfer-modal
          :error="transferError"
          :loading="isTransferModalProcessing"
          :visible="transferModalVisible"
          :txID="txID"
          @close="transferModalVisible = false"
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
import TransferVariantCoin from '@/components/transferTab/TransferVariantCoin.vue'
import TransferVariantPayment from '@/components/transferTab/TransferVariantPayment.vue'
import ConnectWalletButton from '@/components/transferTab/ConnectWalletButton.vue'
import CButton from '@/components/tags/cButton.vue'
import VideoCard from '@/components/transferTab/VideoCard.vue'
import PrivateKeyModal from '@/components/modals/PrivateKeyModal.vue'
import GasRow from '@/components/transferTab/GasRow.vue'
import CustomInfoRow from '@/components/transferTab/CustomInfoRow.vue'
import ButtonsRow from '@/components/transferTab/ButtonsRow.vue'
import TransferModal from '@/components/modals/TransferModal.vue'

import * as signalR from '@microsoft/signalr'
import axios from 'axios'
import Entity from '@/interfaces/Entity'
import CommonSelectBox from '@/interfaces/CommonSelectBox'
import MetamaskService from '@/MetamaskService'
import { getAfterCommaSigns, rounded, toMaxPrecisions } from '@/utils/utils'
import { erc20TokenContractAbi } from '@/constants'
import { ethers } from 'ethers'
import Web3 from 'web3'

const baseURL = 'https://api-cash4crypto.azurewebsites.net/api'
const provider = new ethers.providers.Web3Provider(web3.currentProvider)

  type GasInfo = {
    mediumGasPrice: number;
    gasLimit: number;
  };

  @Component({
    name: 'TransferTab',
    components: {
      TransferModal,
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
    public ethBalance = 0;
    public account = '';

    public transferError = ''
    public txID = ''
    public isTransferModalProcessing = false
    public transferModalVisible = false

    /** ------------------------------------------------------- **/
    /** ------------------------------------------------------- **/

    get light () {
      return this.$store.getters.theme === 'light'
    }

    get serviceFees () {
      return rounded(
        MetamaskService.getFees(
          this.coinAmount * this.exchangeRate
        )
      )
    }

    get currentCoin () {
      return this.$store.getters.coin
    }

    get currentFiat () {
      return this.$store.getters.fiat
    }

    get payment () {
      return this.$store.getters.payment
    }

    get desEmail () {
      return this.$store.getters.desEmail
    }

    get isLimitExceed () {
      if (!this.account) return false
      if (!this.currentCoin) return false

      // console.log('TransferTab-isLimitExceed')
      let coinFee = this.exchangeRate ? this.serviceFees / this.exchangeRate : 0
      coinFee = +toMaxPrecisions('' + coinFee, this.maxCoinPrecisions)
      // console.log('coinFee', coinFee)

      const userEthAmount = this.ethBalance
      const gasInEthAmount =
        (this.estimatedGas.mediumGasPrice * this.estimatedGas.gasLimit) /
        1_000_000_000 /
        1_000_000_000

      // console.log('gasInEthAmount', gasInEthAmount)
      // console.log('userEthAmount', userEthAmount)

      if (userEthAmount < gasInEthAmount) return true

      let summedPrice = +this.coinAmount + +coinFee
      console.log('summedPrice', summedPrice)
      if (this.currentCoin.value === 'eth') {
        summedPrice += gasInEthAmount
      }
      return summedPrice > this.balance
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

    get amountToSend () {
      const serviceFeePercent = MetamaskService.getFeesPercent(
        this.coinAmount * this.exchangeRate
      )
      return '' + (+this.coinAmount + +this.coinAmount * serviceFeePercent)
    }

    /** ------------------------------------------------------- **/

    @Watch('$store.getters.coin')
    async onChangeCoin (nVal: any, oVal: any) {
      // console.log('TransferTab-onChangeCoin', nVal, oVal)
      if (this.connection) {
        if (oVal.id && this.currentFiat.id) {
          console.log('TransferTab-onChangeCoin unsubscribe', oVal, this.currentFiat)
          await this.connection.invoke(
            'Unsubscribe',
            oVal.id,
            this.currentFiat.id
          )
        }

        await this.connection.invoke(
          'Subscribe',
          nVal.id,
          this.currentFiat.id
        )

        if (nVal && this.account) {
          const balance = await MetamaskService.getBalance(this.account, nVal)
          // this.balance = parseFloat(parseFloat(balance.toString()).toFixed(4))
          this.balance = balance
          // console.log('balance', balance)
        }

        await this.updateEstimatedGas()
      }
    }

    @Watch('$store.getters.fiat', { immediate: true, deep: true })
    async onChangeFiat (nVal: any, oVal: any) {
      // console.log('TransferTab-onChangeFiat', nVal, oVal)
      if (this.connection) {
        if (oVal.id && this.currentCoin.id) {
          // console.log('TransferTab-onChangeFiat unsubscribe', oVal.id, this.currentCoin.id)
          await this.connection.invoke(
            'Unsubscribe',
            this.currentCoin.id,
            oVal.id
          )

          await this.connection.invoke(
            'Subscribe',
            this.currentCoin.id,
            nVal.id
          )
        }
      }

      await this.updateEstimatedGas()
    }

    @Watch('account')
    async onChangeAccount () {
      // console.log('TransferTab-onChangeAccount')
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

    async created () {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseURL}/exchangeRateHub`)
        .withAutomaticReconnect()
        .build()

      this.connection.on('NewExchangeRate', (data) => {
        if (
          this.$store.getters.coin.id === data.cryptocurrency &&
          this.$store.getters.fiat.id === data.currency
        ) {
          this.exchangeRate = +data.amount
          if (this.exchangeRate <= 1) {
            this.maxCoinPrecisions = 2
          } else {
            this.maxCoinPrecisions = 5
          }

          // this.minCoinAmount = 0.01 / this.currencyExchangeRate;
          // this.maxCoinPrecisions = getAfterCommaSigns(this.minCoinAmount);
          // console.log("received new exchange rate:", this.currencyExchangeRate);
        }
      })

      await this.connection.start()
      await this.loadFiatList()
      await this.loadCoinList()
      await this.updateEstimatedGas()

      this.connectionHeartBeat = new signalR.HubConnectionBuilder()
        .withUrl(`${baseURL}/heartbeatHub`)
        .withAutomaticReconnect()
        .build()

      this.connectionHeartBeat.on('heartbeat', (heartbeat) => {
        this.transferable = true // TODO set this value to "heartbeat"
        // console.log('heartbeat', this.transferable, heartbeat)
      })

      await this.connectionHeartBeat.start()
    }

    public async loadFiatList () {
      const response = await axios.get(`${baseURL}/supported-tokens/currencies`)
      this.$store.commit('setFiatList', response.data)
      this.$store.commit('setFiat', response.data[0])
    }

    public async loadCoinList () {
      const response = await axios.get<Entity[]>(
        `${baseURL}/supported-tokens/cryptocurrencies`
      )

      this.coinList = response.data
        .map((crypto) => ({
          ...crypto,
          value: crypto.name.toLowerCase(),
          icon: `coins/${crypto.name.toLowerCase()}.svg`,
          isAllowed: true,
          contractAddress: ''
        }))

      if (process.env.NODE_ENV === 'development') {
        this.coinList = this.coinList.map(i => ({
          ...i,
          contractAddress: '0xf6fe970533fe5c63d196139b14522eb2956f8621' // TENJ
        }))
      }
    }

    public async updateEstimatedGas () {
      if (this.getGasIntervalID) {
        clearInterval(this.getGasIntervalID)
      }
      await this.getGas()
      this.getGasIntervalID = setInterval(this.getGas, 30000)
    }

    /** -------------------------Get Gas------------------------- **/

    public async getGas ()/*: Promise<GasInfo> */ {
      let gasLimit = 21000

      const coin = this.currentCoin
      if (!coin.value) {
        return {
          gasLimit: -1,
          mediumGasPrice: -99
        }
      }

      if (coin.value.toLowerCase() !== 'eth') {
        const amountToSend = this.amountToSend
        const contractInstance = await this.getContractInstance(coin.contractAddress)
        const calculatedTransferValue = this.getTransferValue(contractInstance, amountToSend)

        // random address just to estimate gas
        const receiver = '0xF231C3443c2725E534c828B1e42e71c16875d0f3' // TBD - replace with our address - estimate how crucial it is
        const sender = await provider.getSigner().getAddress()

        // using the promise
        const gasLimitBN = await contractInstance.estimateGas.transfer(receiver,
          calculatedTransferValue, { from: sender })
        gasLimit = gasLimitBN.toNumber()

        // console.log('fetched gas limit to be', gasLimit)
      }

      const gasPriceResponse = await axios.get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=M18A5B2C77P86CC29B34NT15H7SDWU51Y2'
      )

      const med = gasPriceResponse.data.result.ProposeGasPrice * 1_000_000_000

      const gasInfo: GasInfo = {
        gasLimit: gasLimit,
        mediumGasPrice: med
      }

      this.estimatedGas = gasInfo
    }

    public getContractInstance (contractAddress: string) {
      const tokenContract = new ethers.Contract(
        contractAddress,
        erc20TokenContractAbi,
        provider.getSigner()
      )

      return tokenContract
    }

    public async getTransferValue (contractInstance: ethers.Contract, amountToSend: string) {
      const decimals = await contractInstance.decimals()
      const tokenDecimals = ethers.BigNumber.from(decimals)

      const countAfterComma = getAfterCommaSigns(amountToSend)
      const integerTransferAmount = '' + Math.floor(+amountToSend * (10 ** countAfterComma))

      // WARNING here - the order of mul and div is IMPORTANT
      // WARNING here - it's important for it to be 10 ** countAfterComma since countAfterComma here is a number not a BN.
      // warning please be thriple careful before messing up with this code.
      const calculatedTransferValue = ethers.BigNumber.from(integerTransferAmount)
        .mul(ethers.BigNumber.from(10).pow(tokenDecimals)) // multiply by ERC20 token decimals
        .div(ethers.BigNumber.from(10 ** countAfterComma)) // return the actual amount (we multiplied it earlier to get rid of decimal)

      return calculatedTransferValue
    }

    /** ---------------------------------------------------------- **/

    public async sendMoney () {
      this.transferError = ''
      this.isTransferModalProcessing = true
      this.transferModalVisible = true

      // TODO unchecked
      console.log('sendMoney CALLED')
      const response = await axios.post(`${baseURL}/prepare-transfer`, {
        email: this.desEmail,
        currency: this.currentFiat.id,
        cryptocurrency: this.currentCoin.id,
        destination: this.payment.id
      })

      console.log('after prepare-transfer')
      // eslint-disable-next-line no-undef
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const receiver = response.data
      const coin = this.currentCoin

      // set values to strings because that's all web3 understands
      const gasPrice = ethers.utils.hexlify(ethers.BigNumber.from('' + this.estimatedGas.mediumGasPrice))
      const gasLimit = ethers.utils.hexlify(ethers.BigNumber.from('' + this.estimatedGas.gasLimit))
      let amountToSend = this.amountToSend

      if (coin.value.toLowerCase() === 'eth') {
        // console.log("setting gas to: ", gasLimit);
        // console.log("setting gasPrice to:", gasPrice);
        // console.log("truncating precision to WEI because it's eth - 18");

        amountToSend = (+amountToSend).toFixed(18)
        // console.log("new amount to send: ", amountToSend);

        console.log('eth before sendTransaction, amountToSend: ', amountToSend)
        await provider.getSigner().sendTransaction(
          {
            to: receiver,
            nonce: 0,
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            data: '0x',
            value: amountToSend,
            chainId: 3 // TODO check this code
          }
        ).then((res) => {
          console.log('response', res)
          this.txID = res.raw || ''
          console.log('TxID:', this.txID)
          this.isTransferModalProcessing = false
        }).catch(err => {
          if (err) {
            this.transferError = 'Transfer cancelled'
          }
        }).finally(() => {
          // TODO this.updateCoinAmount('0')
        })
      } else {
        const contractInstance = await this.getContractInstance(coin.contractAddress)
        const calculatedTransferValue = await this.getTransferValue(contractInstance, amountToSend)
        // console.log('calculatedTransferValue', calculatedTransferValue)

        const transaction = {
          to: receiver,
          value: calculatedTransferValue,
          gasLimit: gasLimit,
          gasPrice: gasPrice
        }
        console.log('before sendTransaction, amountToSend: ', amountToSend)
        await contractInstance.signer.sendTransaction(transaction)
          .then((res) => {
            console.log('response', res)
            this.txID = res.raw || ''
            console.log('TxID:', this.txID)
          }).catch((e) => {
            console.log('error', e)
            this.transferError = 'Transfer cancelled'
            this.isTransferModalProcessing = false
          }).finally(() => {
            console.log('finally')
          })
      }
    }
}

</script>
