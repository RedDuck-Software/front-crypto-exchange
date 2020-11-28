<template>
  <div class="converter__wallet-block flex flex-col flex-d-row sm:mt-4 justify-between">
    <div class="converter__wallet-complete d-none">
      <div class="wallet__select d-flex">
        <div class="wallet__variant text-center" />
      </div>
    </div>

    <ConnectWalletButton
      :account="account"
      @change="onAccountChange"
      class="width50 lg:w-37%"
    />

    <c-button
      @click="send"
      :disabled="transferNowDisabled"
      :class="[ifActiveLightMode, ifConnected]"
      class="wallet__btn md:mt-0 width50 md:ml-4 lg:w-37%"
    >
      Transfer Now
    </c-button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CButton from "@/components/tags/cButton.vue";
  import ConnectWalletButton from "@/components/transferTab/ConnectWalletButton.vue";

  @Component({
    name: 'ButtonsRow',
    components: {ConnectWalletButton, CButton}
  })

  export default class ButtonsRow extends Vue {

    public account = ''

    get light () {
      return this.$store.getters.theme == 'light'
    }

    get transferNowDisabled() {
      return true
    }

    get ifActiveLightMode() {
      return this.light ? "classLightMode" : "";
    }

    get ifConnected() {
      return "classLightModeBg"
    }

    public onAccountChange() {}

    public send() {}
  }
</script>

<style scoped>

</style>
