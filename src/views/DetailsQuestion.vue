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
              <el-button
                type="primary"
                plain icon="el-icon-edit"
                @click="showAnswerPart()"
                :disabled="!currentAnswerEmpty"
              >写回答</el-button>
            </div>
            <div class="question-header-actions">
              <el-button class="button" type="info" plain>
                <span class="el el-icon-fakezhihu-add-person-fill"></span>
                邀请回答
              </el-button>
              <list-item-actions
                class="actions"
                :itemId="questionData.id"
                :type=1
                :commentShowType="commentShowType"
                :commentCount="questionData.commentCount"
                :showActionItems="['comment', 'share', 'more']"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="question-main">
      <div class="question-main-clo">
        <el-card class="m-b-15" v-loading="authorLoading" v-show="answerVisiable">
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
              :content="answerContent"
              :placeHolder="placeHolder"
              @updateContent="updateContent"
            />
            <div class="m-b-25">
              <el-button type="default" @click="answerVisiable = false">取消</el-button>
              <el-button type="primary" @click="createAnswer">提交回答</el-button>
            </div>
          </div>
        </el-card>
        <el-card v-show="!currentAnswerEmpty" class="m-b-25">
          <list-item
            class="without-border no-padding"
            :item="currentAnswer"
            :showPart="['creator', 'votes']"
            :type="2"
          />
        </el-card>
        <el-card v-show="allAnswerLength === 0">
          <div class="no-answer m-t-25 m-b-25">
            当前问题没有回答
          </div>
        </el-card>
        <el-card v-show="questionData.answer ? questionData.answer.length > 0 : false">
          <div class="list">
            <div class="list-header">
              <span>{{questionData.answer ? questionData.answer.length : 0}}个回答</span>
            </div>
            <div class="list-item" v-for="(answer, index) in questionData.answer" :key="index">
              <list-item
                :item="answer"
                :index="index"
                :showPart="['creator', 'votes']"
                :type="2"
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
import ListItem from '@/components/ListItem.vue';
import ListItemActions from '@/components/ListItemActions.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import AskModel from '@/components/AskModel.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import request from '@/service';
import { getCookies } from '@/lib/utils';
import _ from 'lodash';

export default {
  components: {
    ListItem,
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
      answerVisiable: false,
      commentShowType: 'all',
      showType: 'experct',
      askModelVisiable: false,
      answerContent: '',
      answerExperct: '',
      placeHolder: '写回答...',
      authorInfo: {},
      currentAnswer: {},
    };
  },
  computed: {
    currentAnswerEmpty() {
      return _.isEmpty(this.currentAnswer);
    },
    allAnswerLength() {
      const questionDataAnswerLength = this.questionData.answer ? this.questionData.answer.length : 0;
      return this.currentAnswerEmpty ? questionDataAnswerLength : questionDataAnswerLength + 1;
    },
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
        this.questionData.answer = _.compact(_.map(this.questionData.answer, (item) => {
          if (item.creatorId === parseFloat(getCookies('id'))) {
            this.currentAnswer = item;
            return null;
          }
          return item;
        }));
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
        content: this.answerContent,
        excerpt: this.answerExperct,
        targetId: this.questionData.id,
      }).then((res) => {
        if (res.data.status === 201) {
          this.$Message.success('回答成功');
          this.authorLoading = false;
          this.answerVisiable = false;
          this.getQuestion();
        } else {
          this.$Message.error('回答失败，请稍后再试');
        }
      });
    },
    changeAskModelVisiable(status) {
      this.askModelVisiable = status;
    },
    updateContent(content, contentText) {
      this.answerContent = content;
      this.answerExperct = contentText.length > 100 ? contentText.slice(0, 100) : contentText;
    },
    showAnswerPart() {
      this.answerVisiable = true;
      this.getAuthorInfo();
    },
  },
};
</script>
