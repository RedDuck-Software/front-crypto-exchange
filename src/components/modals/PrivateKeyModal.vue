<template>
    <IModal ref="modal" :visible="visible" @close="close">
    <div>
        <div class="private-key__wrapper block-shadow">
            <p class="private-key__title text-center">Private Key</p>
            <input type="text" placeholder="Private Key" class="border-grey private-key__enter">
            <button class="private-key__import">Import</button>
        </div>
    </div>
    </IModal>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { Portal } from 'portal-vue';
    import IModal from "../tags/cModal.vue";
    import BaseModal from "../BaseModal";

    @Component({ name: 'PrivateKeyModal', components: {IModal, Portal } })
    export default class PrivateKeyModal extends BaseModal {

    }
</script>

<style scoped>

</style>
