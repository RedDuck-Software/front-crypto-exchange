<template>
  <div class="customInfoRow d-flex justify-content-center mt-2">
    <p
      class="agree__text w-full"
      :class="{ light__font_six: light}"
    >
      By clicking "Transfer Now" you agree to the
      <a
        href="https://drive.google.com/file/d/1P8AhZuP6856r7Pq7UgMKxBjlKseuPn3O/view?usp=sharing"
        class="agree__link"
        target="_blank"
      >
        Terms & Conditions
      </a>
    </p>

    <label class="checkboxContainer flex mx-auto order-3">
      <p
        class="agree__text ml-1 order-2"
        :class="{ light__font_six: light}"
      >
        Receive updates on CACO developments
      </p>

      <input
        type="checkbox"
        checked="checked"
        :class="{ light__font_six: light }"
        class="checkboxContainer__check order-1"
      />

      <span
        class="checkboxCheckmark"
        :class="{ checkboxCheckmark2: light }"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'CustomInfoRow'
  })

export default class CustomInfoRow extends Vue {
  get light () {
    return this.$store.getters.theme === 'light'
  }
}
</script>

<style src="@/assets/css/transferTab.css" />
