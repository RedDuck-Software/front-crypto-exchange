<template>
  <div class="custom-bg hover:cursor-pointer converter__from">
    <div class="w-full">
      <div class="coin__wrap flex items-center justify-between">
        <div class="coin__wrapper d-flex align-items-center">
          <slot name="selection" />
          <!--<span>Show this message</span>-->
        </div>

        <slot name="errorMessage" />

        <slot name="input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'TransferVariant'
  })

  export default class TransferVariant extends Vue {


  }
</script>

<style scoped>

  .converter__from {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: 8.43rem;

    margin: .92rem 0 3.75rem;
    background: #595b5e;
    border: 33px solid rgba(67, 69, 72, 1);
    border-radius: 85px;
  }

  .validation {
    border: 1px solid #ff0030;
  }

  .text-color-pink {
    color: #fd2c63;
  }

  .text-gray-main {
    color: #c9c9c9;
  }
  .validation-result-money {
    color: #FF4E4E !important;
  }
  .choices {
    position: absolute;
    top: 3.4rem;
    left: 0;
    width: 15.8rem;

    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .3);

    border-radius: 22px;
    border: 1px solid #EAEAEA;
    z-index: 99;
  }

  .choices__field-search {
    position: relative;
    padding: 1.25rem 1.25rem 0 1.25rem;
  }

  .choices__field-search::after {
    content: "";
    position: absolute;
    display: block;
    margin: 0 auto;
    top: 50px;
    left: 20px;
    width: 80%;
    height: 1px;
    background: #ebebeb;
  }

  .choices__field-search i {
    position: absolute;
    top: 1.6rem;
    left: 1.5rem;
    color: #cecece;
    font-size: .9em;
  }

  .coins__search {
    display: block;
    width: 90%;
    padding-left: 1.6rem;
    font: 300 1.125em "Lato", sans-serif;
    border: none;
  }

  .coins-menu {
    width: 100%;
    margin: 1.15rem auto 1.15rem;
    height: 200px;
    border: none;
    outline: none;
    overflow: scroll;
  }

  .coins-item {
    position: relative;
    display: flex;
    height: 2.55rem;
    margin-bottom: .3rem;
    line-height: 2.5em;
    text-indent: 60px;
  }

  .coins-item:focus,
  .coins-menu:focus,
  .coins-menu:focus,
  .coins-search:focus {
    outline: none;
  }

  .coin:active {
    transform: scale(1.06);
  }

  .coin__logo {
    width: 2.57rem;
    height: 2.5rem;
  }

  .coin__arrow {
    margin: -.5rem 0 0 1.6rem;
  }

  .coin__arrow::before,
  .coin__arrow::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: .09rem;
    background-color: inherit;
  }

  .coin__arrow-close::before {
    height: .5rem;
    left: -.81rem;
    transform: rotate(-35deg);
  }

  .coin__arrow-close::after {
    right: .45rem;
    height: .5rem;
    transform: rotate(35deg);
  }

  .coin__arrow-open::before {
    height: .5rem;
    left: -.81rem;
    transform: rotate(35deg);
  }

  .coin__arrow-open::after {
    right: .45rem;
    height: .5rem;
    transform: rotate(-35deg);
  }

  .email {
    display: none;
  }

  .valid_email_tick {
    width: 1rem;
    height: 1rem;
    margin: 0 .5rem;
  }
  .darkMode, .darkPlaceholder::placeholder{
    color: #585858 !important;
  }
  .lightMode, .lightPlaceholder::placeholder{
    color: #fff;
  }

  .arrowDarkMode {
    background-color: #585858 !important;
  }
  .arrowLightMode {
    background-color: #fff;
  }

  .currency__value-text {
    margin-right: .6rem;
  }

  .text-margin {
    @apply mt-0;
  }

  @media (min-width: 768px) {
    .text-margin {
      @apply mt-3;
    }
  }

  .from__wrapper {
    margin-top: .9rem;
  }

  .from__input {
    max-width: 40%;
    margin-right: 1rem;
    margin-left: .9rem;
    padding: .1rem .3rem .3rem 0;

    background: inherit;

    font-size: 1.5rem;
    border-radius: 20px;
  }

  .from__input::placeholder {
    font-size: .9em;
    color: white;
  }

  .text-coin {
    color: #9a9a9a;
    font-size: 1.7em;
    line-height: 1.5em;
    text-indent: 3rem;
  }

  .currency__value {
    color: #ffffff;
    font-family: Lato;
    font-size: .75em;
    font-weight: 300;
    text-transform: uppercase;
  }

  @media screen and (min-width: 768px) and (max-width: 1100px) {
    .converter__from {
      margin: 1.25rem auto;
      height: 6.9rem;
      padding: .15rem  0;
      border-radius: 55px;
      border: 30px solid rgba(67, 69, 72, 1);
    }
  }

  .coins__logo {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2.55rem;
    object-fit: contain;
  }

  .coins__logo:nth-child(2) {
    width: 2.7rem;
    height: 1rem;
    top: 26%;
  }

  .coin {
    align-items: center;
    margin-left: 1rem;
    transition: .1s ease-in;
  }

  @media screen and (max-width: 767px) {
    .coin__wrap {
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .converter__from {
      align-items: flex-start;

      height: 4.93rem;
      width: 100%;
      margin: .9rem auto 3rem;

      background: #434548;
      border: .93rem solid #434548;
      border-radius: .93rem;
    }

    .light__field_bg {
      border: .93rem solid #ebebeb !important;
      background-color: #ebebeb !important;
    }

    .coin i {
      display: none;
    }

    .coin__wrapper {
      flex-wrap: wrap;
      max-width: 50%;
    }

    .coin {
      width: 100%;
      margin: 0 0 .45rem 0;
    }

    .coin__logo {
      width: 1.75rem;
      height: 1.7rem;
    }

    .text-base {
      font-size: .9em;
    }

    .crypto__val {
      margin-left: 0 !important;
    }

    .from__input {
      font-size: 1.3em;
      padding: .3rem .15rem 0 .1rem !important;
      display: block;
      margin: -.4rem 0 0 0;
    }

    .arrow-down {
      margin: 1.47rem auto;
      background-size: 1em;
    }

    .coin__name::after {
      left: 2rem;
      top: .2rem;
    }

    .current__cur {
      margin: 0 0 0 -.5rem !important;
      font-size: .6em;
      padding: .5rem 0 0 0;
    }

    .choices {
      top: 4rem;
      left: -.9rem;
    }

    .valid_email_tick {
      display: none;
    }

    .email {
      display: block;
      font-size: .7em;
      letter-spacing: .02em;
    }

    .currency__value-text {
      justify-content: flex-end;
      padding: 0 !important;
      margin-right: 0 !important;
      width: 40%;
    }

    .from__result-money {
      display: block;
      margin: -.8rem 0 0 auto;
      font-size: .625em;
      letter-spacing: .08em;
      order: 3;
    }
  }

  @media screen and (min-width: 768px) {
    .current__cur {
      margin-left: -.3rem;
    }

    .fa-dollar-sign {
      margin-right: -.5rem;
    }

    .coin__arrow {
      display: none;
    }

    .fa-euro-sign {
      margin-right: -.5rem;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 930px) {
    .from__result-money {
      position: absolute;
      bottom: -1.65rem;
      right: 1.3rem;
      font-size: .85em;
      letter-spacing: .04em;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1100px) {
    .coin__name {
      margin-left: .4rem;
      font-size: 1.4em;
      line-height: 0;
    }

    .coin__name::after {
      left: 3.1rem;
      top: -.68rem;
    }

    .from__wrapper {
      margin-top: .37rem;
    }

    .from__result-money {
      font-size: .75em;
      letter-spacing: .04em;
    }

    .currency__value {
      font-size: .5em;
    }

    .currency__value-text {
      margin-right: .5rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .email {
      display: inline-block;
    }
  }
</style>
