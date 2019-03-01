<template>
  <div>
    <div class="comment-item">
      <div class="header clearfix">
        <div class="user-info">
          <span class="avatar">
            <img :src="item.author.member.avatar_url" alt="">
          </span>
          <span class="username">
            {{item.author.member.name}}
          </span>
          <span class="connection" v-if="item.reply_to_author">回复</span>
          <span class="reply-name" v-if="item.reply_to_author">
            {{item.reply_to_author.member.name}}
          </span>
        </div>
        <span class="created-time">
          {{item.created_time | dateFilter}}
        </span>
      </div>
      <span class="content" v-html="item.content">
      </span>
    </div>
    <div>
      <comment-item-actions />
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import CommentItemActions from '@/components/CommentItemActions'

export default {
  props: ['item'],
  components: {
    CommentItemActions,
  },
  filters: { 
    dateFilter: (date) => {
      moment.locale('zh-cn');
      return moment.unix(date).fromNow();
    }
  }
}
</script>
