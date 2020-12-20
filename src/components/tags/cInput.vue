<template>
  <div class="flex flex-row items-center currency__value-text p-1">
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
      v-model="amount"
      @keypress="checkInput"
      @click.stop
      @input="onChangeAmount"
      :class="[limitValidation, currentClass, currentPlaceholder]"
      placeholder="0"
      class="mr-2 text-xl from__input text-right"
      v-autowidth="{maxWidth: '210px', minWidth: 'auto', comfortZone: 0}"
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
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

  @Component({
    name: 'CInput'
  })

export default class CInput extends Vue {
    @Model() vModel!: number
    @Prop() icon!: string
    @Prop() append!: string
    @Prop() limit!: Array<number>
    @Prop() maxPrecisions!: number
    @Prop() variant!: string

    public amount = 0

    /** ---------------------------------- GET ---------------------------------------- **/

    get currentClass () {
      return this.$store.getters.theme === 'dark' ? 'darkMode' : 'lightMode'
    }

    get currentPlaceholder () {
      return this.$store.getters.theme === 'dark' ? 'darkPlaceholder' : 'lightPlaceholder'
    }

    get limitValidation () {
      if (!this.limit) return ''
      const min = this.limit[0]
      const max = this.limit[1]
      return (this.amount < min || this.amount > max) ? 'validation-result-money' : ''
    }

    /** ---------------------------------- Watch --------------------------------------- **/

    @Watch('vModel')
    onChangeOutside (newVal: number) {
      // console.log('CInput-onChangeOutside', this.$store.getters.typingActive, this.variant)
      if (this.$store.getters.typingActive !== this.variant) this.amount = newVal
    }

    /** ------------------------------------------------------------------------------ **/

    public onChangeAmount () {
      // console.log('CInput-onChangeAmount', this.amount)
      this.amount = +this.amount
      this.$store.commit('setInputActive', this.variant)
      this.$emit('change', this.amount)
    }

    public checkInput ($event: KeyboardEvent) {
      // console.log('checkInput', this.$store.getters.typingActive, $event.key)
      this.onlyNumber($event)
      this.checkDecimalPrecisions($event)
      this.checkLimit($event)
      /*      if (this.onlyNumber($event) &&
        this.checkDecimalPrecisions($event) &&
        this.checkLimit($event)
      ) {
        console.log('changeInside-commit/emit', this.$store.getters.typingActive, $event.key)
        this.$store.commit('setInputActive', this.variant)
        this.$emit('change', this.amount)
      } */
    }

    public onlyNumber ($event: KeyboardEvent) {
      const char = $event.key
      if (!/[0-9\\.]/.test(char) && char !== 'Backspace' && char !== 'Delete') {
        $event.preventDefault()
        // console.log('CInput-onlyNumber-false')
        return false
      }
      // console.log('CInput-onlyNumber-true')
      return true
    }

    public checkDecimalPrecisions ($event: KeyboardEvent) {
      const char = $event.key
      const tmp = this.amount + ''
      const decimal = tmp.split('.')[1]
      if (decimal) {
        if (decimal.length >= this.maxPrecisions && char !== 'Backspace' && char !== 'Delete') {
          $event.preventDefault()
          // console.log('CInput-checkDecimalPrecisions-false')
          return false
        }
      }
      // console.log('CInput-checkDecimalPrecisions-true')
      return true
    }

    public checkLimit ($event: KeyboardEvent) {
      const char = $event.key
      if (!this.limit) {
        // console.log('CInput-checkLimit-true')
        return true
      }
      if ((this.amount < this.limit[0] ||
        this.amount > this.limit[1]) &&
        char !== 'Backspace' && char !== 'Delete'
      ) {
        $event.preventDefault()
        // console.log('CInput-checkLimit-false')
        return false
      }
      // console.log('CInput-checkLimit-true')
      return true
    }
}
</script>

<style scoped src='@/assets/css/cinput.css'>
</style>
