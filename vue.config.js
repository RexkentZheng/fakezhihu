// module.exports = {
//   configureWebpack: (config) => {
//     if (process.env.NODE_ENV === 'production') {
//       console.log(config);
//       // 为生产环境修改配置...
//     } else {
//       console.log('当前为开发环境');
//       // 为开发环境修改配置...
//     }
//   },
//   devServer: {
//     'hot-list-web': 'https://www.zhihu.com/api/v3/feed/topstory/',
//   },
// };
module.exports = {
  devServer: {
    proxy: {
      '/users': {
        target: 'http://127.0.0.1:8081',
      },
      '/articles': {
        target: 'http://127.0.0.1:8081',
      },
      '/imgs': {
        target: 'http://127.0.0.1:8081',
      },
      '/hot-list-web': {
        target: 'https://www.zhihu.com/api/v3/feed/topstory/',
      },
      '/peopleInfo/answers': {
        target: 'https://www.zhihu.com/api/v4/members/zhao-xiao-kang/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Cis_labeled%2Clabel_info%2Crelationship.is_authorized%2Cvoting%2Cis_author%2Cis_thanked%2Cis_nothelp%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20&sort_by=created',
      },
      '/answer/comment': {
        target: 'https://www.zhihu.com/api/v4/answers/573981359/root_comments?include=data%5B*%5D.author%2Ccollapsed%2Creply_to_author%2Cdisliked%2Ccontent%2Cvoting%2Cvote_count%2Cis_parent_author%2Cis_author&order=normal&limit=20&offset=0&status=open',
      },
      '/peopleInfo/articles': {
        target: 'https://www.zhihu.com/api/v4/members/zhao-xiao-kang/articles?include=data%5B*%5D.comment_count%2Csuggest_edit%2Cis_normal%2Cthumbnail_extra_info%2Cthumbnail%2Ccan_comment%2Ccomment_permission%2Cadmin_closed_comment%2Ccontent%2Cvoteup_count%2Ccreated%2Cupdated%2Cupvoted_followees%2Cvoting%2Creview_info%2Cis_labeled%2Clabel_info%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20&sort_by=created',
      },
    },
  },
};
