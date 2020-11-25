<template>
  <div class="relative" v-click-outside="onClickOutside">
    <c-button
      :disabled="isConnected"
      :class="{'rounded-b-none md:rounded-b-full':open}"
      :bgClass="isConnected?'bg-green-500':'bg-color'"
      class="w-full md:absolute z-60 md:mb-0 mb-8 rounded-md"
      @click="connectWalletClick"
    >
      {{ text }}
    </c-button>

    <div
      class="flex bg-white flex-row
        items-center justify-center pb-8 pt-12 px-4
        absolute z-50 bottom-rounded w-full top-50
        transition duration-100 ease-in-out duration-100
        block-shadow"
      :class="{'hidden opacity-0': !open}"
    >
      <button
        type="button"
        @click="selectWallet('metamask')"
        class="text-center flex flex-row items-center wallet"
      >
        <img
          class="w-12"
          src="https://lh3.googleusercontent.com/8rzHJpfkdFwA0Lo6_CHUjoNt8OU3EyIe9BZNKGqj0C8BhleguW9LhXHbS46FAtLAJ9r2"
          alt
        />

        <span class="text-gray-600 ml-2 text-2xl">METAMASK</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  // @ts-nocheck
  import { Component, Vue, Emit, Model } from "vue-property-decorator";
  import { Wallet } from "@/interfaces/Wallet";
  import TrezorConnect from "trezor-connect";
  import Web3 from "web3";
  import PrivateKeyModal from "@/components/modals/PrivateKeyModal.vue";
  import ClickOutside from "vue-click-outside";
  import { GetPublicKey } from "trezor-connect/lib/types/networks/bitcoin.js.flow";
  import CButton from "@/components/tags/cButton.vue";

  const ethEnabled = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    }
    return false;
  };

  @Component({
    components: { CButton },
    name: "ConnectWalletButton",
    directives: {
      ClickOutside,
    },
  })
  export default class ConnectWalletButton extends Vue {
    public open = false;

    @Model("change", { default: "" })
    account!: string;

    get isConnected() {
      return !!this.account;
    }

    public onClickOutside() {
      if (!this.isConnected) {
        this.open = false;
      }
    }

    @Emit("change")
    public accountPicked(sender: string) {
      return sender;
    }

    public async selectWallet(wallet: Wallet) {
      if (wallet === "trezor") {
        const response = await this.connectTrezor({
          path: "m/44'/60'/0'/0'",
        });

        if (response.success) {
        }
      } else if (wallet === "metamask") {
        const enabled = await ethEnabled();

        if (enabled) {
          const accounts = await window.web3.eth.getAccounts();
          const sender = accounts[0];
          this.accountPicked(sender);
        }
      }

      this.open = false;
    }

    public async connectTrezor(params: GetPublicKey) {
      return await TrezorConnect.getPublicKey(params);
    }

    public connectWalletClick() {
      if (!this.isConnected) {
        this.open = true;
      }
    }

    get text() {
      if (this.isConnected) {
        return "Connected";
      } else {
        return "Connect Wallet";
      }
    }
  }
</script>

<style scoped>
  .z-60 {
    z-index: 60;
  }
  .bottom-rounded {
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
  .top-50 {
    top: 50%;
  }
  .wallet:hover {
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
    .block-shadow {
      top: 57%;
    }
  }
</style>
