<template>
  <div>
    <div class="comment-actions">
      <el-button class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-like"></span>
        {{152}}
      </el-button>
      <el-button class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-Chat"></span>
        查看回复
      </el-button>
      <el-button class="btn-text-gray" size="medium" type="text" @click="replyShow = true" v-show="!replyShow">
        <span class="el el-icon-fakezhihu-reply"></span>
        回复
      </el-button>
      <el-button class="btn-text-gray" size="medium" type="text" @click="replyShow = false" v-show="replyShow">
        <span class="el el-icon-fakezhihu-reply"></span>
        取消回复
      </el-button>
      <el-button class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-dislike"></span>
        踩
      </el-button>
      <el-button class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-flag"></span>
        举报
      </el-button>
    </div>
    <div class="reply" v-show="replyShow">
      <el-input class="input" type="text" v-model="replyContent" size="small"/>
      <el-button type="primary" size="small" class="m-l-25">发布</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      replyShow: false,
      replyContent: '',
    };
  },
};
</script>
