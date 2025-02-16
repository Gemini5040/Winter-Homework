<template>
  <div class="navbar">
    <div class="left-links">
      <router-link to="/">首页</router-link>
      <router-link to="/problem-set">题库</router-link>
      <router-link to="/competitions">竞赛</router-link>
      <router-link to="/team">团队</router-link>
      <router-link to="/ranking">排名</router-link>
      <router-link to="/profile">个人中心</router-link>
    </div>
    
    <div class="auth-section">
      <div v-if="!isLoggedIn">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <div v-else>
        <span>欢迎，Caibo</span>
        <button @click="logout">退出</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

export default {
  name: 'NavBar',
  setup() {
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
    const router = useRouter(); // 使用 useRouter 获取路由实例

    const logout = () => {
      localStorage.removeItem('isLoggedIn');
      isLoggedIn.value = false;
      router.push('/login'); // 退出后跳转到登录页
    };

    return { isLoggedIn, logout };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #6a11cb;
  color: white;
}

.left-links {
  display: flex;
  align-items: center;
}

.left-links a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}

.left-links a:hover {
  text-decoration: underline;
}

.auth-section {
  display: flex;
  align-items: center;
}

.auth-section a,
.auth-section button {
  color: white;
  margin-left: 10px;
  text-decoration: none;
}

button {
  padding: 5px 10px;
  background-color: #2575fc;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #6a11cb;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  .left-links {
    margin-bottom: 10px;
  }

  .auth-section {
    margin-top: 10px;
  }
}
</style>
