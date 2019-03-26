<template>
  <div>
    <quill-editor
      class="rich-text-editor"
      v-model="value"
      ref="myQuillEditor"
      :options= "options"
      @change="updateRichText($event)"
    >
    </quill-editor>
    <el-upload
      class="hidden"
      action="/imgs/upload"
      :on-success=uploadSuc
      accept=".jpg,.jpeg,.JPG,.JPEG,.png,.PNG"
      multiple>
      <div ref="hiddenUpload"></div>
    </el-upload>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  props: ['content', 'placeHolder'],
  components: {
    quillEditor,
  },
  data() {
    return {
      value: '',
      options: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ header: 2 }, 'blockquote', 'code-block', { list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
        },
      },
    };
  },
  mounted() {
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
    this.$refs.myQuillEditor.quill.root.dataset.placeholder = this.placeHolder;
  },
  methods: {
    imgHandler(image) {
      if (image) {
        this.$refs.hiddenUpload.click(); //  绑定在element元素上没有click方法
      }
    },
    updateContent(content) {
      this.$refs.myQuillEditor.quill.root.innerHTML = content;
    },
    updateRichText(content) {
      this.$emit('updateContent', content.html, content.text);
    },
    uploadSuc(response) {
      const url = response.url.includes('http') ? response.url : `http${response.url}`; //  返回图片网址中如果没有http自动拼接
      //  此处必须时真实链接，否则无效
      const  fake = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551677220305&di=01ebb0a440e9fcf4ec25a8e16f3ee540&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fa56f7131096427f75f0f86f6d19b2cc908a75c44.jpg';
      this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getSelection(), 'image', fake);
    },
  },
};
</script>
