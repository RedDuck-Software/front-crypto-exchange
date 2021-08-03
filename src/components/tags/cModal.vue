<template>
  <Portal to="modals">
    <div
      v-if="modalVisible"
      class="modal__main-wrapper fixed inset-0 flex flex-col items-center justify-center"
    >
      <Transition
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        appear
        @before-leave="backdropLeaving = true"
        @after-leave="backdropLeaving = false"
      >
        <div v-if="backdropVisible">
          <div
            class="absolute inset-0 bg-black opacity-25"
            @click="handleBackdropClick"
          />
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-class="opacity-0 transform scale-75"
        enter-to-class="opacity-100 transform scale-100"
        leave-class="opacity-100 transform scale-100"
        leave-to-class="opacity-0 transform scale-75"
        appear
        @before-leave="cardLeaving = true"
        @after-leave="cardLeaving = false"
      >
        <div
          v-if="showContent"
          :class="[contentClass, borderColorClass]"
          class="modal__wrapper relative max-w-full px-4 pt-8 pb-4 max-h-screen h-auto m-4 bg-white border-solid overflow-y-auto w-2/3"
        >
          <button
            class="modal__close absolute z-10 top-0 right-0 lg:-mt-4 mt-2 mr-8 lg:mr-6 text-3xl lg:text-5xl focus:outline-none hover:shadow-none"
            type="button"
            :class="buttonCloseClass"
            @click="onCloseClick"
          >
            &times;
          </button>
          <slot />
        </div>
      </Transition>
    </div>
  </Portal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Portal } from 'portal-vue'

  @Component({ name: 'CModal', components: { Portal } })
export default class CModal extends Vue {
    @Prop({ required: true })
    readonly visible!: boolean;

    @Prop({ default: true })
    readonly shouldCloseOnOutsideClick!: boolean;

    @Prop({ default: null })
    readonly clickCloseAction!: Function;

    @Prop({ default: '' })
    readonly buttonCloseClass!: boolean;

    @Prop({ default: '' })
    readonly contentClass!: string;

    @Prop({ default: 'border-white-700' })
    readonly borderColorClass!: string;

    @Watch('visible', { immediate: true })
    public onVisibilityChange (visible: boolean) {
      if (visible) {
        this.show()
      } else {
        this.close()
      }
    }

    get leaving () {
      return this.backdropLeaving || this.cardLeaving
    }

    @Watch('leaving')
    public onLeavingChange (leaving: boolean) {
      if (!leaving) {
        this.modalVisible = false
        this.$emit('close')
      }
    }

    private modalVisible = false;

    private backdropVisible = false;

    private showContent = false;

    private backdropLeaving = false;

    private cardLeaving = false;

    public onCloseClick () {
      if (this.clickCloseAction) {
        this.clickCloseAction()
      } else {
        this.close()
      }
    }

    public show () {
      this.modalVisible = true
      this.backdropVisible = true
      this.showContent = true

      document.body.style.setProperty('overflow', 'hidden')
    }

    public close () {
      this.backdropVisible = false
      this.showContent = false

      document.body.style.removeProperty('overflow')
    }

    public handleBackdropClick () {
      if (this.shouldCloseOnOutsideClick) {
        this.close()
      }
    }

    private created () {
      const onEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.visible) {
          this.close()
        }
      }

      document.addEventListener('keydown', onEscape)

      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', onEscape)
      })
    }
}
</script>

<style>
  .bg-black {
    background: rgba(0,0,0, 1);
  }
  .modal__main-wrapper {
    z-index: 1000;
    /* backdrop-filter: blur(5px); */
  }

  .modal__wrapper {
    border-radius: 50px
  }
  @media screen and (max-width: 850px) {
    .error__text-one {
      width: calc(91% + 5%);
    }
  }

  @media screen and (max-width: 767px) {
    .modal__wrapper {
      padding: 1rem;
      border-radius: 20px;
    }

    .modal__btn-continue {
      padding: .5rem 2.2rem !important;
      font-size: 1em;
      margin-top: 0;
    }

    .modal__wrap p {
      font-size: 2.1vw;
      margin: .5rem auto;
    }

    .complete__img {
      max-width: 22%;
    }

    .text__processing {
      font-size: calc(1.6vw + .3em);
    }

    .text__process {
      font-size: calc(2.3vw + .3em);
    }

    .processing__cycle {
      width: 50px;
      height: 50px;
    }

    .modal__close {
      right: -1.5rem;
      top: -.6rem;
    }
  }

  @media screen and (max-width: 650px) {
    .modal__wrap p {
      font-size: .9em;
    }
  }

  @media screen and (max-width: 570px) {
    .modal__wrap p {
      font-size: .8em;
    }
  }

  @media screen and (max-width: 460px) {
    .modal__wrap p {
      font-size: calc(2.7vw + .5vw);
    }

    .modal__wrapper  {
      width: 80%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 925px) {
    .modal__wrap p {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 926px) and (max-width: 1100px) {
    .error__text-one {
      width: calc(70% + 5%);
    }
  }

  @media screen and (min-width: 1101px) and (max-width: 1250px) {
    .error__text-one {
      width: calc(56% + 5%);
    }
  }

  @media screen and (min-width: 1251px) and (max-width: 1950px) {
    .error__text-one {
      width: calc(53% + 3%);
    }
  }
</style>
