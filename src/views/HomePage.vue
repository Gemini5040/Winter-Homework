<template>
  <div class="home">
    <h1>欢迎来到自科部专享在线评测系统</h1>

    <div v-if="isLoggedIn">
      <h2>最新动态</h2>
      <div class="latest-competitions">
        <div class="competition">
          <p><strong>华农天梯赛 No.1</strong> 正在进行中</p>
          <p>日期时间：2025-02-16 10:00</p>
        </div>
        <div class="competition">
          <p><strong>自科部 ACM 内战赛</strong> 未开始</p>
          <p>日期时间：2025-02-20 09:00</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p>请先 <router-link to="/login">登录</router-link> 以查看最新动态。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

export default {
  name: 'HomePage',
  setup() {
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
    const router = useRouter(); // 使用 useRouter 获取路由实例

    // 检查登录状态
    onMounted(() => {
      if (!isLoggedIn.value) {
        router.push('/login'); // 未登录，跳转到登录页
      }
    });

    return { isLoggedIn };
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.latest-competitions {
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.competition {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.competition strong {
  color: #6a11cb;
}

a {
  color: #6a11cb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
