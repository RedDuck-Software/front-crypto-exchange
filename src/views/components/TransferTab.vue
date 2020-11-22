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

    <div
      class="menu-options field-bg d-flex"
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
  import {Component, Vue, Emit} from 'vue-property-decorator'

  @Component({
    name:"TransferTab",
  })

  export default class TransferTab extends Vue{

    public activeTab = 'transfer'

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
      this.activeTab = tabName
      this.$store.commit('SET_ACTIVE_TAB', tabName)
    }
  }
</script>

<style scoped>

  .d-flex {
    display: flex;
  }

  .menu-options {
    height: 3.875rem;
    width: 49.75rem;
    margin: 2.5rem auto 0.95rem;
    border-radius: 32px;
    background: #5e6062;
  }

  @media screen and (min-width: 320px) and (max-width: 624px) {
    .menu-options {
      width: 100%;
      height: 3.85rem;
    }
  }

  @media screen and (min-width: 625px) and (max-width: 1200px) {
    .menu-options {
      width: 75%;
      margin-top: 1.5rem;
    }
  }

  .menu-option {
    width: 50%;
    font-family: "Lato", sans-serif;
    color: #fff;
    font-size: 1.43em;
    font-weight: 400;
    line-height: 1.125em;
    margin: 0.317rem;
    position: relative;
    overflow: hidden;
  }

  .menu-option span {
    z-index: 2;
    position: relative;
  }

  .menu-option.menu__transfer {
    margin-right: 0;
  }

  .menu-option.menu__donate {
    margin-left: 0;
  }

  .menu-option::before {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    border-radius: 26px;
    background: #fd2c63;
    color: #fff;
    -webkit-transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .menu-option.menu__transfer::before {
    left: 100%;
    right: auto;
  }

  .menu-option.menu__transfer.transferClass::before {
    left: 0;
    right: auto;
  }

  .menu-option.menu__donate::before {
    right: 100%;
    left: auto;
  }

  .menu-option.menu__donate.transferClass::before {
    right: 0;
    left: auto;
    transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @media screen and (min-width: 320px) and (max-width: 1100px) {
    .menu-option {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 750px) and (max-width: 1100px) {
    .menu-option {
      font-size: 1.2em;
    }
  }

</style>
