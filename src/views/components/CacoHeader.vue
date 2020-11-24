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

            <i v-else class="far fa-moon" />
          </div>
        </div>

        <div
          v-click-outside="hideSelect"
          class="text-center text-xs hover:cursor-pointer relative mt-6 currencySelection"
        >
          <button
            @click.prevent="open = !open"
            :class="open ? 'button__open' : 'button__closed'"
            class="bg-color text-white currencyButton"
          >
            <span>{{ selectedFiat.name }}</span>
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
              {{ currency.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
  import ClickOutside from 'vue-click-outside';
  import Ca from "@/components/tags/ca.vue";
  import Entity from '@/interfaces/Entity';

  @Component({
    name: "CHeader",
    components: {Ca},
    directives: {
      ClickOutside,
    },
  })

  export default class CHeader extends Vue {

    public selectedFiat = { name: "USD", id: 0 }
    public open = false
    public currencies = [
      { name: "USD", id: 0 },
      { name: "EUR", id: 1 },
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

    public hideSelect () {
      this.open = false
    }

    public changeFiat (item: Entity) {
      this.selectedFiat = item
      this.open = false
      this.$store.commit("SET_FIAT", this.selectedFiat.name)
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
