<template>
  <div class="answer-item">
    <div class="author-info clearfix">
      <img :src="answer.author ? answer.author.avatarUrl : ''" alt="">
      <div class="detail">
        <p class="username">{{answer.author ? answer.author.name : ''}}</p>
        <p class="introduce">{{answer.author ? answer.author.headline: ''}}</p>
      </div>
    </div>
    <div class="extra-info">
      <span>{{JSON.parse(answer.status ? answer.status.voteUp : `[]`).length}}人赞同了该回答</span>
    </div>
    <div class="content">
      <div class="experct" v-show="showType === 'experct'">
        <span>{{answer.excerpt}}</span>
        <el-button class="btn-no-padding" type="text" icon="el-icon-arrow-down" @click="showType = 'all'">阅读全文</el-button>
      </div>
      <div v-show="showType === 'all'">
        <div v-html="answer.content"></div>
        <el-button class="btn-no-padding" type="text" icon="el-icon-arrow-up" @click="showType = 'experct'">收起</el-button>
      </div>
    </div>
    <div class="extra-info">
      <span>编辑于 {{answer.updatedAt.slice(0, 10)}}</span>
    </div>
    <list-item-actions
      class="actions"
      :type=2
      :itemId="answer.id"
      :status="answer.status"
      :commentCount="answer.comment.length"
      :commentShowType="showType"
      :showActionItems="['vote', 'comment', 'share', 'favorite', 'thanks', 'more']"
    />
  </div>
</template>
<script>
import ListItemActions from '@/components/ListItemActions.vue';

export default {
  props: ['answer'],
  components: {
    ListItemActions,
  },
  data() {
    return {
      showType: 'experct',
    };
  },
};
</script>
