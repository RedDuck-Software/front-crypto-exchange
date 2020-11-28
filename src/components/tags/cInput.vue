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
      @keydown="changeInside"
      @click.stop
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
  import { Component, Vue, Prop, Model, Emit, Watch } from 'vue-property-decorator'

  @Component({
    name: 'CInput',
  })

  export default class CInput extends Vue {

    @Model() vModel!: number
    @Prop() icon!:   string
    @Prop() append!: string
    @Prop() limit!: Array<number>
    @Prop() maxPrecisions!: number
    @Prop() variant!: string

    public amount = 0

    /** ---------------------------------- GET ---------------------------------------- **/

    get currentClass () {
      return this.$store.getters.theme == 'dark' ? 'darkMode' : 'lightMode'
    }

    get currentPlaceholder () {
      return this.$store.getters.theme == 'dark' ? 'darkPlaceholder' : 'lightPlaceholder'
    }

    get limitValidation () {
      if (!this.limit) return ''
      const min = this.limit[0]
      const max = this.limit[1]
      return (this.amount < min || this.amount > max) ? 'validation-result-money' : ''
    }

    /** ---------------------------------- Watch --------------------------------------- **/

    @Watch("vModel")
    onChangeOutside(newVal: number) {
      if (this.$store.getters.typingActive != this.variant) this.amount = newVal
    }

    /** ------------------------------------------------------------------------------ **/

    public changeInside ($event: KeyboardEvent) {
      if (this.onlyNumber($event) &&
        this.checkDecimalPrecisions($event) &&
        this.checkLimit($event)
      ) {
        this.$store.commit("SET_INPUT_ACTIVE", this.variant)
        this.$emit("change", this.amount);
      }
    }

    public onlyNumber($event: KeyboardEvent) {
      const char = $event.key
      if (!/[0-9\.]/.test(char) && char != 'Backspace' && char != 'Delete') {
        $event.preventDefault()
        return false
      }
      return true
    }

    public checkDecimalPrecisions($event: KeyboardEvent) {
      const char = $event.key
      const tmp = this.amount + ""
      const decimal = tmp.split(".")[1]
      if (decimal) {
        if (decimal.length >= this.maxPrecisions && char != 'Backspace' && char != 'Delete') {
          $event.preventDefault()
          return false
        }
      }
      return true
    }

    public checkLimit($event: KeyboardEvent) {
      const char = $event.key
      if (!this.limit) return true
      if ((this.amount < this.limit[0]
        || this.amount > this.limit[1]) &&
        char != 'Backspace' && char != 'Delete'
      ) {
        $event.preventDefault()
        return false
      }
      return true
    }
  }
</script>

<style scoped>
  .from__input {
    max-width: 40%;
    margin-right: 1rem;
    margin-left: .9rem;
    padding: .1rem .3rem .3rem 0;

    background: inherit;

    font-size: 1.5rem;
    border-radius: 20px;
  }

  .from__input::placeholder {
    font-size: .9em;
    color: white;
  }

  .lightMode, .lightPlaceholder::placeholder{
    color: #585858 !important;
  }
  .darkMode, .darkPlaceholder::placeholder{
    color: #fff;
  }

  .text-color-pink {
    color: #fd2c63;
  }

  .text-gray-main {
    color: #c9c9c9;
  }

</style>
