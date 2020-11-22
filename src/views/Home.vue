<template>
  <div id="app" :class="{ light: light}" class="main">
    <CHeader/>

    <TransferTab></TransferTab>

    <TabContent></TabContent>

    <CFooter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CFooter from "@/views/components/CacoFooter.vue";
import CHeader from "@/views/components/CacoHeader.vue";
import TransferTab from "@/views/components/TransferTab.vue";
import TabContent from "@/views/components/TabContent.vue";

const baseURL = 'https://api-cash4crypto.azurewebsites.net/api';

  @Component({
    name: "Home",
    components: {
      CFooter,
      CHeader,
      TransferTab,
      TabContent,
    },
  })

export default class Home extends Vue {
    public lightTheme = true

    get light () {
      return this.$store.getters.theme == 'light'
    }
}
</script>
