<template>
  <div class="custom-bg hover:cursor-pointer converter__from">
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
    @Prop({ default: 1 }) exchangeRate!: number
}
</script>

<style scoped src="@/assets/css/transferTab.css">
</style>
