<template>
  <div class="answer-main">
    <div class="title" v-if="showPart.indexOf('title') >= 0">
      <h2>
        <router-link
          :to="{name: type === 0 ? 'detailsArticles' : 'detailsQuestions', params: {id: transtedInfo.id}}">
          {{transtedInfo.title}}
        </router-link>
      </h2>
    </div>
    <div class="creator-info clearfix" v-if="showPart.indexOf('creator') >= 0">
      <img :src="item.author ? item.author.avatarUrl : ''" alt="">
      <div class="detail">
        <p class="username">{{item.author ? item.author.name : ''}}</p>
        <p class="introduce">{{item.author ? item.author.headline: ''}}</p>
      </div>
    </div>
    <div class="vote" v-if="showPart.indexOf('votes') >= 0">
      <span>
        {{item.status ? JSON.parse(item.status.voteUp).length : 0}} 人赞同了该回答
      </span>
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
      class="actions"
      v-bind="$attrs"
      v-on="$listeners"
      :type="item.type"
      :itemId="item.id"
      :status="item.status"
      :commentShowType="showType"
      :commentCount="item.comment ? item.comment.length : 0"
      :showActionItems="showActionItems"
    />
  </div>
</template>
<script>
import ListItemActions from '@/components/ListItemActions.vue';

export default {
  props: ['item', 'showPart', 'type'],
  inheritAttrs: false,
  components: {
    ListItemActions,
  },
  data() {
    return {
      showType: 'experct',
    };
  },
  computed: {
    transtedInfo() {
      if (this.type === 0) {
        return {
          id: this.item.id,
          title: this.showPart.indexOf('title') >= 0 ? this.item.title : '',
          cover: this.item.image_url || '',
        };
      }
      if (this.type === 2 && this.showPart.indexOf('title') >= 0) {
        return {
          id: this.item.question.id,
          title: this.item.question.title,
          cover: this.item.thumbnail || '',
        };
      }
      if (this.type === 2 && this.showPart.indexOf('title') < 0) {
        return {
          cover: this.item.thumbnail || '',
        };
      }
      return {
        id: 0,
        title: '',
        cover: '',
      };
    },
    showActionItems() {
      if (this.$route.name === 'home') {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'more'];
      }
      if (this.$route.name === 'peopleArticles') {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'setting'];
      }
      if (this.$route.name === 'peopleMain') {
        return ['vote', 'thanks', 'comment', 'share', 'favorite', 'setting'];
      }
      return ['vote', 'thanks', 'comment', 'share', 'favorite', 'more'];
    },
  },
};
</script>
