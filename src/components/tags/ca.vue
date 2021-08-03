<template>
  <a
    :href="item.href"
  >
    <slot
      v-if="item.text"
      name="text"
    >
      <span>{{ item.text }}</span>
    </slot>

    <slot
      v-else-if="item.icon"
      name="icon"
    >
      <i :class=item.icon />
    </slot>

    <slot
      v-else-if="item.img"
      name="img"
    >
      <img
        :src="require(`@/assets/img/${item.img.src}`)"
        :class="item.img.classes"
        :alt="item.img.alt"
      />
    </slot>
  </a>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

  @Component({
    name: 'ca'
  })

export default class ca extends Vue {
    @Prop({ default: true })
    public isDarkTheme!: boolean;

    @Prop({
      default: {
        href: '',
        text: '',
        icon: '',
        img: {
          src: '',
          classes: ''
        }
      }
    })
    public item!: Object;
}
</script>

<style scoped>

</style>
