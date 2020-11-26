<template>
  <transfer-variant>
    <template v-slot:selection>
      <c-select-box
        v-model="selectedCoin"
        :items="cryptoCurrencies"
        :balance="'0'"
        @change="changeCoin"
      />
    </template>

    <template v-slot:input>
      <c-input />
    </template>
  </transfer-variant>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/transferTab/TransferVariant.vue";
  import { getAfterCommaSigns } from '@/utils/utils';
  import CSelectBox from "@/components/tags/cSelectBox.vue";
  import CInput from "@/components/tags/cInput.vue";

  @Component({
    name: 'TransferVariantCoin',
    components: {CInput, CSelectBox, TransferVariant}
  })

  export default class TransferVariantCoin extends Vue {

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

    /* ----------------------------------------------------------------- */

    get currentClass () {
      return this.$store.getters.theme == 'dark' ? 'darkMode' : 'lightMode'
    }

    get currentPlaceholder () {
      return this.$store.getters.theme == 'dark' ? 'darkPlaceholder' : 'lightPlaceholder'
    }

    /* ----------------------------------------------------------------- */
    /* ----------------------------------------------------------------- */

    public changeCoin() {
      console.log('changeCoin', this.selectedCoin)
    }
  }
</script>

<style scoped>

</style>
