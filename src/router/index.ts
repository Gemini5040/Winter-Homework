import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/problems",
    name: "problems",
    component: () => import("../views/ProblemListView.vue"),
  },
  {
    path: "/problems/:id",
    name: "problem-detail",
    component: () => import("../views/ProblemDetailView.vue"),
  },
  {
    path: "/contests",
    name: "contests",
    component: () => import("../views/ContestListView.vue"),
  },
  {
    path: "/contests/:id",
    name: "contest-detail",
    component: () => import("../views/ContestDetailView.vue"),
  },
  {
    path: "/rankings",
    name: "rankings",
    component: () => import("../views/RankingView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("../views/CodeEditorView.vue"),
  },
  {
    path: "/teams",
    name: "teams",
    component: () => import("../views/TeamView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
