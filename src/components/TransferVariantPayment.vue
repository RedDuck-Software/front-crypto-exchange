<template>
  <transfer-variant>
    <template v-slot:selection>
      <c-select-box
        v-model="selected"
        :items="paymentSystems"
        :multistep="true"
      />
    </template>

    <template v-slot:errorMessage>
      <span
        v-if="error"
        class="validation-result-money from__result-money"
      >
        Insufficient Funds
      </span>
    </template>

    <template v-slot:input>
      <c-input
        icon="fas fa-dollar-sign"
        append="USD"
      />
    </template>
  </transfer-variant>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/TransferVariant.vue";
  import CSelectBox from "@/components/tags/cSelectBox.vue";
  import CInput from "@/components/tags/cInput.vue";

  @Component({
    name: 'TransferVariantPayment',
    components: {CInput, CSelectBox, TransferVariant }
  })

  export default class TransferVariantPayment extends Vue {

    public selected = {} as CommonSelectBox
    public error = true
    public paymentSystems: CommonSelectBox[] = [
      {
        id: 1,
        name: 'PayPal',
        value: 'paypal',
        icon: 'logos/paypal.svg',
        logo: 'logos/paypal.png',
        isAllowed: true
      },
      {
        id: 2,
        name: 'Revolut',
        value: 'revolut',
        icon: 'logos/revolut-2.svg',
        logo: 'logos/Revolut.svg',
        isAllowed: false
      }
    ];

  }
</script>

<style scoped src="@/assets/css/transferTab.css">
</style>
