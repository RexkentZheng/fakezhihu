<template>
  <div class="answer-main">
    <div class="title" v-if="showPart.indexOf('title') >= 0">
      <h2>{{transtedInfo.title}}</h2>
    </div>
    <div class="creater-info" v-if="showPart.indexOf('creator') >= 0">
      <div class="avatar">
        <img :src="item.author.avatarUrl" alt="">
      </div>
      <div class="userinfo">
        <p class="username">
          {{item.author.name}}
        </p>
        <p class="headline">
          {{item.author.headline}}
        </p>
      </div>
    </div>
    <div class="vote" v-if="showPart.indexOf('votes') >= 0">
      <!-- <span>
        {{JSON.parse(item.status.voteUp).length}} 人赞同了该回答
      </span> -->
    </div>
    <div class="content-wrapper clearfix">
      <div class="shortCut" v-if="showType === 'experct'">
        <div class="cover" v-if="transtedInfo.cover">
          <img :src="transtedInfo.cover" alt="">
        </div>
        <div class="experct">
          <span>
            <span v-html="item.excerpt"></span>
            <el-button class="btn-no-padding" type="text" icon="el-icon-arrow-down" @click="showType = 'all'">阅读全文</el-button>
          </span>
        </div>
      </div>
      <div class="content" v-if="showType === 'all'">
        <div v-html="item.content"></div>
        <el-button class="btn-no-padding" type="text" icon="el-icon-arrow-up" @click="showType = 'experct'">收起</el-button>
      </div>
    </div>
    <list-item-actions
      v-bind="$attrs"
      v-on="$listeners"
      :type="type"
      :itemId="item.id"
      :thanks_count="item.voteup_count"
      :comment_count="33"
      :voteup_count="item.voteup_count"
      :relationship="33"
      :showActionItems="showActionItems"
    />
  </div>
</template>
<script>
import ListItemActions from '@/components/ListItemActions';

export default {
  props: ['item', 'showPart', 'type'],
  inheritAttrs: false,
  components: {
    ListItemActions,
  },
  data() {
    return{
      showType: 'experct',
    };
  },
  computed: {
    transtedInfo() {
      if (this.type === 'article') {
        return {
          title: this.item.title,
          cover: this.item.image_url,
        };
      } else if (this.type === 'answer') {
        return {
          title: this.item.question.title,
          cover: this.item.thumbnail || '',
        }
      }
    },
    showActionItems() {
      if (this.$route.name === 'home') {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'more'];
      } else if (this.$route.name === 'peopleArticles') {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'setting'];
      } else {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'more'];
      }
    }
  },
  methods: {
  }
};
</script>
