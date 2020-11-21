<template>
  <footer>
    <div class="container footer__wrapper">
      <div class="footer__items footer__contacts flex">
        <ca
          v-for="(item, i) in info"
          :key="i"
          :item="item"
          class="footer__item"
          target="_blank"
        />
      </div>

      <p class="footer__items footer__copyright">
        &copy; {{ new Date().getFullYear() }} Cash4Crypto
      </p>

      <div class="footer__items footer__social-wrap flex flex-row justify-around space-x-2 md:w-1/4">
        <ca
          v-for="(item, i) in socialmedia"
          :key="i"
          :item="item"
          class="w-8 footer__social"
          target="_blank"
        />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Ca from "@/components/tags/ca.vue";

  @Component({
    name: "CFooter",
    components: {Ca}
  })

  export default class CFooter extends Vue {

    public info = [
      {
        text: "Contact",
        href: "mailto:admin@cacoglobal.com",
      },
      {
        text: "Terms & Conditions",
        href: "https://drive.google.com/file/d/1P8AhZuP6856r7Pq7UgMKxBjlKseuPn3O/view?usp=sharing",
      },
      {
        text: "CACO Coin",
        href: "https://drive.google.com/file/d/1EPEQNEEtD6ekaOldrq6bq5BZU_SiDkXW/view",
      }
    ]

    public socialmedia = [
      {
        icon: "fab fa-facebook-f",
        href: "https://www.facebook.com/cacoglobal",
      },
      {
        img: {
          src: "socialmedia/Twitter.png"
        },
        href: "https://twitter.com/cacoglobal",
      },
      {
        img: {
          src: "socialmedia/Telegram.png"
        },
        href: "https://t.me/CACOGlobal",
      },
      {
        img: {
          src: "socialmedia/Reddit.png"
        },
        href: "https://www.reddit.com/user/cacoglobal",
      },
      {
        icon: "fab fa-slack",
        href: "https://join.slack.com/t/cacoglobal/signup",
      },
      {
        img: {
          src: "socialmedia/Status.png",
          classes: "footer__icon-status"
        },
        href: "https://join.status.im/caco",
      },
    ]
  }
</script>

<style>
  footer {
    position: absolute;
    bottom: 0;
    margin-top: 0;
    width: 100%;
    max-width: 100%;
    height: auto;
    background: rgba(63, 67, 74, 1);
  }

  @media screen and (min-width: 360px) and (max-width: 1100px) {
    footer {
      bottom: -6rem;
    }
  }

  .footer__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 1.2rem 0;
    width: 60%;
    height: 100%;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 775px) {
    .footer__wrapper {
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 900px) {
    .footer__wrapper {
      width: 80%;
    }
  }

  @media screen and (min-width: 901px) and (max-width: 1200px) {
    .footer__wrapper {
      width: 74%;
    }
  }

  .footer__logo {
    position: relative;
  }

  .fa-facebook-f {
    font-size: 1.6em;
    padding: .1rem 0 .2rem .6rem;
    opacity: .7;
  }

  .fa-slack {
    font-size: 1.8em;
    padding: 0 0 .2rem .3rem;
    opacity: .7;
  }

  @media screen and (min-width: 320px) {
    .footer__logo {
      padding-top: 0;
      margin: 0 auto 0 0;
      width: 12.5rem;
    }
  }

  @media screen and (min-width: 1300px) {
    .footer__logo {
      padding-top: 6.25rem;
    }
  }

  .footer__nav {
    justify-content: space-between;
    position: relative;
  }

  @media screen and (min-width: 320px) {
    .footer__nav {
      flex-direction: column;
    }
  }

  @media screen and (min-width: 800px) {
    .footer__nav {
      flex-direction: row;
    }
  }

  .footer__nav::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 0.061rem;
    background: #979797;
  }

  @media screen and (min-width: 320px) {
    .footer__nav::after {
      top: -1.2rem;
    }
  }

  @media screen and (min-width: 800px) {
    .footer__nav::after {
      top: 0;
    }
  }

  .footer__items {
    font-size: .93em;
  }

  @media screen and (min-width: 680px) and (max-width: 768px) {
    .footer__items {
      margin: 15px 0;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 549px) {
    .footer__social-wrap {
      margin: -1.6rem 0 0 auto;
    }
  }

  @media screen and (min-width: 550px) and (max-width: 680px) {
    .fa-facebook-f {
      font-size: 1.1em;
      padding: .1rem 0 .2rem 1rem;
    }

    .fa-slack {
      font-size: 1.35em;
    }

    .footer__social {
      width: 1.3rem;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 680px) {
    .footer__social-wrap {
      margin: 1rem 0 0;
    }

    .footer__contacts  {
      width: 100%;
      justify-content: space-between;
    }

    .footer__item:last-child {
      margin-right: 0;
    }

    .footer__copyright {
      margin: 1rem 0 0;
    }

    .fa-facebook-f {
      font-size: 1.2em;
      padding: .1rem 0 .2rem 1rem;
    }

    .fa-slack {
      font-size: 1.4em;
      padding: 0 0 .2rem .65rem;
    }
  }

  @media screen and (min-width: 360px) and (max-width: 450px) {
    .footer__contacts {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 680px) and (max-width: 1000px){
    .footer__social-wrap {
      width: auto;
      margin: .7rem auto 0;
    }
  }

  @media screen and (min-width: 360px) and (max-width: 550px) {
    .footer__social {
      max-width: 1.4rem;
    }

    .fa-facebook-f {
      font-size: 1.15em;
      padding: .1rem 0 .2rem 1.1rem;
    }

    .fa-slack {
      font-size: 1.45em;
      padding: 0 0 .2rem .6rem;
    }
  }

  @media screen and (min-width: 1100px) and (max-width: 1300px){
    .footer__social {
      max-width: 1.5rem;
      min-width: 1.4rem
    }

    .fa-facebook-f {
      font-size: 1.25em;
    }

    .fa-slack {
      font-size: 1.5em;
    }
  }

  @media screen and (min-width: 1301px) and (max-width: 1400px) {
    .footer__social {
      min-width: 2rem;
    }
  }

  .footer__icon-status {
    padding: 0 0 .2rem .3rem;
  }

  .footer__item {
    position: relative;
    margin-right: 1.875rem;
  }

  @media screen and (min-width: 320px) {
    .footer__item {
      font-size: 0.95em;
    }
  }

  @media screen and (min-width: 600px) {
    .footer__item {
      font-size: 1.1em;
    }
  }

  @media screen and (min-width: 800px) {
    .footer__item {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 950px) {
    .footer__item {
      font-size: 0.92em;
    }
  }

  @media screen and (min-width: 950px) and (max-width: 1200px) {
    .footer__item:nth-child(2)::before {
      left: 0.34rem;
    }
  }

  @media screen and (min-width: 950px) and (max-width: 1200px) {
    .footer__item:nth-child(2)::after {
      right: 0.1rem;
    }
  }

  @media screen and (min-width: 360px) and (max-width: 450px) {
    .footer__wrapper {
      width: 97%;
      margin: 0;
      flex-direction: column;
    }

    .footer__contacts {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    .footer__item {
      width: 26%;
      margin: 0;
      font-size: .85em;
      text-align: center;
    }

    .footer__item:nth-child(2) {
      width: 50%;
    }

    .footer__copyright {
      font-size: .85em;
      margin: 1rem auto;
    }

    .footer__social-wrap {
      width: 80%;
      margin: 0 auto;
    }
  }

  .footer__rights {
    margin: 0 auto;
    font-size: 0.87em;
    font-weight: 300;
    letter-spacing: 0.06em;
  }

  @media screen and (max-width: 768px) {
    .footer__rights {
      margin: 0;
    }
  }

  /* ------- social links */

  .footer__socials {
    justify-content: space-between;
    width: 29%;
  }

  @media screen and (min-width: 320px) {
    .footer__socials {
      justify-content: start;
      order: 1;
      margin: 1rem 0;
    }
  }

  @media screen and (min-width: 800px) {
    .footer__socials {
      order: initial;
      justify-content: space-between;
    }
  }

  .social__item {
    margin-left: 3.125rem;
  }

  @media screen and (min-width: 320px) and (max-width: 1200px) {
    .social__item {
      width: 20%;
      margin: 0.625rem 0;
    }
  }

  .social__item:hover {
    transform: scale(1.05);
  }

  .social__item i {
    font-size: 1.6em;
    width: 0.93rem;
    height: 1.437rem;
  }

  @media screen and (min-width: 650px) and (max-width: 1200px) {
    .social__item i {
      font-size: 2em;
      width: 1.1em;
      height: 1.3em;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 1200px) {
    .social__fb {
      margin-left: 0;
    }
  }
</style>
