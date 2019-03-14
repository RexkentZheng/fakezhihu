<template>
  <div>
    <div class="comment-item">
      <div class="header clearfix">
        <div class="user-info">
          <span class="avatar">
            <img :src="item.author.avatarUrl" alt="">
          </span>
          <span class="username">
            {{item.author.name}}
          </span>
        </div>
        <span class="created-time">
          {{item.createdAt | dateFilter}}
        </span>
      </div>
      <span class="content" v-html="item.content">
      </span>
    </div>
    <div>
      <comment-item-actions
        :item=item
        v-bind="$attrs"
        v-on="$listeners"
      />
    </div>
    <hr class="m-b-15" style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="100%" color=#dcdfe6 SIZE=1 />
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
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  },
};
</script>
