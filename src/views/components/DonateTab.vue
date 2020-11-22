<template>
  <div
    class="flex justify-center flex-col items-center diference"
    v-else-if="activeTab === 'donate'"
  >
    <img
      class="diference__img w-16 mt-16"
      src="@/assets/img/icons/charities.png"
      alt
    />

    <p
      class="diference__title font-bold text-3xl mt-2"
      :class="{ light__font_one: light}"
    >
      Make a difference!
    </p>

    <p
      class="diference__text text-xl text-center mt-2 mb-12"
      :class="{ light__font_two: light}"
    >
      Soon you will have the opportunity to donate any of your unwanted
      coins to CACO's chosen charities
    </p>
  </div>
</template>

<script lang="ts">
  import {Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'DonateTab'
  })

  export default class DonateTab extends Vue {

    get light () {
      return this.$store.getters.theme == 'light'
    }

    get activeTab () {
      return this.$store.getters.activeTab
    }

  }
</script>

<style scoped>
  @media screen and (max-width: 1022px) {
    .diference__text {
      width: 65%;
    }
  }

  @media screen and (max-width: 767px) {
    .diference__img  {
      width: calc(8vw + .5em);
    }
    .diference__title {
      font-size: calc(3.5vw + .3em);
    }

    .diference__text {
      width: 71%;
      font-size: calc(1.5vw + .3em);
    }
  }

  @media screen and (min-width: 661px) and (min-height: 830px) {
    .diference {
      margin: 2rem auto 3rem;
    }
  }

  @media screen and (min-width: 750px) and (min-height: 900px) {
    .diference {
      margin: 2rem auto 3rem;
    }
  }
</style>
