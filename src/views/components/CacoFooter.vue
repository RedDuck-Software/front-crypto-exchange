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
import { Component, Vue } from 'vue-property-decorator'
import Ca from '@/components/tags/ca.vue'

  @Component({
    name: 'CFooter',
    components: { Ca }
  })

export default class CFooter extends Vue {
    public info = [
      {
        text: 'Contact',
        href: 'mailto:admin@cacoglobal.com'
      },
      {
        text: 'Terms & Conditions',
        href: 'https://drive.google.com/file/d/1P8AhZuP6856r7Pq7UgMKxBjlKseuPn3O/view?usp=sharing'
      },
      {
        text: 'CACO Coin',
        href: 'https://drive.google.com/file/d/1EPEQNEEtD6ekaOldrq6bq5BZU_SiDkXW/view'
      }
    ]

    public socialmedia = [
      {
        icon: 'fab fa-facebook-f',
        href: 'https://www.facebook.com/cacoglobal'
      },
      {
        img: {
          src: 'socialmedia/Twitter.png'
        },
        href: 'https://twitter.com/cacoglobal'
      },
      {
        img: {
          src: 'socialmedia/Telegram.png'
        },
        href: 'https://t.me/CACOGlobal'
      },
      {
        img: {
          src: 'socialmedia/Reddit.png'
        },
        href: 'https://www.reddit.com/user/cacoglobal'
      },
      {
        icon: 'fab fa-slack',
        href: 'https://join.slack.com/t/cacoglobal/signup'
      },
      {
        img: {
          src: 'socialmedia/Status.png',
          classes: 'footer__icon-status'
        },
        href: 'https://join.status.im/caco'
      }
    ]
}
</script>

<style scoped src="@/assets/css/footer.css">
</style>
