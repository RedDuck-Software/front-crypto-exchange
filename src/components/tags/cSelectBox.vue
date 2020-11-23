<template>
  <div class="coin__wrapper d-flex align-items-center">
    <slot name="image">
      <div
        @click="open = !open"
        class="coin flex align-center"
      >
        <img
          v-if="selected.icon"
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
          :class="`${$store.getters.theme}Mode`"
        >
          {{ selected.name }}
        </span>

        <div class="coin__arrow relative" :class="arrowClass"></div>
        <i class="text-gray-300 ml-2" :class="arrowIconClass" aria-hidden="true"></i>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";

  @Component({
    name: 'CSelectBox',
  })

  export default class CSelectBox extends Vue {

    public open = false
    public selected = {
      contractAddress: "0xf6fe970533fe5c63d196139b14522eb2956f8621",
      icon: "/assets/img/coins/usdc.svg",
      id: 10,
      isAllowed: true,
      name: "USDC",
      value: "usdc",
      logo: '',
    }

    public items: (CommonSelectBox & {
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

    get arrowClass () {
      var clss1 = this.open ? 'coin__arrow-open' : 'coin__arrow-close'
      var clss2 = this.$store.getters.theme == 'dark' ? 'arrowDarkMode' : 'arrowLightMode'
      return `${clss1} ${clss2}`
    }

    get arrowIconClass () {
      var clss1 = this.open ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
      var clss2 = this.$store.getters.theme + 'Mode'
      return `${clss1} ${clss2}`
    }
  }
</script>

<style scoped>

</style>
