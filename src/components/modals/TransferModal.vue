<template>
  <CModal ref="modal" :visible="visible" @close="close" class="block-shadow">
    <div v-if="loading" class="flex flex-col items-center">
      <div>
        <p class="text__processing text-gray-color font-weight-lighter text-xl pb-3 pt-10 text-center">
          Once confirmed you will be provided with an <br/>
          etherscan ID to track your coin transaction
        </p>
      </div>
      <div class="processing__cycle">
        <i  class="fas fa-circle-notch"></i>
      </div>
      <p class="text__process text-gray-custom font-bold text-5xl text-center pt-3 pb-10">Processing…</p>
    </div>

    <div
      class="error__wrap text-center flex flex-col items-center"
      v-else-if="error"
    >
      <img
        class="error__img"
        src="../../assets/img/icons/error.png"
        alt=""
      >
      <p class="text-gray-custom">{{error}}</p>
    </div>

    <div v-else class="modal__wrap flex flex-col items-center justify-center">
      <img
        src="../../assets/img/icons/accept.png"
        alt="Done!"
        class="complete__img pt-7"
      >

      <p class="error__title text-center font-bold text-4xl">
        Transfer in progress!
      </p>

      <p class="error__text-one text-center text-lg mb-8 w-3/4 text-gray-color">
        Depending on the selected gas fee amount, please allow the necessary
        time for the transfer to process.
      </p>

      <p class="error__text-two text-center text-lg text-gray-color">
        You will be notified via email when complete.
      </p>

      <p class="text-gray-color font-weight-lighter pb-4 pt-4 text-center">
        View transaction on
        <a
          :href="link"
          target="_blank"
          style="color: royalblue; display: inline; font-weight:bold;text-decoration: underline"
        >
          etherscan
        </a>
      </p>

      <CButton
        class="modal__btn-continue mt-8 pb-7"
        @click="close"
      >
        Continue
      </CButton>
    </div>
  </CModal>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { Portal } from 'portal-vue'
import CModal from '@/components/tags/cModal.vue'
import BaseModal from '@/components/BaseModal'
import CButton from '@/components/tags/cButton.vue'

  @Component({
    name: 'TransferModal',
    components: { CButton, CModal, Portal }
  })

export default class TransferModal extends BaseModal {
    @Prop({ required: true })
    public readonly loading!: boolean;

    @Prop({ required: true })
    public readonly error!: string;

    @Prop({ required: true })
    public readonly txID!: string;

    get link () {
      const isDev = process.env.NODE_ENV === 'development'

      if (isDev) {
        // we use kovan network for development
        return `https://kovan.etherscan.io/tx/${this.txID}`
      } else {
        return `https://etherscan.io/tx/${this.txID}`
      }
    }
}
</script>

<style scope>

  .error__wrap {
    margin: .8rem auto;
  }

  .error__img {
    width: 105px;
  }

  .error__title {
    margin-top: .2rem;
    margin-bottom: 1.2rem;
    color: #5A5A5A;
  }

  .text-gray-custom {
    font-size: 1.3em;
  }

  .text-gray-color {
    color: #5A5A5A;
    font-family: 'Lato Light', sans-serif;
    font-weight: 100
  }

  @media screen and (max-width: 767px) {
    .text__processing {
      font-size: calc(1.6vw + .3em);
      padding: .5rem 0;
    }

    .text__process {
      font-size: calc(2.3vw + .3em);
      padding: 0;
    }

    .processing__cycle i {
      font-size: 50px;
    }
  }
</style>
