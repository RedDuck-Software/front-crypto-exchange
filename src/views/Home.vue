<template>
  <div :class="{ light: light}" class="main">
    <CHeader/>

    <CBodyTop></CBodyTop>

    <CBodyBottom></CBodyBottom>

    <CFooter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CFooter from "@/views/components/CacoFooter.vue";
import CHeader from "@/views/components/CacoHeader.vue";
import CBodyTop from "@/views/components/CacoBodyTop.vue";
import CBodyBottom from "@/views/components/CacoBodyBottom.vue";

const baseURL = 'https://api-cash4crypto.azurewebsites.net/api';

  @Component({
    name: "Home",
    components: {
      CBodyBottom,
      CBodyTop,
      CFooter,
      CHeader,
    },
  })

export default class Home extends Vue {
    public lightTheme = true

    get light () {
      return this.$store.getters.theme == 'light'
    }
}
</script>
