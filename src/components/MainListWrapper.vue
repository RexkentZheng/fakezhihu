<template>
  <div>
    <main-list-nav
      :type= "type"
    />
    <el-card v-loading="loading" >
      <div class="card-content">
        <router-view
          v-for="(item, index) in fakeInfo"
          :key="index"
          :item="item"
          :index="index"
          :type="item.type"
          :showPart="['title']"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import MainListNav from '@/components/MainListNav.vue';
import request from '@/service';

export default {
  components: {
    MainListNav,
  },
  watch: {
    $route: 'fetchDate',
  },
  mounted() {
    this.fetchDate();
  },
  data() {
    return {
      type: 'main',
      loading: false,
      fakeInfo: [],
      hotList: [],
      normalList: [],
    };
  },
  methods: {
    fetchDate() {
      this.loading = true;
      if (this.$route.name === 'home') {
        this.getNormalList();
        this.loading = false;
      } else if (this.$route.name === 'hot') {
        this.getHotList();
        this.loading = false;
      } else {
        this.getNormalList();
        this.loading = false;
      }
    },
    async getHotList() {
      await request.get('/hot-list-web', {
        limit: 50,
        desktop: true,
      }).then((res) => {
        if (res.status === 200) {
          this.fakeInfo = [];
          this.fakeInfo = res.data.data;
        }
      });
    },
    async getNormalList() {
      await request.get('/articles/list').then((res) => {
        if (res.status === 200) {
          this.fakeInfo = [];
          this.fakeInfo = res.data.list;
        }
      });
    },
  },
};
</script>
