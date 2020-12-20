<template>
  <main :class="{ light: light}" class="main">
    <preloader />
    <PortalTarget name="modals" />

    <CHeader/>

    <CBodyTop></CBodyTop>

    <CBodyBottom></CBodyBottom>

    <CFooter/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CFooter from '@/views/components/CacoFooter.vue'
import CHeader from '@/views/components/CacoHeader.vue'
import CBodyTop from '@/views/components/CacoBodyTop.vue'
import CBodyBottom from '@/views/components/CacoBodyBottom.vue'
import Preloader from '@/components/Preloader.vue'

// const baseURL = 'https://api-cash4crypto.azurewebsites.net/api'

  @Component({
    name: 'Home',
    components: {
      Preloader,
      CBodyBottom,
      CBodyTop,
      CFooter,
      CHeader
    }
  })

export default class Home extends Vue {
  get light () {
    return this.$store.getters.theme === 'light'
  }
}
</script>
