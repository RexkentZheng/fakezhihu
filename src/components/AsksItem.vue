<template>
  <div class="asks">
    <a href="#">
      <h2 class="question-title">
        <router-link :to="{name: 'detailsQuestions', params: {id: item.id}}">{{item.title}}</router-link>
      </h2>
    </a>
    <span class="question-info">
      {{item.createdAt}} · 12个回答
    </span>
  </div>
</template>
<script>
export default {
  props: ['item'],
  data() {
    return {
    };
  },
};
</script>
