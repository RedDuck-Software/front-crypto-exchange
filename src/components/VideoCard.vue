<template>
  <a
    href="https://drive.google.com/file/d/1fqyJz2ZgByga38f3Ascz3Brjr_mCW_t3/view?usp=sharing"
    target="_blank"
    class="video flex items-center justify-start mx-auto"
    :class="{ btn_border: light }"
  >
    <button
      type="button"
      class="video__play"
      :class="{ light__font_three: light, btn_border_radius: light }"
    >
      <i
        class="fas fa-play"
        :class="{ light__font_three: light }"
      ></i>
    </button>
    <p
      class="video__text"
      :class="{ light__font_three: light }"
    >
      See Video
    </p>
  </a>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'VideoCard'
  })

  export default class VideoCard extends Vue {

    get light() {
      return this.$store.getters.theme === 'light'
    }
  }
</script>
