<template>
  <div
    class="custom-bg converter__from hover:cursor-pointer"
    :class="{ light: light, border: light, light__field_bg: light}"
  >
    <div class="w-full">
      <div class="coin__wrap flex items-center justify-between">
        <slot name="selection" />

        <slot name="errorMessage" />

        <slot name="input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component({
    name: 'TransferVariant'
  })

export default class TransferVariant extends Vue {
    @Prop() exchangeRate!: number

    get light () {
      return this.$store.getters.theme === 'light'
    }
}
</script>
