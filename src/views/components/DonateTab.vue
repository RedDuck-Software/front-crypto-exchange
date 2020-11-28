<template>
  <div
    class="flex justify-center flex-col items-center difference"
    v-else-if="activeTab === 'donate'"
  >
    <img
      class="difference__img w-16 mt-16"
      src="@/assets/img/icons/charities.png"
      alt
    />

    <p
      class="difference__title font-bold text-3xl mt-2"
      :class="{ light__font_one: light}"
    >
      Make a difference!
    </p>

    <p
      class="difference__text text-xl text-center mt-2 mb-12"
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

<style src="@/assets/css/donateTab.css"/>
