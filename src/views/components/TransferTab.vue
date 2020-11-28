<template>
  <div class="form__wrapper">
    <form
      action="#"
      class="converter__form"
    >
      <TransferVariantCoin
        v-model="coinAmount"
        :fiat-amount="fiatAmount"
        :exchange-rate="exchangeRate"
      />

      <template v-if="transferable">
        <TransferVariantPayment
          v-model="fiatAmount"
          :coin-amount="coinAmount"
          :exchange-rate="exchangeRate"
        />

        <!-- PRIVATE KEY FIELD -->
        <PrivateKeyModal
          :visible="privateKeyModalVisible"
          @close="privateKeyModalVisible = false"
        />

        <gas-row :service-fees="serviceFees" />

        <buttons-row />

        <custom-info-row />

        <video-card />
      </template>

      <template v-else>
        <div class="px-5 py-3">
          <p
            class="converter__text text-center px-10"
            :class="{ light__font_two: light}"
          >
            Due to an overwhelming response and high demand,
            transfers have been temporarily placed on hold and
            will resume as soon as possible.
          </p>

          <p
            class="converter__text text-center py-3"
            :class="{ light__font_two: light}"
          >
            Apologies for the inconvenience.
          </p>
        </div>
      </template>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CommonSelectBox from '@/interfaces/CommonSelectBox';
  import TransferVariantCoin from "@/components/transferTab/TransferVariantCoin.vue";
  import TransferVariantPayment from "@/components/transferTab/TransferVariantPayment.vue";
  import ConnectWalletButton from "@/components/transferTab/ConnectWalletButton.vue";
  import CButton from "@/components/tags/cButton.vue";
  import VideoCard from "@/components/transferTab/VideoCard.vue";
  import PrivateKeyModal from "@/components/modals/PrivateKeyModal.vue";
  import GasRow from "@/components/transferTab/GasRow.vue";
  import CustomInfoRow from "@/components/transferTab/CustomInfoRow.vue";
  import ButtonsRow from "@/components/transferTab/ButtonsRow.vue";

  @Component({
    name: 'TransferTab',
    components: {
      ButtonsRow,
      CustomInfoRow,
      GasRow,
      PrivateKeyModal,
      VideoCard,
      CButton,
      ConnectWalletButton,
      TransferVariantPayment,
      TransferVariantCoin
    }
  })

  export default class TransferTab extends Vue {

    public coinAmount = 0
    public fiatAmount = 0
    public exchangeRate = 0.123
    public transferable = true
    public privateKeyModalVisible = false

    public cryptoCurrencies: (CommonSelectBox & {
      contractAddress: string;
    })[] = [];

    public paymentSystems: CommonSelectBox[] = [
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

    /** ------------------------------------------------------- **/
    /** ------------------------------------------------------- **/

    get light () {
      return this.$store.getters.theme == 'light'
    }

    get serviceFees() {
      return 0
/*      return this.rounded(
        MetamaskService.getFees(+this.amount * this.currencyExchangeRate)
      );*/
    }

    /** ------------------------------------------------------- **/
    /** ------------------------------------------------------- **/

  }

</script>
