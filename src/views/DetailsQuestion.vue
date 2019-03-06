<template>
  <div class="question-details" v-loading="loading">
    <div class="question-header">
      <el-dialog title="修改问题" :visible.sync="askModelVisiable" :modal-append-to-body='false'>
        <ask-model
          @changeAskModelVisiable="changeAskModelVisiable"
          @updateQuestion="getQuestion"
          :oldItem="questionData"
        />
      </el-dialog>
      <div class="question-header-content">
        <div class="question-header-main">
          <h1 class="question-header-title">
            {{questionData.title}}
            <el-button
              type="text"
              class="m-l-25 gray"
              @click="askModelVisiable = true"
            >
              <i class="el-icon-edit el-icon--left"></i>
              编辑
            </el-button>
          </h1>
          <div
            class="question-header-details"
            v-show="showType === 'experct'"
            v-if="questionData.excerpt"
          >
            <span>{{questionData.excerpt}}</span>
            <el-button
              class="btn-no-padding m-l-10"
              type="text"
              icon="el-icon-arrow-down"
              @click="showType = 'all'"
            >
              阅读全文
            </el-button>
          </div>
          <div
            class="question-header-details"
            v-show="showType === 'all'"
            v-if="questionData.excerpt"
          >
            <div v-html="questionData.discription"></div>
            <el-button
              class="btn-no-padding"
              type="text"
              icon="el-icon-arrow-up"
              @click="showType = 'experct'"
            >
              收起
            </el-button>
          </div>
        </div>
        <div class="question-header-side">
          <div class="question-header-side-item">
            <p class="name">被浏览</p>
            <p class="num">1212342314</p>
          </div>
          <div class="question-header-side-item">
            <p class="name">关注者</p>
            <p class="num">12123</p>
          </div>
        </div>
      </div>
      <div class="question-header-footer">
        <div class="question-header-footer-inner">
          <div class="question-header-footer-main">
            <div class="question-header-btnGroup">
              <el-button type="primary">关注问题</el-button>
              <el-button type="primary" plain icon="el-icon-edit" @click="showComment()">写回答</el-button>
            </div>
            <div class="question-header-actions">
              <el-button class="button" type="info" plain>
                <span class="el el-icon-fakezhihu-add-person-fill"></span>
                关注问题
              </el-button>
              <list-item-actions
                class="actions"
                :comment_count="questionData.commentCount"
                :showActionItems="['comment', 'share', 'more']"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="question-main">
      <div class="question-main-clo">
        <el-card class="m-b-15" v-loading="authorLoading" v-show="conmentVisiable">
          <div class="author-info m-t-25">
            <div class="avatar">
              <img :src="authorInfo.avatarUrl || ''" alt="">
            </div>
            <div class="userinfo">
              <p class="username">
                {{authorInfo.name}}
              </p>
              <p class="headline">
                {{authorInfo.headline}}
              </p>
            </div>
            <rich-text-editor
              class="with-border m-t-25 m-b-15"
              ref="richtext"
              :content="commentContent"
              :placeHolder="placeHolder"
              @updateConetent="updateConetent"
            />
            <div class="m-b-25">
              <el-button type="primary" @click="createAnswer">提交回答</el-button>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="no-answer m-t-25 m-b-25" v-show="questionData.answerCount === 0">
            当前问题没有回答
          </div>
          <div class="list" v-show="questionData.answerCount !== 0">
            <div class="list-header">
              <span>{{questionData.answerCount}}个回答</span>
            </div>
            <div class="list-item" v-for="(answer, index) in questionData.answer" :key="index">
              <answer-item
                :answer="answer"
                :index="index"
                :type="2"
                :showPart="['title']"
              />
            </div>
          </div>
        </el-card>
      </div>
      <div class="question-main-sidebar">
        <el-card class="m-b-15">
          <div class="header">
            <span>相关问题</span>
          </div>
          <div class="content">
            <div class="content-item">
              <a href="#" class="question">
                以申请离职而获得加薪要求的员工，以后的处境是什么样的？
              </a>
              <span class="answer-count">244个回答</span>
            </div>
            <div class="content-item">
              <a href="#" class="question">
                以申请离职而获得加薪要求的员工，以后的处境是什么样的？
              </a>
              <span class="answer-count">244个回答</span>
            </div>
            <div class="content-item">
              <a href="#" class="question">
                以申请离职而获得加薪要求的员工，以后的处境是什么样的？
              </a>
              <span class="answer-count">244个回答</span>
            </div>
          </div>
        </el-card>
        <sidebar-footer />
      </div>
    </div>
  </div>
</template>
<script>
import AnswerItem from '@/components/AnswerItem.vue';
import ListItemActions from '@/components/ListItemActions.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import AskModel from '@/components/AskModel.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import request from '@/service';
import { getCookies } from '@/lib/utils';

export default {
  components: {
    AnswerItem,
    ListItemActions,
    SidebarFooter,
    AskModel,
    RichTextEditor,
  },
  data() {
    return {
      questionData: {},
      loading: true,
      authorLoading: false,
      conmentVisiable: false,
      showType: 'experct',
      askModelVisiable: false,
      commentContent: '',
      commentExperct: '',
      placeHolder: '写回答...',
      authorInfo: {},
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    async getQuestion() {
      this.loading = true;
      await request.get('/questions', {
        questionId: this.$route.params.id,
      }).then((res) => {
        this.questionData = res.data.content;
        this.loading = false;
      });
    },
    async getAuthorInfo() {
      this.authorLoading = true;
      await request.get('/users', {
        userId: getCookies('id'),
      }).then((res) => {
        if (res.data.status === 200) {
          this.authorInfo = res.data.content;
          this.authorLoading = false;
        }
      });
    },
    async createAnswer() {
      this.authorLoading = true;
      await request.post('/answers', {
        creatorId: getCookies('id'),
        content: this.commentContent,
        excerpt: this.commentExperct,
        targetId: this.questionData.id,
      }).then((res) => {
        if (res.data.status === 201) {
          this.$Message.success('回答成功');
          this.authorLoading = false;
          this.getQuestion();
        } else {
          this.$Message.error('回答失败，请稍后再试');
        }
      });
    },
    changeAskModelVisiable(status) {
      this.askModelVisiable = status;
    },
    updateConetent(content, contentText) {
      this.commentContent = content;
      this.commentExperct = contentText.length > 100 ? contentText.slice(0, 100) : contentText;
    },
    showComment() {
      this.conmentVisiable = true;
      this.getAuthorInfo();
    },
  },
};
</script>
