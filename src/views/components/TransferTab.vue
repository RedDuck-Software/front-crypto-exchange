<template>
  <div class="container">
    <div class="converter__wrap-text">
      <h1
        class="converter__title primary-title text-center"
        :class="{ light__font_one: light }"
      >
        Fast and simple way to transfer coins for cash
      </h1>
      <!-- mobile title -->
      <h1
        class="converter__title secondary-title text-center"
        :class="{ light__font_one: light }"
      >
        Transfer crypto for cash instantly
      </h1>
      <!-- ------------- -->
      <p
        class="converter__text text-center"
        :class="{ light__font_two: light}"
      >
        Transfer coins under the value of $200 and receive payment
        instantly.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component({
    name:"TransferTab",
  })

  export default class TransferTab extends Vue{

    get light () {
      return this.$store.getters.theme == 'light'
    }
  }
</script>

<style scoped>

</style>
