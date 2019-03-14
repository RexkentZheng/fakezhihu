<template>
  <div>
    <div class="comment-actions">
      <el-button class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-like"></span>
        {{item.status ? JSON.parse(item.status.voteUp).length : 0}}
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        @click="replyShow = true"
        v-show="!replyShow"
        v-if="!deleteShow"
      >
        <span class="el el-icon-fakezhihu-reply"></span>
        回复
      </el-button>
      <el-button
        class="btn-text-gray"
        size="medium"
        type="text"
        @click="replyShow = false"
        v-show="replyShow"
        v-if="!deleteShow"
      >
        <span class="el el-icon-fakezhihu-reply"></span>
        取消回复
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="deleteShow"
        @click="deleteComment()"
      >
        <i class="el-icon-delete"></i>
        删除
      </el-button>
      <el-button
        class="btn-text-gray hover-hidden"
        size="medium"
        type="text"
        v-show="item.comment.length !== 0"
        @click="commentListShow = true"
      >
        <span class="el el-icon-fakezhihu-Chat"></span>
        查看回复
      </el-button>
      <el-button class="btn-text-gray hover-hidden" size="medium" type="text">
        {{item.status ? JSON.parse(item.status.voteDown).length : 0}}
        <span class="el el-icon-fakezhihu-dislike"></span>
        踩
      </el-button>
      <el-button class="btn-text-gray  hover-hidden" size="medium" type="text">
        <span class="el el-icon-fakezhihu-flag"></span>
        举报
      </el-button>
    </div>
    <el-card class="comment" v-if="commentListShow">
      <comment-list
        :targetId="item.id"
        :targetType="item.type"
      />
      <hr class="m-b-15 m-t-15" style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="100%" color=#dcdfe6 SIZE=1 />
      <el-button class="block-center m-b-15" type="info" size="mini" plain @click="commentListShow = false">收起评论</el-button>
    </el-card>
    <div class="reply" v-show="replyShow">
      <el-input class="input" type="text" v-model="replyContent" size="small"/>
      <el-button type="primary" size="small" class="m-l-25" @click="createComment()">发布</el-button>
    </div>
  </div>
</template>
<script>
import { getCookies } from '@/lib/utils';
import request from '@/service';

export default {
  props: ['item'],
  data() {
    return{
      replyShow: false,
      replyContent: '',
      commentListShow: false,
    };
  },
  computed: {
    deleteShow() {
      return this.item.author ? this.item.author.id === parseFloat(getCookies('id')) : false;
    },
  },
  methods: {
    async createComment() {
      await request.post('/comments', {
        targetId: this.item.id,
        targetType: this.item.type,
        content: this.replyContent,
        creatorId: getCookies('id'),
      }).then((res) => {
        if (res.data.status === 201) {
          this.$Message.success('评论成功');
          this.replyContent = '';
        }
      })
    },
    async deleteComment() {
      await request.delete('/comments', {
        data: {
          id: this.item.id,
          creatorId: getCookies('id'),
        }
      }).then((res) => {
        if (res.data.status === 202) {
          this.$Message.success('删除成功');
          this.$emit('getComments');
        }
      })
    },
  },
};
</script>
