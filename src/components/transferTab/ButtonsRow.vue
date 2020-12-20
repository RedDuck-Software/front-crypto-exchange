<template>
  <div class="converter__wallet-block flex flex-col flex-d-row sm:mt-4 justify-between">
    <div class="converter__wallet-complete d-none">
      <div class="wallet__select d-flex">
        <div class="wallet__variant text-center" />
      </div>
    </div>

    <ConnectWalletButton
      v-model="Account"
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
import { Component, Model, Vue, Emit, Prop } from 'vue-property-decorator'
import CButton from '@/components/tags/cButton.vue'
import ConnectWalletButton from '@/components/transferTab/ConnectWalletButton.vue'

  @Component({
    name: 'ButtonsRow',
    components: { ConnectWalletButton, CButton }
  })

export default class ButtonsRow extends Vue {
    @Model('change', { default: '' })
    account!: string;

    @Prop({ default: false }) transferNowDisabled!: boolean

    public Account = ''

    get light () {
      return this.$store.getters.theme === 'light'
    }

    get ifActiveLightMode () {
      return this.light ? 'classLightMode' : ''
    }

    get ifConnected () {
      return 'classLightModeBg'
    }

    @Emit('change')
    public onAccountChange () {
      return this.Account
    }

    @Emit('send')
    public send () {
      return true
    }
}
</script>

<style scoped>

</style>
