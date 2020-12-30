<template>
  <section class="converter">
    <div class="container">
      <transfer-tab v-if="activeTab === 'transfer'" />

      <donate-tab v-else />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransferTab from '@/views/components/TransferTab.vue'
import DonateTab from '@/views/components/DonateTab.vue'

  @Component({
    name: 'CBodyBottom',
    components: { DonateTab, TransferTab }
  })

export default class CBodyBottom extends Vue {
  get activeTab () {
    return this.$store.getters.activeTab
  }
}
</script>

<style scoped>

</style>
