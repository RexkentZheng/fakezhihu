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
      <i class="el-icon-upload"></i>
      <div class="el-upload__text" ref="hiddenUpload">添加题图</div>
    </el-upload>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
import Quill from 'quill'
import _ from 'lodash';

export default {
  props: ['content'],
  components: {
    quillEditor,
  },
  data() {
    return {
      value: '',
      addImgRange: '',//全局参数，每次添加图片时记录当前索引和长度
      imgUrl: '',
      options: {
        modules: {
          toolbar: [
            ['bold', 'italic'],
            [{ header: 2 }, 'blockquote', 'code-block', { list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
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
    this.value = this.content;
    const vm =this;
    const imgHandler = async (image) => {
      vm.addImgRange = vm.$refs.myQuillEditor.quill.getSelection()
      if (image) {
        vm.$refs.hiddenUpload.click();    //  绑定在element元素上没有click方法
      }
    }
    vm.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
  },
  methods: {
    updateRichText(content) {
      this.$emit('updateConetent',content.html, content.text);
    },
    updateLocalContent(content) {
      this.value = content;
    },
    uploadSuc(response, file) {
      const vm =this;
      const url = response.url.indexOf('http') != -1 ? response.url : 'http:' + response.url //返回图片网址中如果没有http自动拼接
      //  此处必须时真实链接，否则无效
      const a = 'https://quilljs.com/images/cloud.png';
      vm.$refs.myQuillEditor.quill.insertEmbed(vm.$refs.myQuillEditor.quill.getSelection() , 'image', a);
    },

  },
};
</script>
