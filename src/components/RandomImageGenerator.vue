<template>
  <img :src="generateRandomImageUrl()" alt="Random Image" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  props: {
    width: Number,
    height: Number,
  },
  setup(props: any) {
    const randomImageUrl = ref('');
    const generateRandomImageUrl = () => {
      const width = props.width || 200 + rand();
      const height = props.height || 300 + rand();
      return `https://picsum.photos/${width}/${height}?random=1`;
    };

    const rand = () => Math.floor(Math.random() * 90);
    onMounted(() => {
      randomImageUrl.value = generateRandomImageUrl();
    });
    return {
      generateRandomImageUrl,
    };
  },
};
</script>
