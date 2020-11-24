<template>
  <div>
    <slot
      v-if="icon"
      name="Icon"
    >
      <i
        :class="icon"
        class="text-xl text-color-pink text-2xl md:text-4xl"
      />
    </slot>

    <input
      v-model="value"
      @keypress="checkCoinInput"
      @click.stop
      :class="[currentClass, currentPlaceholder]"
      placeholder="0"
      class="from__input text-right"
    />

    <slot
      v-if="append"
      name="append"
    >
      <span
        class="current__cur text-sm mr-2 sm-margin"
        :class="currentClass"
      >
        {{ append }}
      </span>
    </slot>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component({
    name: 'CInput',
  })

  export default class CInput extends Vue {

    @Prop() icon!: string
    @Prop() append!: string


    get currentClass () {
      return this.$store.getters.theme == 'dark' ? 'darkMode' : 'lightMode'
    }

    get currentPlaceholder () {
      return this.$store.getters.theme == 'dark' ? 'darkPlaceholder' : 'lightPlaceholder'
    }

    public checkCoinInput ($event: Event) {
      // console.log('check Coin input', this.value)
      // this.onlyNumber($event)
      // this.checkDecimalPrecisions($event)
    }
  }
</script>

<style scoped>

</style>
