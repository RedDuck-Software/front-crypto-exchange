<template>
  <header>
    <div class="container">
      <div class="flex justify-between relative">
        <img
          src="@/assets/img/icons/beta.png"
          class="absolute header__beta"
          alt
        />

        <ca
          :item="(dark) ? headLogo.dark : headLogo.light"
          class="header__logo-link p-8 z-50"
        />

        <div class="header__light" id="header__light">
          <div @click="switchTheme" class="toggling_icons">
            <img
              class="sun-icon"
              v-if="dark"
              src="@/assets/img/icons/sun-icon.svg"
              alt=""
            />

            <i v-else class="far fa-moon"></i>
          </div>
        </div>

<!--        <label class="text-center text-xs hover:cursor-pointer relative mt-6 currencySelection">
          <select
            v-model="fiat"
            @change="switchFiat"
            class="bg-color text-white currencyButton"
          >
            <option
              class="p-2 z-50 grey-color"
              v-for="(item, i) in currencies"
              :key="i"
              :value="item"
            >
              {{ item.text }}
            </option>
          </select>
        </label>-->

        <div
          v-click-outside="close"
          class="text-center text-xs hover:cursor-pointer relative mt-6 currencySelection"
        >
          <button
            @click.prevent="open = !open"
            :class="open ? 'button__open' : 'button__closed'"
            class="bg-color text-white currencyButton"
          >
            <span>{{ selectedFiat.text }}</span>
            <i class="fa fa-arrow-down" />
          </button>

          <div
            v-show="open"
            class="flex flex-col absolute bg-white text-gray b-shadow rounded-b-lg w-full"
          >
            <button
              class="p-2 z-50 grey-color"
              @click.stop="changeFiat(currency)"
              v-for="(currency, key) in currencies"
              :key="key"
            >
              {{ currency.text }}
            </button>
          </div>
          <!-- ----------------- -->
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
  import Ca from "@/components/tags/ca.vue";

  @Component({
    name: "CHeader",
    components: {Ca}
  })

  export default class CHeader extends Vue {

    public selectedFiat = { text: "USD", value: 0 }
    public open = false
    public currencies = [
      { text: "USD", value: 0 },
      { text: "EUR", value: 1 },
    ]

    public headLogo = {
      dark: {
        href: "/",
        img: {
          src: "logos/logoblack-2.svg",
          alt: "Caco | cash 4 crypto",
          classes: "header__logo"
        }
      },
      light: {
        href: "/",
        img: {
          src: "logos/caco-light-logo.svg",
          alt: "Caco | cash 4 crypto",
          classes: "header__logo light__logo"
        }
      }
    }

    get dark () {
      return this.$store.getters.theme == 'dark'
    }

    public switchTheme () {
      const next = this.dark ? 'light' : 'dark'
      this.$store.commit("SET_THEME", next)
    }

    public changeFiat () {
      console.log(this.selectedFiat)
      this.$store.commit("SET_FIAT", this.selectedFiat.text)
    }
  }

</script>

<style scoped>
  .bg-color {
    background: #fd2c63;
  }

  .b-shadow {
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
  }

  .text-gray {
    color: #9a9a9a;
  }

  .button__open {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button__closed {
    border-radius: 2rem;
  }

  .currencyButton {
    padding: .5rem 2.7rem .5rem 2.1rem;
    transition: none;
  }

  .fa-arrow-down {
    margin: 0 -2rem 0 .8rem;
  }

  @media only screen and (min-width: 768px) {
    .currencySelection {
      font-size: .875rem;
    }
  }
</style>
