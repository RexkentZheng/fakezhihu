<template>
  <header class="main-header">
    <el-dialog title="新的问题" :visible.sync="askModelVisiable" :modal-append-to-body='false'>
      <ask-model @changeAskModelVisiable=changeAskModelVisiable />
    </el-dialog>
    <div class="header-content">
      <router-link class="m-r-20" :to="{name: 'home'}">
        <img class="logo" src="./../assets/imgs/logo.png" alt="">
      </router-link>
      <el-menu
        :default-active="activeIndex"
        class="m-r-20"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">发现</el-menu-item>
        <el-menu-item index="3">话题</el-menu-item>
      </el-menu>
      <el-input size="small" class="search m-r-10" placeholder="请输入内容" v-model="keywords" >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button size="small" type="primary" @click="askModelVisiable = true">提问</el-button>
      <div class="userInfo" v-if="!isLogin">
        <router-link :to="{ name: 'signup'}">登录</router-link>
      </div>
      <div class="userInfo" v-if="isLogin">
        <i class="el-icon-bell m-r-40 icon-item"></i>
        <i class="el-icon-message m-r-40 icon-item"></i>
        <el-dropdown placement="bottom" trigger="click" class="hand-click">
          <span>
            {{this.name}}
            <!-- <img class="avatar" src="./../assets/imgs/logo.png" alt=""> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="goToPersonalPage">
                <span class="el el-icon-fakezhihu-person"></span>
                我的主页
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i class="el-icon-setting"> 设置</i>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div @click="logout">
                <span class="el el-icon-fakezhihu-poweroff"></span>
                退出
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
import AskModel from './AskModel.vue';
import request from '@/service';
import { getCookies } from '@/lib/utils';

export default {
  data() {
    return {
      isLogin: false,
      activeIndex: '1',
      keywords: '',
      name: '',
      askModelVisiable: false,
    };
  },
  components: {
    AskModel,
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      await request.get('/users/checkLogin')
        .then((res) => {
          if (res.status === 200) {
            this.name = res.data.name;
            this.isLogin = true;
          } else {
            this.$router.push({ name: 'signup' });
            this.isLogin = false;
          }
        });
    },
    async logout() {
      await request.post('/users/logout')
        .then((res) => {
          if (res.status === 200) {
            this.$Message.success('注销成功');
            this.name = '';
            this.$router.push({ name: 'signup' });
          } else {
            this.$Message.error('注销失败，请稍后再试');
          }
        });
    },
    handleSelect(key) {
      if (parseFloat(key) === 1) {
        this.$router.push({ name: 'home' });
      }
    },
    goToPersonalPage() {
      this.$router.push(`/people/${getCookies('id')}`);
    },
    changeAskModelVisiable(status) {
      this.askModelVisiable = status;
    },
  },
};
</script>
