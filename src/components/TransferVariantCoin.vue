<template>
  <transfer-variant>
    <template v-slot:selection>

      <div
        v-if="selected"
        @click="open = !open"
        class="coin flex align-center"
      >
        <img
          v-if="selected.icon && variant === 'cryptocurrency'"
          class="coin__logo"
          :src="selected.icon"
        />
        <img
        v-else-if="selected.icon"
          class="coin__logo"
          :src="selected.icon"
        />
        <span
          class="coin__name ml-2"
          :class="currentClass"
        >
          {{ selected.name }}
        </span>
        <div v-if="!open" class="coin__arrow coin__arrow-close relative" :class="currentArrowClass"></div>
        <div v-else class="coin__arrow coin__arrow-open relative" :class="currentArrowClass"></div>
        <i v-if="!open" class="fa fa-arrow-down text-gray-300 ml-2" :class="currentClass" aria-hidden="true"></i>
        <i v-else class="fa fa-arrow-up text-gray-300 ml-2" :class="currentClass" aria-hidden="true"></i>
      </div>
      <div
        v-else
        @click="open = !open"
        class="coin flex align-center"
      >
        <span
          class="coin__name ml-2"
          :class="currentClass"
        >
          Select <!-- {{variant === 'payment_system' ? 'Destination' : 'Cryptocurrency'}}-->
        </span>
        <div v-if="!open" class="coin__arrow coin__arrow-close relative" :class="currentArrowClass"></div>
        <div v-else class="coin__arrow coin__arrow-open relative" :class="currentArrowClass"></div>
        <i v-if="!open" class="fa fa-arrow-down text-gray-300 ml-2" :class="currentClass" aria-hidden="true"></i>
        <i v-else class="fa fa-arrow-up text-gray-300 ml-2" :class="currentClass" aria-hidden="true"></i>
      </div>
      <div
        class="text-white sm:ml-0 md:ml-3 d-flex align-items-center"
        v-if="variant === 'payment_system'"
      >
        <p class="email" :class="currentClass">{{ email }}</p>
        <img
          v-if="email !== ''"
          src="@/assets/img/accept.png"
          alt="Done!"
          class="valid_email_tick"
        />
      </div>
      <div class="ml-3 text-xs crypto__val" v-if="variant === 'cryptocurrency'" :class="currentClass">
        Av:
        <span class="text-base d-inline" :class="currentClass">{{ balance }}</span>
      </div>
      
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

  @Component({
    name: 'TransferVariantCoin',
    components: {TransferVariant}
  })

  export default class TransferVariantCoin extends Vue {

    public cryptoCurrencies: (CommonSelectBox & {
      contractAddress: string;
    })[] = [
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "/assets/img/coins/usdc.svg",
        id: 10,
        isAllowed: true,
        name: "USDC",
        value: "usdc",
        logo: '',
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "/assets/img/coins/usdt.svg",
        id: 13,
        isAllowed: true,
        name: "USDT",
        value: "usdt",
        logo: ''
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "/assets/img/coins/pax.svg",
        id: 14,
        isAllowed: true,
        name: "PAX",
        value: "pax",
        logo: ''
      },
      {
        contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
        icon: "/assets/img/coins/eth.svg",
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
      // return this.$store.getters.theme == 'dark' ? 'darkPlaceholder' : 'lightPlaceholder'
      return this.$store.getters.theme == 'dark' ? 'lightPlaceholder' : 'darkPlaceholder'
    }

    /* ----------------------------------------------------------------- */
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
    }

    public checkCoinInput ($event: Event) {
      // console.log('check Coin input', this.value)
      this.onlyNumber($event)
      this.checkDecimalPrecisions($event)
    }*/
  }
</script>

<style scoped>

</style>
