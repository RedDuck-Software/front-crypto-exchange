<template>
  <transfer-variant>
    <template v-slot:selection>
      <c-select-box
        v-model="selectedCoin"
        :items="coinList"
        :balance="'0'"
        @change="changeCoin"
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
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/transferTab/TransferVariant.vue";
  import {getAfterCommaSigns, toMaxPrecisions} from '@/utils/utils';
  import CSelectBox from "@/components/tags/cSelectBox.vue";
  import CInput from "@/components/tags/cInput.vue";

  @Component({
    name: 'TransferVariantCoin',
    components: {CInput, CSelectBox, TransferVariant}
  })

  export default class TransferVariantCoin extends Vue {

    @Model("change") coinAmount!: number
    @Prop() fiatAmount!: number
    @Prop({default: 1}) exchangeRate!: number
    @Prop() coinList!: CommonSelectBox & { contractAddress: string }
    public amount = 0
    public selectedCoin = {
      contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
      icon: "coins/usdc.svg",
      id: 10,
      isAllowed: true,
      name: "USDC",
      value: "usdc",
      logo: '',
    }

    public cryptoCurrencies: (CommonSelectBox & {
      contractAddress: string;
    })[] = [
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "coins/usdc.svg",
        id: 10,
        isAllowed: true,
        name: "USDC",
        value: "usdc",
        logo: '',
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "coins/usdt.svg",
        id: 13,
        isAllowed: true,
        name: "USDT",
        value: "usdt",
        logo: ''
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "coins/pax.svg",
        id: 14,
        isAllowed: true,
        name: "PAX",
        value: "pax",
        logo: ''
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "coins/eth.svg",
        id: 2,
        isAllowed: true,
        name: "ETH",
        value: "eth",
        logo: ''
      }
    ];

    public value = '0';
    public maxPrecisions = 3

    /** ----------------------------------------------------------------- **/

    /** ----------------------------------------------------------------- **/

    @Watch("fiatAmount")
    onChangeFiatAmount() {
      // console.log("onChangeFiatAmount")
      if (this.$store.getters.typingActive != 'coin') {
        const amount = this.fiatAmount / this.exchangeRate
        this.amount = +toMaxPrecisions(amount + "", this.maxPrecisions)
      }
    }

    /** ----------------------------------------------------------------- **/

    public changeCoin() {
      // console.log('changeCoin', this.selectedCoin)
    }

    @Emit("change")
    public changeCoinAmount(value: number) {
      // console.log("changeCoinAmount", this.$store.getters.typingActive, value, this.amount)
      return value
    }
  }
</script>

<style scoped src="@/assets/css/transferTab.css" />
