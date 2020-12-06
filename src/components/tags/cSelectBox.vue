<template>
  <div
    class="coin__wrapper d-flex align-items-center"
    v-click-outside="hideSelect"
  >
    <div
      v-if="vModel.icon"
      @click="open = !open"
      class="coin flex align-center"
    >
      <img
        class="coin__logo"
        :src="require(`@/assets/img/${vModel.icon}`)"
      />

      <span
        class="coin__name ml-2"
        :class="currentClass"
      >
        {{ vModel.name }}
      </span>

      <div
        class="coin__arrow relative"
        :class="arrowClass"
      />

      <i
        class="text-gray-300 ml-2"
        :class="arrowIconClass"
        aria-hidden="true"
      />

      <div
        v-if="balance != undefined"
        class="ml-3 text-xs crypto__val"
        :class="currentClass"
      >
        Av:
        <span
          class="text-base d-inline"
          :class="currentClass"
        >
          {{ balance }}
        </span>
      </div>
    </div>

    <div
      v-else
      @click="open = !open"
      class="coin flex align-center"
    >
      <span
        class="coin__name ml-2"
        :class="currentClass"
      >
        Select
      </span>

      <div
        class="coin__arrow relative"
        :class="arrowClass"
      />

      <i
        class="text-gray-300 ml-2"
        :class="arrowIconClass"
        aria-hidden="true"
      />
    </div>

    <!-- ---------------------------- Dropdown ------------------------------- -->

    <slot name="dropdown">
      <div
        class="choices"
        :class="{ hidden: !open }"
      >
        <div v-show="step === 1">
          <div class="coins-menu space-y-2 p-3 overflow-auto">
            <div
              v-for="item in items"
              :key="item.name"
              @click.stop="select(item)"
              :class="{ 'opacity-25': !item.isAllowed }"
              class="coins-item items-center pl-3"
            >
              <img
                class="coins__logo ml-2"
                :src="require(`@/assets/img/${item.icon}`)"
              />

              <span class="text-coin">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-show="step === 2"
          class="h-100 p-3 flex flex-col"
        >
          <div class="flex flex-row my-1">
            <img
              v-if="vModel.icon"
              :src="require(`@/assets/img/${vModel.icon}`)"
            />

            <span
              class="text-gray-main text-2xl"
              :class="currentClass"
            >
              {{ vModel.name }}
            </span>
          </div>

          <div class="ml-1 flex-grow-1 d-flex flex-col justify-content-around">
            <label
              for="input-email__enter"
              class="text-gray-main my-1"
            >
              Add Paypal Email Address
            </label>

            <input
              v-model="email"
              type="text"
              placeholder="Email:"
              id="input-email__enter"
              class="my-1 mt-3"
            />

            <label
              v-if="emailError"
              style="color: red; font-size: .9rem;"
            >
              Invalid Email!
            </label>

            <div class="flex justify-between flex-row items-center mt-3">
              <button
                type="button"
                @click="onBackClicked"
                class="text-gray-main rounded-full small-transition px-2 py-1 hover:text-gray-400"
              >
                Back
              </button>

              <button
                type="button"
                @click="onEmailDone"
                class="input-email__btn small-transition input-email__btn"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import CommonSelectBox from '@/interfaces/CommonSelectBox'
import ClickOutside from 'vue-click-outside'

  @Component({
    name: 'CSelectBox',
    directives: {
      ClickOutside
    }
  })

export default class CSelectBox extends Vue {
    @Model('change') vModel!: CommonSelectBox;
    @Prop() balance!: number;
    @Prop() items!: CommonSelectBox[];
    @Prop({ default: false }) multistep!: boolean

    public open = false
    public step = 1

    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */

    get currentClass () {
      return this.$store.getters.theme === 'dark' ? 'darkMode' : 'lightMode'
    }

    get arrowClass () {
      var clss1 = this.open ? 'coin__arrow-open' : 'coin__arrow-close'
      var clss2 = this.$store.getters.theme === 'dark' ? 'arrowDarkMode' : 'arrowLightMode'
      return `${clss1} ${clss2}`
    }

    get arrowIconClass () {
      var clss1 = this.open ? 'fa fa-arrow-up' : 'fa fa-arrow-down'
      var clss2 = this.$store.getters.theme + 'Mode'
      return `${clss1} ${clss2}`
    }

    /* --------------------------------------------------------------------- */
    /* --------------------------------------------------------------------- */

    public created () {
      // console.log('vmolde empty', this.vModel.icon)
      // console.log('multistep', this.multistep)
    }

    public hideSelect () {
      this.open = false
    }

    public select (item: CommonSelectBox) {
      if (item.isAllowed) {
        this.$emit('change', item)
        if (this.multistep) {
          this.step = 2
        } else {
          this.open = false
        }
      }
    }

    /** ------------------------------ MultiStep -------------------------------------- **/

    public email = ''
    public emailError = ''

    public onBackClicked () {
      // this.$emit("select", 0);
      this.step = 1
    }

    public onEmailDone () {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!regex.test(this.email)) {
        this.emailError = 'Invalid Email'
        return ''
      }
      this.open = false
      this.$store.commit('setDesEmail', this.email)
    }
}
</script>
