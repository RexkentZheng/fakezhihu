<template>
  <div class="editor">
    <editor-header
      @createArticle=createArticle
    />
    <div class="content m-t-50">
      <el-upload
        class="img-upload m-b-15"
        drag
        action="/imgs/upload"
        :on-success=uploadSuc
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">添加题图</div>
      </el-upload>
      <img :src=imgUrl alt="">
      <el-input
        v-model="title"
        class="m-b-15"
        size="medium"
        placeholder="请输入标题（最多50个字）"
      />
      <rich-text-editor
        :content='content'
        @updateConetent=updateConetent
      />
    </div>
  </div>
</template>
<script>
import EditorHeader from '@/components/EditorHeader.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import _ from 'lodash';
import request from '@/service';
import { getCookies } from '@/lib/utils';

export default {
  props: ['value'],
  components: {
    RichTextEditor,
    EditorHeader,
  },
  data() {
    return {
      title: '',
      content: '123',
      imgUrl: '',
      type: '999'
    };
  },
  methods: {
    uploadSuc(response, file) {
      this.imgUrl = response.url;
    },
    updateConetent(content) {
      this.content=content;
    },
    async createArticle() {
      await request.post('/users', {
        content: this.content,
        title: this.title,
        imgUrl: this.imgUrl,
        userName: getCookies('name'),
        userId: getCookies('id'),
      }).then((res) => {
        console.log(res);
      });
    }
  },
};
</script>
