<template>
  <quill-editor
    class="rich-text-editor"
    v-model="value"
    ref="myQuillEditor"
    :options= "options"
    @change="updateRichText($event)"
  >
  </quill-editor>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';
import _ from 'lodash';

export default {
  props: ['content'],
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
  },
  methods: {
    updateRichText(content) {
      console.log(content);
      this.$emit('updateConetent',content.html);
    }
  },
};
</script>
