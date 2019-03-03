<template>
  <div>
    <div class="actions">
      <el-button v-if="showActionItems.indexOf('hot') >= 0"  class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-fire"></span>
        {{metrics_area.text}}
      </el-button>
      <el-button v-if="showActionItems.indexOf('vote') >= 0" size="small" type="primary" plain icon="el-icon-caret-top">赞同 {{voteup_count}}</el-button>
      <el-button v-if="showActionItems.indexOf('vote') >= 0"  size="small" type="primary" plain icon="el-icon-caret-bottom"></el-button>
      <el-button
        v-if="showActionItems.indexOf('comment') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        @click="getCommentList()"
      >
        <span class="el el-icon-fakezhihu-comment"></span>
        {{comment_count}} 条评论
      </el-button>
      <el-button v-if="showActionItems.indexOf('share') >= 0"  class="btn-text-gray m-l-25" size="medium" type="text" icon="el-icon-share">分享</el-button>
      <el-button v-if="showActionItems.indexOf('favorite') >= 0"  class="btn-text-gray m-l-25" size="medium" type="text" icon="el-icon-star-on">收藏</el-button>
      <el-button v-if="showActionItems.indexOf('thanks') >= 0"  class="btn-text-gray m-l-25" size="medium" type="text">
        <span class="el el-icon-fakezhihu-heart"></span>
        {{thanks_count}} 个感谢
      </el-button>
      <el-dropdown v-if="showActionItems.indexOf('more') >= 0"  placement="bottom" class="m-l-25">
        <el-button class="btn-text-gray" size="medium" type="text" icon="el-icon-more">
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>没有帮助</el-dropdown-item>
          <el-dropdown-item>举报</el-dropdown-item>
          <el-dropdown-item>申请授权</el-dropdown-item>
          <el-dropdown-item>不感兴趣</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="showActionItems.indexOf('setting') >= 0"  placement="bottom" class="m-l-25">
        <el-button class="btn-text-gray" size="medium" type="text" icon="el-icon-setting">
          设置
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="deleteArticles()">删除</el-dropdown-item>
          <el-dropdown-item @click.native="$router.push({name: 'editor', params: {articleId: itemId}})">编辑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-card class="comment" v-if="commentShow" v-loading="commentLoading">
      <span class="comment-type">精选评论（{{featuredComments.length}}）</span>
      <div class="featured" v-for="(item, index) in featuredComments" :key="item.id">
        <comment-item
          :item="item"
          class="first-comment"
          :class="index === 0 ? 'first-in-first' : ''"
        />
      </div>
      <span class="comment-type m-t-10">评论（{{normalComments.length}}）</span>
      <div class="normal" v-for="(item, index) in normalComments" :key="`${item.id}-${index}`">
        <comment-item
          :item="item"
          class="first-comment"
          :class="index === 0 ? 'first-in-first' : ''"
        />
          <div class="child-comments" v-if="item.child_comments">
            <div class="item" v-for="(child, index) in item.child_comments" :key="`${child.id}-${index}`">
              <comment-item
                :item="child"
                class="second-comment"
              />
          </div>
        </div>
      </div>
      <el-button type="info" plain size="mini" @click="commentShow = false">收起评论</el-button>
    </el-card>
  </div>
</template>
<script>
import CommentItem from '@/components/CommentItem.vue';
import request from '@/service';
import _ from 'lodash';
import moment from 'moment';
import { getCookies } from '@/lib/utils'

export default {
  props: ['comment_count', 'thanks_count', 'voteup_count', 'relationship', 'metrics_area', 'showActionItems', 'type', 'itemId'],
  inheritAttrs: false,
  components: {
    CommentItem,
  },
  data() {
    return{
      featuredComments: [],
      normalComments: [],
      commentShow: false,
      commentLoading: false,
    };
  },
  methods: {
    getCommentParams() {
      const response = async () => {
        const r = await request.get('/answer/comment', {});
        return r;
      };
      return new Promise((reslove) => {
        reslove(response());
      });
    },
    getCommentList() {
      this.commentShow = true;
      this.commentLoading = true;
      this.getCommentParams().then((res) => {
        if (res.status === 200) {
          this.comments = res.data.data;
          this.featuredComments = _.compact(_.map(res.data.data, (item) => {
            if (item.featured) {
              return item;
            }
          }));
          this.normalComments = _.compact(_.map(res.data.data, (item) => {
            if (!item.featured) {
              return item;
            }
          }));
          this.commentLoading = false;
        }
      });
    },
    async deleteArticles() {
      await request.delete('/articles', {
        data: {
          userId: getCookies('id'),
          articleId: this.itemId,
        }
      }).then((res) => {
        if (res.data.status === 202) {
          this.$Message.success('删除成功');
          this.$emit('getAnswerList');
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
  },
};
</script>
