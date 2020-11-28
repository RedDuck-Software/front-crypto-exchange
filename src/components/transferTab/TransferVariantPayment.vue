<template>
  <transfer-variant
    variant="fiat"
  >
    <template v-slot:selection>
      <c-select-box
        v-model="selected"
        :items="paymentSystems"
        :multistep="true"
        @change="changePayment"
      />
    </template>

    <template v-slot:errorMessage>
      <span
        v-if="error"
        class="validation-result-money from__result-money"
      >
        Insufficient Funds
      </span>
    </template>

    <template v-slot:input>
      <c-input
        v-model="amount"
        :icon="icon"
        :append="$store.getters.fiatType.text"
        :limit="[0, 200]"
        :max-precisions="maxPrecisions"
        @change="changeFiatAmount(value = $event)"
        variant="fiat"
      />
    </template>
  </transfer-variant>
</template>

<script lang="ts">
  import { Component, Vue, Watch, Prop, Emit, Model } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/transferTab/TransferVariant.vue";
  import CSelectBox from "@/components/tags/cSelectBox.vue";
  import CInput from "@/components/tags/cInput.vue";
  import {toMaxPrecisions} from "@/utils/utils";

  @Component({
    name: 'TransferVariantPayment',
    components: { CInput, CSelectBox, TransferVariant }
  })

  export default class TransferVariantPayment extends Vue {

    @Model("change") fiatAmount!: number
    @Prop() coinAmount!: number
    @Prop({default: 1}) exchangeRate!: number
    public maxPrecisions = 2
    public selected = {} as CommonSelectBox
    public amount = 0
    public error = true
    public paymentSystems: CommonSelectBox[] = [
      {
        id: 1,
        name: 'PayPal',
        value: 'paypal',
        icon: 'logos/paypal.svg',
        logo: 'logos/paypal.png',
        isAllowed: true
      },
      {
        id: 2,
        name: 'Revolut',
        value: 'revolut',
        icon: 'logos/revolut-2.svg',
        logo: 'logos/Revolut.svg',
        isAllowed: false
      }
    ];

    /** ------------------------------------------------------------------ **/

    get icon () {
      return this.$store.getters.fiatType.text == 'USD' ? 'fas fa-dollar-sign' : 'fas fa-euro-sign'
    }

    /** ------------------------------------------------------------------ **/

    @Watch('coinAmount')
    onChangeCoinAmount() {
      // console.log("onChangeCoinAmount")
      if (this.$store.getters.typingActive != 'fiat') {
        const amount = this.coinAmount * this.exchangeRate
        this.amount = +toMaxPrecisions(amount + "", this.maxPrecisions)
      }
    }

    /** ------------------------------------------------------------------ **/

    public changePayment() {
      // console.log("changePayment")
    }

    @Emit("change")
    public changeFiatAmount(value: number) {
      // console.log("changeFiatAmount")
      return value
    }
  }
</script>

<style scoped src="@/assets/css/transferTab.css">
</style>
