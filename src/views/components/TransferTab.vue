<template>
  <div class="form__wrapper">
    <form
      action="#"
      id="converter__form"
      class
    >
      <TransferVariantCoin />

      <template v-if="transferable">
        <TransferVariantPayment />

        <!-- PRIVATE KEY FIELD -->
        <PrivateKeyModal
          :visible="privateKeyModalVisible"
          @close="privateKeyModalVisible = false"
        />

        <div class="gas__row">
          <div class="gas__col">
            <p
              :class="{ light__font_two: light }"
              class="gas__text"
            >
              <i class="fas fa-question-circle" />
              <span class="gas__poppup">CACO Transaction Fee</span>
              Service Fee =
            </p>

            <div class="gas__button__col">
              <label
                style="color: white; margin-left: 2px;"
                :class="{ light__font_two: light }"
              >
                <span
                  class="currency-value"
                  :class="{ light__font_two: light }"
                >
                  {{ $store.getters.fiatType.text === 'USD' ? '$' : '€'}}
                </span>

                {{ serviceFees }}
              </label>
            </div>
          </div>
        </div>

        <div class="converter__wallet-block flex flex-col flex-d-row sm:mt-4 justify-between">
          <div class="converter__wallet-complete d-none">
            <div class="wallet__select d-flex">
              <div class="wallet__variant text-center" />
            </div>
          </div>

          <ConnectWalletButton
            :account="account"
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

        <div class="customInfoRow">
          <div class="customInfoCol">
            <div class="d-flex justify-content-center mt-2">
              <span
                class="agree__text"
                :class="{ light__font_six: light}"
              >
                By clicking "Transfer Now" you agree to the
                <a
                  href="https://drive.google.com/file/d/1P8AhZuP6856r7Pq7UgMKxBjlKseuPn3O/view?usp=sharing"
                  class="agree__link"
                  target="_blank"
                >
                  Terms & Conditions
                </a>
              </span>
            </div>

            <label class="checkboxContainer">
              <p
                class="agree__text ml-1"
                :class="{ light__font_six: light}"
              >
                Receive updates on CACO developments
              </p>

              <input
                type="checkbox"
                checked="checked"
                :class="{ light__font_six: light }"
              />

              <span
                class="checkboxCheckmark"
                :class="{ checkboxCheckmark2: light }"
              />
            </label>
          </div>
        </div>

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

  @Component({
    name: 'TransferTab',
    components: {
      PrivateKeyModal,
      VideoCard,
      CButton,
      ConnectWalletButton,
      TransferVariantPayment,
      TransferVariantCoin
    }
  })

  export default class TransferTab extends Vue {

    public transferable = true
    public serviceFees = '0.0'
    public account = ''
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

    get transferNowDisabled() {
      return true
/*      return (
        !this.account ||
        (this.resultMoney && this.resultMoney > 200) ||
        this.isLimitExceed ||
        !this.selectedDestination ||
        !this.email ||
        !this.amount ||
        !Number(this.amount) ||
        +this.amount <= 0
      );*/
    }

    get ifActiveLightMode() {
      return this.light ? "classLightMode" : "";
    }

    get ifConnected() {
      return "classLightModeBg"
/*      return this.light &&
      this.account &&
      this.email &&
      this.resultMoney <= 200 &&
      this.resultMoney > 0
        ? "classLightModeBg"
        : "";*/
    }

    /** ------------------------------------------------------- **/
    /** ------------------------------------------------------- **/

    public onAccountChange() {}

    public send() {}
  }

</script>

<style scoped>

  .form__wrapper {
    position: relative;
    margin: 1.25rem auto 0;
    width: 49.75rem;
  }

  @media screen and (min-width: 625px) {
    .form__wrapper {
      width: 75%;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 624px) {
    .form__wrapper {
      margin: 0 auto;
      width: 100%;
    }
  }

  @media screen and (min-width: 625px) and (max-width: 1200px) {
    .form__wrapper {
      width: 77%;
    }
  }

  .customInfoRow {
    display: flex;
    justify-content: flex-end;
  }

  .customInfoCol {
    width: 37%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

</style>
