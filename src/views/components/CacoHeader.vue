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

        <select
          class="select-fiat"
          v-model="fiat"
          @change="switchFiat"
        >
          <option
            v-for="(item, i) in currencies"
            :key="i"
            :value="item"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
  import Ca from "@/components/tags/ca.vue";

  type Currency = { text: string; value: number };

  @Component({
    name: "CHeader",
    components: {Ca}
  })

  export default class CHeader extends Vue {
    /*    @Prop({ default: () => [] })
    currencies!: Currency[];*/

    public fiat = { text: "USD", value: 0 }

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

    public switchFiat () {
      console.log(this.fiat)
      this.$store.commit("SET_FIAT", this.fiat.text)
    }
  }

</script>

<style scoped>
  .select-fiat {
    /* TODO CSS: input style!!! */
  }
</style>
