<template>
  <div class="gas__row">
    <div class="gas__col">
      <p
        :class="{ light__font_two: light }"
        class="gas__text"
      >
        <i class="fas fa-question-circle" />
        <span class="gas__poppup">CACO Transaction Fee</span>
        Service Fee =
      </p>

      <div class="gas__button__col">
        <label
          style="color: white; margin-left: 2px;"
          :class="{ light__font_two: light }"
        >
          <span
            class="currency-value"
            :class="{ light__font_two: light }"
          >
            {{ $store.getters.fiatType.text === 'USD' ? '$' : '€'}}
          </span>

          {{ serviceFees }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component({
    name: 'GasRow'
  })

  export default class GasRow extends Vue {

    @Prop() serviceFees!: number

    get light () {
      return this.$store.getters.theme == 'light'
    }
  }
</script>
