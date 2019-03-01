<template>
  <div class="people">
    <el-card class="profile">
      <div class="profile-header-cover">
        <img src="https://pic1.zhimg.com/80/v2-a15344fdf6d4824656f47a4bc1c8e29d_r.jpg" alt="">
      </div>
      <div class="profile-header-wrapper">
        <div class="avatar">
          <img src="https://pic3.zhimg.com/v2-06e7cd8d27a976e105f7f69580d68f82_xll.jpg" alt="">
        </div>
        <div class="content">
          <div class="content-header">
            <span class="username">
              随安
            </span>
            <span class="introduce">
              李健鲁迅谢耳朵还有我这个大学生
            </span>
          </div>
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
            <el-button type="info">已关注</el-button>
            <el-button type="info" plain>
              <span class="el el-icon-fakezhihu-xiaoxi-control"></span>
              发私信
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <div class="profile-main" v-loading="loading">
      <div class="profile-content">
        <main-list-nav
          :type= "'people'"
        />
        <el-card class="">
          <router-view
            v-for="(item, index) in fakeInfo"
            :key="index"
            :item="item"
            :showPart= "['title', 'creator', 'votes']"
            :type= "type"
          />
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
import request from '@/service';
import _ from 'lodash';
import moment from 'moment';

export default {
  watch: {
    "$route": "changeInfo"
  },
  components: {
    MainListNav,
    SidebarFooter,
  },
  created() {
    this.loading = true;
    this.changeInfo();
  },
  data() {
    return{
      url: '/peopleInfo/answers',
      fakeInfo: [],
      type: 'answer',
      loading: false,
      detailsShow: false,
    };
  },
  methods: {
    changeInfo() {
      if(this.$route.name === 'peopleMain') {
        this.loading = true;
        this.url = '/peopleInfo/answers';
        this.type = 'answer';
        this.getAnswerList();
      } else if (this.$route.name === 'peopleArticles') {
        this.loading = true;
        this.url = '/articles/creator';
        this.type = 'article';
        this.getAnswerList();
      }
    },
    getAnswerListParams() {
      const response = async () => {
        const r = await request.get(this.url, {
          creatorId: 5
        });
        return r;
      };
      return new Promise((reslove) => {
        reslove(response());
      });
    },
    getAnswerList() {
      this.getAnswerListParams().then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (this.$route.name === 'peopleArticles') {
            this.fakeInfo = res.data;
          } else {
            this.fakeInfo = _.sortBy(res.data.data, (item) => {
              moment.unix(item.created_time);
            }) ;
          }
          this.loading = false;
        }
      });
    },
  },
};
</script>
