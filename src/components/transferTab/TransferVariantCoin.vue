<template>
  <transfer-variant>
    <template v-slot:selection>
      <c-select-box
        v-model="coin"
        :items="coinList"
        :balance="balance"
      />
    </template>

    <template v-slot:input>
      <c-input
        v-model="amount"
        :max-precisions="maxPrecisions"
        variant="coin"
        @change="changeCoinAmount(value = $event)"
      />
    </template>
  </transfer-variant>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Model } from 'vue-property-decorator'
import CommonSelectBox from '@/interfaces/CommonSelectBox'
import TransferVariant from '@/components/transferTab/TransferVariant.vue'
// eslint-disable-next-line no-unused-vars
import { getAfterCommaSigns, toMaxPrecisions } from '@/utils/utils'
import CSelectBox from '@/components/tags/cSelectBox.vue'
import CInput from '@/components/tags/cInput.vue'

  @Component({
    name: 'TransferVariantCoin',
    components: { CInput, CSelectBox, TransferVariant }
  })

export default class TransferVariantCoin extends Vue {
    @Model('change') coinAmount!: number
    @Prop() fiatAmount!: number
    @Prop() balance!: number
    @Prop() exchangeRate!: number
    @Prop() coinList!: (CommonSelectBox & { contractAddress: string })[]
    public amount = 0
    public coin = {} as CommonSelectBox & { contractAddress: string }
    public value = '0';
    public maxPrecisions = 3

    /** ----------------------------------------------------------------- **/

    /** ----------------------------------------------------------------- **/

    @Watch('coin')
    onChangeCoin () {
      // console.log('TransferVariantCoin-onChangeCoin', this.coin)
      this.$store.commit('setCoin', this.coin)
    }

    @Watch('fiatAmount')
    onChangeFiatAmount () {
      // console.log('TransferVariantCoin-onChangeFiatAmount', this.fiatAmount)
      this.computeCoinAmount()
    }

    @Watch('exchangeRate')
    onChangeRate () {
      this.computeCoinAmount()
    }

    @Watch('coinList')
    onUpdateCoinList () {
      // console.log('coinList', this.coinList)
      if (this.coinList) {
        this.coin = this.coinList[0]
      }
    }

    /** ----------------------------------------------------------------- **/

    @Emit('change')
    public changeCoinAmount (value: number) {
      // console.log('TransferVariantCoin-changeCoinAmount', this.$store.getters.typingActive, value, this.amount)
      return value
    }

    /** ----------------------------------------------------------------- **/

    public computeCoinAmount () {
      if (this.$store.getters.typingActive !== 'coin') {
        if (this.exchangeRate) {
          const amount = this.fiatAmount / this.exchangeRate
          this.amount = +toMaxPrecisions(amount + '', this.maxPrecisions)
        } else {
          this.amount = 0
        }
      }
      // console.log('TransferVariantCoin-computeCoinAmount', this.$store.getters.typingActive, this.amount)
    }
}
</script>

<style scoped src="@/assets/css/transferTab.css" />
