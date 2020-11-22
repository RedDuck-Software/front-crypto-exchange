<template>
  <transfer-variant />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectbox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/TransferVariant.vue";

  @Component({
    name: 'TransferVariantPayment',
    components: {TransferVariant}
  })

  export default class TransferVariantPayment extends Vue {

    public paymentSystems: CommonSelectbox[] = [
      {
        id: 1,
        name: 'PayPal',
        value: 'paypal',
        icon: require('@/assets/img/logos/paypal.svg'),
        logo: require('@/assets/img/logos/paypal.png'),
        isAllowed: true
      },
      {
        id: 2,
        name: 'Revolut',
        value: 'revolut',
        icon: require('@/assets/img/logos/revolut-2.svg'),
        logo: require('@/assets/img/logos/Revolut.svg'),
        isAllowed: false
      }
    ];

  }
</script>

<style scoped>

</style>
