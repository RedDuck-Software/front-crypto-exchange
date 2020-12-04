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
              @click.stop="changeFiat(val)"
              v-for="(val, key) in fiatList"
              :key="key"
            >
              {{ val.name }}
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

    public open = false
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

    /** ----------------------------------------------- **/

    get dark () {
      return this.$store.getters.theme == 'dark'
    }

    get selectedFiat() {
      console.log('selectedFiat', this.$store.getters.fiat)
      return this.$store.getters.fiat
    }

    get fiatList() {
      return this.$store.getters.fiatList
    }

    /** ----------------------------------------------- **/

    public switchTheme () {
      const next = this.dark ? 'light' : 'dark'
      this.$store.commit("SET_THEME", next)
    }

    public hideSelect () {
      this.open = false
    }

    public changeFiat (item: Entity) {
      this.open = false
      this.$store.commit("setFiat", item)
    }
  }

</script>

<style scoped src="@/assets/css/header.css">
</style>
