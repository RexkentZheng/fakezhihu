<template>
  <div class="question-details">
    <div class="question-header">
      <div class="question-header-content">
        <div class="question-header-main">
          <div class="question-header-topic">
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
            <el-tag>标签一</el-tag>
          </div>
          <h1 class="question-header-title">为什么有的公司留不住 90 后新员工？</h1>
          <div class="question-header-details">
            <span>最近公司录用了一批90后的新员工，基本上全都离职了，最短的半天，最长的也就工作了1周，迫切的想知道90后员工的求职观，什么样的工作是90后想要的？什么样的老板是90后愿意合作的？</span>
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
              <el-button type="primary" plain icon="el-icon-edit">写回答</el-button>
            </div>
            <div class="question-header-actions">
              <el-button class="button" type="info" plain>
                <span class="el el-icon-fakezhihu-add-person-fill"></span>
                关注问题
              </el-button>
              <list-item-actions
                class="actions"
                :comment_count= "123"
                :showActionItems="['comment', 'share', 'thanks', 'more']"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="question-main">
      <div class="question-main-clo">
        <el-card>
          <div class="list">
            <div class="list-header">
              <span>833个回答</span>
            </div>
            <div class="list-item">
              <div class="author-info clearfix">
                <img src="https://pic3.zhimg.com/01e91b538864954c8d4ef7ad527f58d9_l.jpg" alt="">
                <div class="detail">
                  <p class="username">我不知道</p>
                  <p class="introduce">社会草履虫</p>
                </div>
              </div>
              <div class="extra-info">
                <span>8,912 人赞同了该回答</span>
              </div>
              <div class="content">
                <p>
                  2018年3月,张小平向西安航天动力研究所提出辞职申请。出于爱惜人才考虑，西安航天动力研究所与张小平进行了多次沟通和挽留，但其离职意向坚决，并在单位未批准的情况下自行离所。由于张小平为国家重要涉密人员，根据保密法和单位相关规定，离职前必须在所内非密岗位进行脱密，脱密期为2年。为此，2018年4月，西安航天动力研究所与张小平进行谈话，向其解读离职流程及脱密期管理规定，告知其须遵守国家保密规定，回单位履行脱密义务。但张小平仍然自行离所，对保守国家秘密和单位技术秘密带来了较大隐患。三、《张小平参与我所型号研制情况》材料相关说明
                </p>
              </div>
              <div class="extra-info">
                <span>编辑于 2018-09-27</span>
              </div>
              <list-item-actions
                class="actions"
                :comment_count= "12"
                :thanks_count= "13"
                :voteup_count= "33"
                :showActionItems="['vote', 'comment', 'share', 'favorite', 'thanks', 'more']"
              />
            </div>
            <div class="list-item">
              <div class="author-info clearfix">
                <img src="https://pic3.zhimg.com/01e91b538864954c8d4ef7ad527f58d9_l.jpg" alt="">
                <div class="detail">
                  <p class="username">我不知道</p>
                  <p class="introduce">社会草履虫</p>
                </div>
              </div>
              <div class="extra-info">
                <span>8,912 人赞同了该回答</span>
              </div>
              <div class="content">
                <p>
                  2018年3月,张小平向西安航天动力研究所提出辞职申请。出于爱惜人才考虑，西安航天动力研究所与张小平进行了多次沟通和挽留，但其离职意向坚决，并在单位未批准的情况下自行离所。由于张小平为国家重要涉密人员，根据保密法和单位相关规定，离职前必须在所内非密岗位进行脱密，脱密期为2年。为此，2018年4月，西安航天动力研究所与张小平进行谈话，向其解读离职流程及脱密期管理规定，告知其须遵守国家保密规定，回单位履行脱密义务。但张小平仍然自行离所，对保守国家秘密和单位技术秘密带来了较大隐患。三、《张小平参与我所型号研制情况》材料相关说明
                </p>
              </div>
              <div class="extra-info">
                <span>编辑于 2018-09-27</span>
              </div>
              <list-item-actions
                class="actions"
                :comment_count= "12"
                :thanks_count= "13"
                :voteup_count= "33"
                :showActionItems="['vote', 'comment', 'share', 'favorite', 'thanks', 'more']"
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
import ListItemActions from '@/components/ListItemActions';
import SidebarFooter from '@/components/SidebarFooter.vue';

export default {
  components: {
    ListItemActions,
    SidebarFooter
  },
  data() {
    return{
      
    };
  },
};
</script>
