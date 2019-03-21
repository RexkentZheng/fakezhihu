<template>
  <div class="asks">
    <a href="#">
      <h2 class="question-title">
        <router-link :to="{name: 'detailsQuestions', params: {id: item.id}}">{{item.title}}</router-link>
      </h2>
    </a>
    <span class="question-info">
      {{item.updatedAt | dateFilter}} · {{item.answer ? item.answer.length : 0}}个回答 · {{item.comment ? item.comment.length : 0}}条评论
    </span>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: ['item'],
  data() {
    return {
    };
  },
  filters: {
    dateFilter: (date) => {
      moment.locale('zh-cn');
      return moment(date).format('YYYY-MM-DD');
    },
  },
};
</script>
