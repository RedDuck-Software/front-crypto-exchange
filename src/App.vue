<template>
    <div id="app" :class="{ light: light}" >
      <preloader />

      <PortalTarget name="modals" />

      <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Preloader from '@/components/Preloader.vue'

@Component({
  name: 'app',
  components: { Preloader }
})

export default class App extends Vue {
  get light () {
    return this.$store.getters.theme === 'light'
  }
}
</script>
