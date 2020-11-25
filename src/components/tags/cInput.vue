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
      v-model="amount"
      @keypress="checkCoinInput"
      @click.stop
      :class="[currentClass, currentPlaceholder]"
      placeholder="0"
      class="from__input text-right"
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
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component({
    name: 'CInput',
  })

  export default class CInput extends Vue {

    @Prop() icon!:   string
    @Prop() append!: string
    @Prop() limit!:  string

    public amount = ''

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
