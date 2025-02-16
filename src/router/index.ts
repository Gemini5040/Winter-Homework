import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RankingPage from '@/views/RankingPage.vue';
import ProblemSet from '@/views/ProblemSet.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import CompetitionsList from '@/views/CompetitionsList.vue'; // 竞赛列表页面
import CompetitionDetails from '@/views/CompetitionDetails.vue'; // 竞赛详情页面
import CompetitionCalendar from '@/views/CompetitionCalendar.vue'; // 竞赛日历
import CompetitionLeaderboard from '@/views/CompetitionLeaderboard.vue'; // 竞赛排行榜页面

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingPage,
  },
  {
    path: '/problem-set',
    name: 'ProblemSet',
    component: ProblemSet,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/competitions',
    name: 'CompetitionsList',
    component: CompetitionsList, // 竞赛列表页面
  },
  {
    path: '/competitions/:id',
    name: 'CompetitionDetails',
    component: CompetitionDetails, // 竞赛详情页面
  },
  {
    path: '/calendar',
    name: 'CompetitionCalendar',
    component: CompetitionCalendar, // 竞赛日历
  },
  {
    path: '/leaderboard',
    name: 'CompetitionLeaderboard',
    component: CompetitionLeaderboard, // 竞赛排行榜页面
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
