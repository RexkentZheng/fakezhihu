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
import { imgDec } from '@/lib/config.js';

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
      const url = `${imgDec}${response.fileName}`;
      this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getSelection(), 'image', url);
    },
  },
};
</script>
