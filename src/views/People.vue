<template>
  <div class="people" v-loading="userLoading">
    <el-dialog
      :title="editorAnswer.question.title"
      :visible.sync="editorShow"
      :modal-append-to-body='false'
    >
      <rich-text-editor
        class="with-border m-t-10"
        ref="answerEditor"
        :content="editorAnswer.content"
        :placeHolder="editorPlaceholder"
        @updateContent="updateContent"
      />
      <div class="footer m-t-10">
        <el-button @click="editorShow = false">取 消</el-button>
        <el-button type="primary" @click="updateAnswer">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="profile">
      <div class="profile-header-cover">
        <img src="https://pic1.zhimg.com/80/v2-a15344fdf6d4824656f47a4bc1c8e29d_r.jpg" alt="">
      </div>
      <div class="profile-header-wrapper">
        <avatar-upload
          field="file"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          url="/imgs/upload"
          img-format="png"
          v-model="imgUploadShow"
          :width="300"
          :heght="300"
        />
        <div class="avatar" @click="activeUser ? imgUploadShow = true : ''" v-show="!imgUploadShow" >
          <img :src="userInfo.avatarUrl" alt="">
          <p class="img-hover-tip hidden" v-if="activeUser">
            <i class="el-icon-edit" />
            点击更改图片
          </p>
        </div>
        <div class="content">
          <p class="username">
            {{userInfo.name}}
          </p>
          <div class="content-header" v-show="!userInfoEditorShow">
            <p class="introduce">
              {{userInfo.headline}}
            </p>
          </div>
          <ul class="content-edit clearfix" v-show="userInfoEditorShow">
            <li>
              <span>座右铭：</span>
              <el-input type="text" v-model="newHeadLine" maxlength=150 />
            </li>
          </ul>
          <div class="sex" v-if="!detailsShow">
            <span class="el el-icon-fakezhihu-sexm middle-icon"></span>
          </div>
          <div class="details" v-if="detailsShow">
            <div class="item">
              <span class="type">所在行业</span>
              <span class="info">电子游戏</span>
            </div>
            <div class="item">
              <span class="type">职业经历</span>
              <span class="info">游戏制作人</span>
            </div>
            <div class="item">
              <span class="type">个人简介</span>
              <span class="info">斯维斯约徳高原上有一块巨石,它高一百英里,宽也一百英里。每隔一千年,便会有一只小鸟飞来打磨自己的喙，直到巨石磨光，永恒中便过了一天。</span>
            </div>
          </div>
          <el-button
            class="btn-text-gray"
            icon="el-icon-arrow-down"
            type="text"
            v-if="!detailsShow"
            @click="detailsShow = true"
          >查看详细资料</el-button>
          <el-button
            class="btn-text-gray"
            icon="el-icon-arrow-up"
            type="text"
            v-if="detailsShow"
            @click="detailsShow = false"
          >收起详细资料</el-button>
          <div class="btn-group">
            <div class="notActiveUser" v-show="!activeUser">
              <el-button type="info">已关注</el-button>
              <el-button type="info" plain >
                <span class="el el-icon-fakezhihu-xiaoxi-control"></span>
                发私信
              </el-button>
            </div>
            <div class="activeUserShow" v-show="activeUser && !userInfoEditorShow">
              <el-button
                type="primary"
                @click="userInfoEditorShow = true"
              >编辑个人信息</el-button>
            </div>
            <div class="activeUserEditor" v-show="activeUser && userInfoEditorShow">
              <el-button
                type="default"
                @click="userInfoEditorShow = false"
              >取消</el-button>
              <el-button
                type="primary"
                @click="updateUserInfo('headline', newHeadLine)"
              >保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="profile-main" v-loading="listLoading">
      <div class="profile-content">
        <main-list-nav
          :type= "'people'"
        />
        <el-card v-show="listInfo.length > 0">
          <router-view
            v-for="(item) in listInfo"
            @getList="getList"
            @editorShowFuc="editorShowFuc"
            :key="item.id"
            :item="item"
            :showPart="['title', 'creator', 'votes']"
            :type="item.type"
            :activeUser="activeUser"
          />
        </el-card>
        <el-card v-show="listInfo.length === 0">
          当前没有数据
        </el-card>
      </div>
      <div class="profile-sidebar">
        <el-card class="achievement">
          <div class="list-header">
            <span>个人成就</span>
          </div>
          <div class="list-item">
            <div class="title">
              <p><span class="el el-icon-fakezhihu-like middle-icon side-padding"></span> 获得8644次赞同</p>
            </div>
            <p class="info">获得2,733次感谢，21,791次收藏</p>
          </div>
          <div class="list-item">
            <div class="title">
              <p><span class="el el-icon-fakezhihu-edit-together middle-icon side-padding"></span> 参与6次公共编辑</p>
            </div>
          </div>
        </el-card>
        <el-card class="followship">
          <div class="numberBoard">
            <div class="item">
              <p class="text">关注了</p>
              <strong class="num">43</strong>
            </div>
            <div class="item">
              <p class="text">关注者</p>
              <strong class="num">433</strong>
            </div>
          </div>
        </el-card>
        <el-card class="no-padding m-b-15">
          <div class="nav-link">
            <a href="#">
              <span class="text">
                赞助的Live
                <span class="el el-icon-fakezhihu-Thunder"></span>
              </span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的话题
              </span>
              <span class="num">320</span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的专栏
              </span>
              <span class="num">21</span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的问题
              </span>
            </a>
          </div>
          <div class="nav-link">
            <a href="#">
              <span class="text">
                关注的收藏夹
              </span>
            </a>
          </div>
        </el-card>
        <sidebar-footer />
      </div>
    </div>
  </div>
</template>
<script>
import MainListNav from '@/components/MainListNav.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import request from '@/service';
import _ from 'lodash';
import { getCookies } from '@/lib/utils';
import AvatarUpload from 'vue-image-crop-upload';

export default {
  watch: {
    $route: 'getList',
  },
  components: {
    MainListNav,
    SidebarFooter,
    RichTextEditor,
    AvatarUpload,
  },
  mounted() {
    this.getList();
    this.getUser();
  },
  computed: {
    activeUser() {
      return this.userInfo.id === parseFloat(getCookies('id'));
    },
  },
  data() {
    return {
      listInfo: [],
      userInfo: {},
      editorAnswer: {
        question: {
          title: '',
        },
        content: '',
      },
      editorPlaceholder: '修改回答..',
      newHeadLine: '',
      listLoading: false,
      userLoading: false,
      editorShow: false,
      detailsShow: false,
      userInfoEditorShow: false,
      imgUploadShow: false,
      routerTrans: {
        peopleMain: '/answers/creator',
        peopleArticles: '/articles/creator',
        peopleAsks: '/questions/creator',
      },
    };
  },
  methods: {
    cropUploadSuccess(res) {
      this.updateUserInfo('avatarUrl', res.url.includes('http') ? res.url : `http${res.url}`);
      this.imgUploadShow = false;
    },
    cropUploadFail() {
      this.$Message.error('上传失败，请稍后再试');
    },
    async editorShowFuc(id) {
      this.editorAnswer = Object.assign({}, _.find(this.listInfo, item => item.id === id));
      this.editorShow = true;
      await this.waittingForRender(0);
      this.$refs.answerEditor.updateContent(this.editorAnswer.content);
    },
    updateContent(content, contentText) {
      this.editorAnswer.content = content;
      this.editorAnswer.excerpt = contentText.length > 100 ? contentText.slice(0, 100) : contentText;
    },
    waittingForRender(ms) {
      if (!this.$refs.answerEditor) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      return null;
    },
    async updateUserInfo(key, value) {
      this.userLoading = true;
      await request.put('/users', {
        id: parseFloat(getCookies('id')),
        colName: key,
        value,
      }).then((res) => {
        if (res.data.content === [0]) {
          this.$Message.error('修改失败，请稍后再试');
        } else {
          this.$Message.success('修改成功');
          this.userInfo[key] = value;
        }
        this.userInfoEditorShow = false;
      });
      this.userLoading = false;
    },
    async getList() {
      this.listLoading = true;
      this.listInfo = [];
      await request.get(this.routerTrans[this.$route.name], {
        creatorId: this.$route.params.id,
      }).then((res) => {
        if (res.data.status === 200) {
          this.listInfo = res.data.list;
          this.listLoading = false;
        } else {
          this.$Message.success('请求个人信息失败，请稍后再试');
          this.$router.push({
            name: 'home',
          });
        }
      });
    },
    async getUser() {
      this.userLoading = true;
      await request.get('/users', {
        userId: this.$route.params.id,
      }).then((res) => {
        if (res.data.status === 200) {
          this.userInfo = res.data.content;
          this.newHeadLine = this.userInfo.headline;
          this.userLoading = false;
        } else {
          this.$Message.error('获取用户信息失败，请稍后再试');
          this.$router.push({
            name: 'home',
          });
        }
      });
    },
    async updateAnswer() {
      await request.put('/answers', {
        creatorId: getCookies('id'),
        answerId: this.editorAnswer.id,
        content: this.editorAnswer.content,
        excerpt: this.editorAnswer.excerpt,
      }).then((res) => {
        if (res.data.msg[0] === 0) {
          this.$Message.error('修改失败，请稍后再试');
        } else {
          this.$Message.success('修改成功');
          this.getList();
        }
        this.editorShow = false;
      });
    },
  },
};
</script>
