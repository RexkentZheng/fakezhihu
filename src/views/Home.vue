<template>
  <div class="home">
    <main-header />
    <router-view />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';

export default {
  name: 'home',
  components: {
    MainHeader,
  },
};
</script>
