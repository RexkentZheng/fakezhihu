<template>
  <div>
    <div class="actions">
      <el-button v-if="showActionItems.indexOf('hot') >= 0"  class="btn-text-gray" size="medium" type="text">
        <span class="el el-icon-fakezhihu-fire"></span>
        {{metrics_area.text}}
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        icon="el-icon-caret-top"
        :plain="JSON.parse(activeStatus.voteUp).indexOf(userId) < 0"
        @click="updateStatus('voteUp', JSON.parse(activeStatus.voteUp).indexOf(userId) < 0 ? 'add' : 'pull')"
      >
        赞同 {{JSON.parse(activeStatus.voteUp).length}}
      </el-button>
      <el-button
        v-if="showActionItems.indexOf('vote') >= 0"
        size="small"
        type="primary"
        icon="el-icon-caret-bottom"
        :plain="JSON.parse(activeStatus.voteDown).indexOf(userId) < 0"
        @click="updateStatus('voteDown', JSON.parse(activeStatus.voteDown).indexOf(userId) < 0 ? 'add' : 'pull')"
      />
      <el-button
        v-if="showActionItems.indexOf('comment') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        @click="dispalyComments()"
      >
        <span class="el el-icon-fakezhihu-comment"></span>
        {{commentCount}} 条评论
      </el-button>
      <el-button v-if="showActionItems.indexOf('share') >= 0"  class="btn-text-gray m-l-25" size="medium" type="text" icon="el-icon-share">分享</el-button>
      <el-button v-if="showActionItems.indexOf('favorite') >= 0"  class="btn-text-gray m-l-25" size="medium" type="text" icon="el-icon-star-on">收藏</el-button>
      <el-button
        v-if="showActionItems.indexOf('thanks') >= 0"
        class="btn-text-gray m-l-25"
        size="medium"
        type="text"
        @click="updateStatus('thanks', JSON.parse(activeStatus.thanks).indexOf(userId) < 0 ? 'add' : 'pull')"
      >
        <span class="el el-icon-fakezhihu-heart"></span>
        {{JSON.parse(activeStatus.thanks).indexOf(userId) &lt; 0 ? `${JSON.parse(activeStatus.thanks).length} 个感谢` : '取消感谢'}}
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
          <el-dropdown-item @click.native="deleteContent()">删除</el-dropdown-item>
          <el-dropdown-item @click.native="editorContent()">编辑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-card class="comment" v-if="commentListShow">
      <comment-list
        :targetId="itemId"
        :targetType="type"
      />
      <hr class="hr m-b-15 m-t-15" color=#dcdfe6 size=1 />
      <el-button class="block-center m-b-15" type="info" size="mini" plain @click="commentListShow = false">收起评论</el-button>
    </el-card>
    <el-dialog  class="no-title-dialog" title="" :visible.sync="commentDialogShow" :modal-append-to-body='false'>
      <comment-list
        :targetId="itemId"
        :targetType="type"
      />
    </el-dialog>
  </div>
</template>
<script>
import request from '@/service';
import _ from 'lodash';
import { getCookies } from '@/lib/utils';

export default {
  props: [
    'status',
    'showActionItems',
    'type',
    'itemId',
    'commentCount',
    'commentShowType',
    'metrics_area',
  ],
  inheritAttrs: false,
  data() {
    return {
      commentListShow: false,
      commentDialogShow: false,
      updatedStatus: {},
      userId: 0,
    };
  },
  mounted() {
    this.userId = parseFloat(getCookies('id'));
  },
  computed: {
    activeStatus() {
      return _.isEmpty(this.updatedStatus) ? this.status : this.updatedStatus;
    },
  },
  methods: {
    dispalyComments() {
      if (this.commentShowType === 'experct') {
        this.commentListShow = true;
      } else {
        this.commentDialogShow = true;
      }
    },
    editorContent() {
      if (this.type === 0) {
        this.$router.push({
          name: 'editor',
          params: {
            articleId: this.itemId,
          },
        });
      } else if (this.type === 2) {
        this.$emit('editorShowFuc', this.itemId);
      }
    },
    deleteContent() {
      if (this.type === 2) {
        this.deleteAnswers();
      } else if (this.type === 0) {
        this.deleteArticles();
      }
    },
    async deleteArticles() {
      await request.delete('/articles', {
        data: {
          userId: getCookies('id'),
          articleId: this.itemId,
        },
      }).then((res) => {
        if (res.data.status === 202) {
          this.$Message.success('删除成功');
          this.$emit('getList');
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    async deleteAnswers() {
      await request.delete('/answers', {
        data: {
          userId: getCookies('id'),
          answerId: this.itemId,
        },
      }).then((res) => {
        if (res.data.status === 202) {
          this.$Message.success('删除成功');
          this.$emit('getList');
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    async updateStatus(colName, opreation) {
      await request.put('/status', {
        statusId: this.status.id,
        colName,
        opreation,
        value: this.userId,
      }).then((res) => {
        if (res.data.status === 201) {
          this.$Message.success('修改成功');
          this.updatedStatus = res.data.content;
        }
      });
    },
  },
};
</script>
