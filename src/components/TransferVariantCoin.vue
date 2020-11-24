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
      <label>
        <input
          v-model="value"
          @keypress="checkCoinInput"
          @click.stop
          :class="[currentClass, currentPlaceholder]"
          placeholder="0"
          class="from__input text-right"
        />
      </label>
    </template>
  </transfer-variant>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/TransferVariant.vue";
  import { getAfterCommaSigns } from '@/utils/utils';
  import CSelectBox from "@/components/tags/cSelectBox.vue";

  @Component({
    name: 'TransferVariantCoin',
    components: {CSelectBox, TransferVariant}
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
/*
    public onlyNumber ($event: Event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      // console.log('keycode', $event.keyCode, $event.which)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault()
      }
      if (keyCode === 46 && this.value.includes('.')) {
        $event.preventDefault()
      }

      if (
        this.value.length === 1 &&
        keyCode !== 46 &&
        this.value.charAt(0) === '0' &&
        $event.target.value === '0'
      ) {
        $event.preventDefault()
      }
    }

    public checkDecimalPrecisions ($event: Event) {
      const value = this.value
      const precisions = getAfterCommaSigns(value)
      console.log('check input', typeof (this.value), value, precisions, this.maxPrecisions)
      if (precisions >= this.maxPrecisions) {
        $event.preventDefault()
      }
    }*/

    public checkCoinInput ($event: Event) {
      // console.log('check Coin input', this.value)
      // this.onlyNumber($event)
      // this.checkDecimalPrecisions($event)
    }
  }
</script>

<style scoped>

</style>
