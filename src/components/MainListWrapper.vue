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
    "$route": "fetchDate"
  },
  created() {
    if(this.$route.name === 'hot') {
      this.getHotList();
    } else {
      this.fakeInfo = this.normalList;
    }
  },
  data() {
    return {
      type: 'main',
      loading: false,
      fakeInfo: [],
      hotList: [{
        feed_specific: {
          answer_count: 906,
          debut: false,
          score: 346,
          trend: 0,
        },
        excerpt_area: {
          text: '大家这一年都过得怎么样？ 相关讨论：为什么微信支付没有像支付宝那样的「年度账单」？',
        },
        image_area: {
          url: 'http://img18.3lian.com/d/file/201709/21/f498e01633b5b704ebfe0385f52bad20.jpg'
        },
        label_area: {
          night_color: "#B7302D",
          normal_color: "#F1403C",
          trend: 0,
          type: "trend",
        },
        link: {
          url: 'http://www.google.com',
        },
        metrics_area: {
          text: "878 万热度",
        },
        title_area: {
          text: "如何看待支付宝 2018 年度账单？和去年相比有哪些消费趋势的变化？",
        },
      }, {
        feed_specific: {
          answer_count: 6761,
          debut: false,
          score: 321,
          trend: 0,
        },
        excerpt_area: {
          text: '就是那些打死不对一些人说的秘密，为什么？ 对某个人或者一群人。 不能说或永远说不了，甚至不能写出来的，可以说说是哪方面的。',
        },
        image_area: {
          url: 'https://pic3.zhimg.com/80/v2-42cf8ddb11031b7d525c31cd171c0ea2_hd.jpg'
        },
        label_area: {
          night_color: "#B7302D",
          normal_color: "#F1403C",
          trend: 0,
          type: "trend",
        },
        link: {
          url: 'http://www.google.com',
        },
        metrics_area: {
          text: "830 万热度",
        },
        title_area: {
          text: "有哪些你准备藏一辈子的秘密？",
        },
      }],
      normalList: [{
        author: {
          avatar_url: "https://pic3.zhimg.com/50/v2-4dd31c1c22405df8456115845ee0c745_s.jpg",
          badge: [],
          gender: 1,
          headline: "喜欢社会心理学的 Linux Kernel Developer",
          id: "cff5cb05009df8e33dc3adfa5a203e7d",
          is_followed: false,
          is_following: false,
          is_org: false,
          name: "Hao Lee",
          type: "people",
          url: "https://api.zhihu.com/people/cff5cb05009df8e33dc3adfa5a203e7d",
          url_token: "kerneldeveloper",
          user_type: "people",
          vip_info: null,
        },
        relationship: {
          is_nothelp: false,
          is_thanked: false,
          upvoted_followee_ids: [],
          voting: 0,
        },
        question: {
          author: {
            avatar_url: "https://pic1.zhimg.com/50/6fee3a9af123d41bbae926a65795e0bf_s.jpg",
            badge: [],
            gender: 1,
            headline: "一只野生的阿虚",
            id: "f990c398850e94812d829ee025ae23c9",
            is_followed: false,
            is_following: false,
            is_org: false,
            name: "陈奕霖",
            type: "people",
            url: "https://api.zhihu.com/people/f990c398850e94812d829ee025ae23c9",
            url_token: "yilin_chen",
            user_type: "people",
            vip_info: null,
          },
          bound_topic_ids: [1213, 213, 123, 432],
          answer_count: 18,
          comment_count: 1,
          created: 1424953125,
          excerpt: "他发明了 QEMU、FFmpeg、Tiny C Compiler，甚至还发现了计算圆周率的高效算法，用个人计算机打破了超级计算机的记录。 这样的人算是什么水平的程序员？",
          follower_count: 1075,
          id: 28388113,
          is_following: false,
          title: "装修时有哪些东西没装，事后会后悔？",
          type: "question",
          url: "https://api.zhihu.com/questions/28388113",
        },
        comment_count: 41,
        comment_permission: "all",
        content: "<p>确实是奇才， 单是 FFmpeg 和 Qemu 这两项就足以超越绝大部分程序员了。看到他的成就我的第一反应就是这哥们儿能和 Linus Torvalds 拼一下（不一定干得过，企鹅王体型比他大）。Fabrice Bellard 的计算机底层功力极其深厚，对各种细节了如指掌，虚拟机可不是想写就能写的，这需要熟悉CPU、内存、BIOS、磁盘的内部原理，鼠标、键盘、终端等外围设备的工作流程，然后在软件层面模拟出来，想想就复杂。从这一点上他可以被称作天才程序员。另外，他的数学功底也是相当扎实，能发现计算圆周率的新算法并且改进算法的人又可以称作计算机科学家。他一个人几乎涵盖了计算机领域的两大发展路线，属于那种全才型的人物。我等只能仰视，无可企及。</p><p>下面，让我们来按照时间顺序看一看大神的人生轨迹：</p><ul><li>1972年，天才降生</li><li>上大学之前重写了LZSS压缩算法，解压软件速度快体积小</li><li>1997年1月20日，他发布了最快速的计算圆周率的算法，此算法是 Bailey-Borwein-Plouffe 公式的变体，前者的时间复杂度是O(n^3)，他给优化成了O(n^2)，使得计算速度提高了43%，这是他在数学领域的成就。此时他仅有25岁，我特么现在还在玩泥巴。</li><li>2000年他化名Gérard Lantau，创建了FFmpeg项目，做过多媒体音视频处理的应该都知道这个项目到底有多强大。现在暴风影音、QQ影音、格式工厂，还有YouTube、VLC等都使用了FFmpeg的编解码函数库，不过前三者因为不遵守开源协议已经被FFmpeg挂在官网昭告天下了(官网的页面不知为何下线了，我找了份存档",
        created_time: 1489149871,
        excerpt: "设计师猫姐： 后悔没装智能锁的，事后还可以换； 后悔没装洗碗机的，还可以买个小的壁挂用用； 然而有很多东西是你后悔不来的，<b>装修考虑不到位，事后无备胎补位。</b> <b>家装时一定要长远考虑的地方——</b> <b>硬装篇</b> <b>一、硬装造型</b> 电视…",
        excerpt_new: "确实是奇才， 单是 FFmpeg 和 Qemu 这两项就足以超越绝大部分程序员了。看到他的成就我的第一反应就是这哥们儿能和 Linus Torvalds 拼一下（不一定干得过，企鹅王体型比他大）。Fabrice Bellard 的计算机底层功力极其深厚，对各种细节了如指掌，虚拟机可不是想…",
        id: 150897437,
        image_url: "https://pic3.zhimg.com/80/v2-7a191613c5f87534b57f263f493d016a_hd.jpg",
        is_copyable: true,
        mark_infos: [],
        preview_text: "",
        preview_type: "default",
        reshipment_settings: "allowed",
        thanks_count: 69,
        thumbnail: "https://pic3.zhimg.com/80/v2-7a191613c5f87534b57f263f493d016a_hd.jpg",
        type: "answer",
        updated_time: 1489545361,
        url: "https://api.zhihu.com/answers/150897437",
        voteup_count: 771,
      }, {
        author: {
          avatar_url: "https://pic3.zhimg.com/50/v2-4dd31c1c22405df8456115845ee0c745_s.jpg",
          badge: [],
          gender: 1,
          headline: "喜欢社会心理学的 Linux Kernel Developer",
          id: "cff5cb05009df8e33dc3adfa5a203e7d",
          is_followed: false,
          is_following: false,
          is_org: false,
          name: "Hao Lee",
          type: "people",
          url: "https://api.zhihu.com/people/cff5cb05009df8e33dc3adfa5a203e7d",
          url_token: "kerneldeveloper",
          user_type: "people",
          vip_info: null,
        },
        relationship: {
          is_nothelp: false,
          is_thanked: false,
          upvoted_followee_ids: [],
          voting: 0,
        },
        question: {
          author: {
            avatar_url: "https://pic1.zhimg.com/50/6fee3a9af123d41bbae926a65795e0bf_s.jpg",
            badge: [],
            gender: 1,
            headline: "一只野生的阿虚",
            id: "f990c398850e94812d829ee025ae23c9",
            is_followed: false,
            is_following: false,
            is_org: false,
            name: "陈奕霖",
            type: "people",
            url: "https://api.zhihu.com/people/f990c398850e94812d829ee025ae23c9",
            url_token: "yilin_chen",
            user_type: "people",
            vip_info: null,
          },
          bound_topic_ids: [1213, 213, 123, 432],
          answer_count: 18,
          comment_count: 1,
          created: 1424953125,
          excerpt: "他发明了 QEMU、FFmpeg、Tiny C Compiler，甚至还发现了计算圆周率的高效算法，用个人计算机打破了超级计算机的记录。 这样的人算是什么水平的程序员？",
          follower_count: 1075,
          id: 28388113,
          is_following: false,
          title: "母亲有什么操作让你觉得很奇怪但又很可爱呢？",
          type: "question",
          url: "https://api.zhihu.com/questions/28388113",
        },
        comment_count: 41,
        comment_permission: "all",
        content: "<p>确实是奇才， 单是 FFmpeg 和 Qemu 这两项就足以超越绝大部分程序员了。看到他的成就我的第一反应就是这哥们儿能和 Linus Torvalds 拼一下（不一定干得过，企鹅王体型比他大）。Fabrice Bellard 的计算机底层功力极其深厚，对各种细节了如指掌，虚拟机可不是想写就能写的，这需要熟悉CPU、内存、BIOS、磁盘的内部原理，鼠标、键盘、终端等外围设备的工作流程，然后在软件层面模拟出来，想想就复杂。从这一点上他可以被称作天才程序员。另外，他的数学功底也是相当扎实，能发现计算圆周率的新算法并且改进算法的人又可以称作计算机科学家。他一个人几乎涵盖了计算机领域的两大发展路线，属于那种全才型的人物。我等只能仰视，无可企及。</p><p>下面，让我们来按照时间顺序看一看大神的人生轨迹：</p><ul><li>1972年，天才降生</li><li>上大学之前重写了LZSS压缩算法，解压软件速度快体积小</li><li>1997年1月20日，他发布了最快速的计算圆周率的算法，此算法是 Bailey-Borwein-Plouffe 公式的变体，前者的时间复杂度是O(n^3)，他给优化成了O(n^2)，使得计算速度提高了43%，这是他在数学领域的成就。此时他仅有25岁，我特么现在还在玩泥巴。</li><li>2000年他化名Gérard Lantau，创建了FFmpeg项目，做过多媒体音视频处理的应该都知道这个项目到底有多强大。现在暴风影音、QQ影音、格式工厂，还有YouTube、VLC等都使用了FFmpeg的编解码函数库，不过前三者因为不遵守开源协议已经被FFmpeg挂在官网昭告天下了(官网的页面不知为何下线了，我找了份存档",
        created_time: 1489149871,
        excerpt: "允宝贝的猫山大王： 我叔叔和婶婶。 堂妹跟婶婶说：“妈，你下次炖肉的时候多放点粉条，我喜欢吃粉条。” 下次炖肉，几乎没有肉全是粉条，叔叔翻了一会儿没找到肉…",
        excerpt_new: "确实是奇才， 单是 FFmpeg 和 Qemu 这两项就足以超越绝大部分程序员了。看到他的成就我的第一反应就是这哥们儿能和 Linus Torvalds 拼一下（不一定干得过，企鹅王体型比他大）。Fabrice Bellard 的计算机底层功力极其深厚，对各种细节了如指掌，虚拟机可不是想…",
        id: 150897436,
        is_copyable: true,
        mark_infos: [],
        preview_text: "",
        preview_type: "default",
        reshipment_settings: "allowed",
        thanks_count: 69,
        thumbnail: "",
        type: "answer",
        updated_time: 1489545361,
        url: "https://api.zhihu.com/answers/150897437",
        voteup_count: 771,
      }],
    };
  },
  methods: {
    fetchDate() {
      this.loading = true;
      if (this.$route.name === 'home') {
        this.fakeInfo = this.normalList;
        this.loading = false;
      } else if (this.$route.name === 'hot') {
        this.getHotList();
        this.fakeInfo = this.hotList;
        this.loading = false;
      } else {
        this.fakeInfo = this.normalList;
        this.loading = false;
      }
    },
    getHotListParams() {
      const response = async () => {
        const r = await request.get('/hot-list-web', {
          limit: 50,
          desktop: true,
        });
        return r;
      };
      return new Promise((reslove) => {
        reslove(response());
      });
    },
    getHotList() {
      this.getHotListParams().then((res) => {
        if (res.status === 200) {
          this.fakeInfo = res.data.data;
        }
      });
    },
  },
};
</script>
