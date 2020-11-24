<template>
  <transfer-variant>
    <template v-slot:selection>
      <c-select-box
        v-model="selected"
        :items="paymentSystems"
        :multistep="true"
      />
    </template>

    <template v-slot:input>
      <label>
<!--        <input
          v-model="value"
          @keypress="checkCoinInput"
          @click.stop
          :class="[currentClass, currentPlaceholder]"
          placeholder="0"
          class="from__input text-right"
        />-->
      </label>
    </template>
  </transfer-variant>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from "@/interfaces/CommonSelectBox";
  import TransferVariant from "@/components/TransferVariant.vue";
  import CSelectBox from "@/components/tags/cSelectBox.vue";

  @Component({
    name: 'TransferVariantPayment',
    components: {CSelectBox, TransferVariant }
  })

  export default class TransferVariantPayment extends Vue {

    public selected = {} as CommonSelectBox

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

<style scoped>

</style>
