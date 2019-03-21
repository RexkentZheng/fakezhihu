<template>
  <div class="comment-list p-t-20" v-loading="loading">
    <p v-show="commentList.length === 0">当前没有评论</p>
    <p v-show="commentList.length !== 0">
      共{{commentList.length}}条评论
    </p>
    <comment-item
      v-for="(comment, index) in commentList"
      :key="index"
      :item="comment"
      @getComments="getComments"
    />
    <div class="comment-part clearfix">
      <el-input class="comment-input" v-model="comment"/>
      <el-button class="comment-btn" type="primary" @click="createComment()">发布</el-button>
    </div>
  </div>
</template>
<script>
import CommentItem from '@/components/CommentItem.vue';
import request from '@/service';
import { getCookies } from '@/lib/utils';

export default {
  props: ['targetId', 'targetType'],
  data() {
    return {
      loading: true,
      comment: '',
      commentList: [],
    };
  },
  components: {
    CommentItem,
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
      this.loading = true;
      await request.get('/comments', {
        targetId: this.targetId,
        targetType: this.targetType,
      }).then((res) => {
        if (res.data.status === 200) {
          this.commentList = res.data.list;
          this.loading = false;
        } else {
          this.$Message.error(res.error);
          this.getComments();
        }
      });
    },
    async createComment() {
      await request.post('/comments', {
        targetId: this.targetId,
        targetType: this.targetType,
        content: this.comment,
        creatorId: getCookies('id'),
      }).then((res) => {
        if (res.data.status === 201) {
          this.$Message.success('评论成功');
          this.getComments();
          this.comment = '';
        } else {
          this.$Message.error(res.error);
          this.getComments();
          this.comment = '';
        }
      });
    },
  },
};
</script>
