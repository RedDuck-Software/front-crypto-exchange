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
          :item="(darkTheme) ? headLogo.dark : headLogo.light"
          class="header__logo-link p-8 z-50"
        />

        <div class="header__light" id="header__light">
          <div @click="switchTheme" class="toggling_icons">
            <img
              class="sun-icon"
              v-if="darkTheme"
              src="@/assets/img/icons/sun-icon.svg"
              alt=""
            />

            <i v-else class="far fa-moon"></i>
          </div>
        </div>

        <select class="select-fiat">
          <option
            v-for="(item, i) in currencies"
            :key="i"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>

<!--        <p-select
          name="fiat"
          v-model="fiat"
          :options="currencies"
        />-->
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
    public darkTheme = true
    public fiat = { text: "USD", value: 0 }

/*    @Prop({ default: () => [] })
    currencies!: Currency[];*/

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

    @Emit('change-mode')
    public switchTheme () {
      this.darkTheme = !this.darkTheme
      return this.darkTheme
    }
  }

</script>

<style scoped>
  .select-fiat {
    /* TODO CSS: input style!!! */
  }
</style>
