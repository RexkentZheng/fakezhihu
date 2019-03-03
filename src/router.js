import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Editor from './views/Editor.vue';
import Main from './views/Main.vue';
import People from './views/People.vue';
import DetailsArticles from './views/DetailsArticle.vue';
import DetailsQuestions from './views/DetailsQuestion.vue';
import ListItemHot from './components/ListItemHot.vue';
import ListItem from './components/ListItem.vue';
import AsksItem from './components/AsksItem.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        component: Main,
        children: [{
          path: '',
          name: 'home',
          component: ListItem,
        }, {
          path: '/hot',
          name: 'hot',
          component: ListItemHot,
        }],
      }, {
        path: '/article/:id',
        name: 'detailsArticles',
        component: DetailsArticles,
      }, {
        path: '/question/:id',
        name: 'detailsQuestions',
        component: DetailsQuestions,
      }, {
        path: '/people/:id',
        component: People,
        children: [{
          path: '',
          name: 'peopleMain',
          component: ListItem,
        }, {
          path: 'asks',
          name: 'peopleAsks',
          component: AsksItem,
        }, {
          path: 'articles',
          name: 'peopleArticles',
          component: ListItem,
        }],
      }],
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/editor/:articleId',
      name: 'editor',
      component: Editor,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
