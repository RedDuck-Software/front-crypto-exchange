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

    <!-- On click on btn Donate replace title -->
    <!-- ------------------------------------ -->
    <div class="donate__wrap-text d-none">
      <h1
        class="donate__title text-center"
        :class="{ light__font_one: light }"
      >
        Donate any unwanted coins and help someone in need.
      </h1>
      <p
        class="donate__text text-center"
        :class="{ light__font_two: light}"
      >
        You will be given the option to provide your email address, to
        update you on where your coins were used.
      </p>
    </div>

    <div
      class="menu-options d-flex"
      :class="{ light__bg: light}"
    >
      <button
        :class="transferStyle"
        @click="setTab('transfer')"
        class="menu-option menu__transfer text-center shadow-none"
      >
        <span>Transfer</span>
      </button>

      <button
        :class="donateStyle"
        @click="setTab('donate')"
        class="menu-option menu__donate text-center shadow-none"
      >
        <span>Donate</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'CBodyTop'
  })

export default class CBodyTop extends Vue {
  get activeTab () {
    return this.$store.getters.activeTab
  }

  get light () {
    return this.$store.getters.theme == 'light'
  }

  get transferStyle () {
    return this.getTabStyle('transfer')
  }

  get donateStyle () {
    return this.getTabStyle('donate')
  }

  public getTabStyle (tabName: string) {
    if (this.activeTab === tabName) {
      return 'transferClass'
    } else if (this.light) {
      return 'light__font_four'
    }
    return ''
  }

  public setTab (tabName: string) {
    this.$store.commit('setActiveTab', tabName)
  }
}
</script>

<style scoped src='@/assets/css/converter.css'>
</style>
