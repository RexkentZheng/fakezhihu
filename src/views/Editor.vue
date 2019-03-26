<template>
  <div class="editor">
    <editor-header
      @relaseArticles=relaseArticles
    />
    <div class="content m-t-50">
      <el-upload
        v-if="imgUrl === ''"
        class="img-upload m-b-15"
        drag
        action="/imgs/upload"
        :on-success=uploadSuc
        :limit="3"
        accept=".jpg,.jpeg,.JPG,.JPEG,.png,.PNG"
        multiple>
        <i class="el-icon-upload"></i>
        <div ref="hiddenUpload">添加题图</div>
      </el-upload>
      <!-- 此处无法显示本地图片，部署在服务器上就好，当前未部署，只能在伪造一个Img -->
      <!-- <img class="oldImg m-b-15" src="https://pic3.zhimg.com/v2-0cd1f1c469f59713d397864275f9349e_r.jpg" alt="" /> -->
      <img
        v-if="imgUrl !== ''"
        class="oldImg m-b-15"
        :src=imgUrl alt=""
        @click="$refs.hiddenUpload.click()"
      >
      <el-input
        v-model="title"
        class="m-b-15"
        size="medium"
        placeholder="请输入标题（最多50个字）"
      />
      <rich-text-editor
        ref="textEditor"
        :content="content"
        :placeHolder="placeHolder"
        @updateContent=updateContent
      />
    </div>
  </div>
</template>
<script>
import EditorHeader from '@/components/EditorHeader.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import request from '@/service';
import { getCookies } from '@/lib/utils';

export default {
  components: {
    EditorHeader,
    RichTextEditor,
  },
  data() {
    return {
      title: '',
      content: '',
      contentText: '',
      placeHolder: '请输入正文',
      imgUrl: '',
    };
  },
  mounted() {
    if (parseFloat(this.$route.params.articleId) !== 0) {
      this.getArticleInfo();
    }
  },
  methods: {
    uploadSuc(response) {
      this.imgUrl = response.url;
    },
    updateContent(content, contentText) {
      this.content = content;
      this.contentText = contentText;
    },
    relaseArticles() {
      if (parseFloat(this.$route.params.articleId) !== 0) {
        this.updateArticle();
      } else {
        this.createArticle();
      }
    },
    async createArticle() {
      await request.post('/articles', {
        content: this.content,
        excerpt: this.contentText.slice(0, 100),
        title: this.title,
        imgUrl: this.imgUrl,
        userId: getCookies('id'),
      }).then((res) => {
        if (res.status === 201) {
          this.$Message.success('文章新建成功！');
          this.$router.push({
            name: 'peopleArticles',
          });
        } else {
          this.$Message.error(res.error);
        }
      });
    },
    async getArticleInfo() {
      await request.get('/articles', {
        articleId: this.$route.params.articleId,
      }).then((res) => {
        if (res.data.status === 200) {
          const articleInfo = res.data.content;
          this.content = articleInfo.content;
          this.imgUrl = articleInfo.cover;
          this.title = articleInfo.title;
          this.$refs.textEditor.updateContent(this.content);
        } else {
          this.$Message.error('获取文章内容失败，请稍后再试');
          this.$router.go(-1);
        }
      });
    },
    async updateArticle() {
      await request.put('/articles', {
        articleId: this.$route.params.articleId,
        content: this.content,
        excerpt: this.contentText.slice(0, 100),
        title: this.title,
        imgUrl: this.imgUrl,
        userId: getCookies('id'),
      }).then((res) => {
        if (res.data.content === [0]) {
          this.$Message.error('文章修改失败，请稍后再试');
        } else {
          this.$Message.success('文章修改成功');
          this.$router.push({
            name: 'peopleArticles',
          });
        }
      });
    },
  },
};
</script>
