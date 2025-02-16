<template>
  <div class="register">
    <h1>注册</h1>

    <form @submit.prevent="register">
      <div class="input-group">
        <label for="username">用户名</label>
        <input v-model="username" type="text" id="username" placeholder="请输入用户名" required />
      </div>

      <div class="input-group">
        <label for="password">密码</label>
        <input v-model="password" type="password" id="password" placeholder="请输入密码" required />
      </div>

      <button type="submit" class="btn">注册</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

export default {
  name: 'RegisterPage',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter(); // 使用 useRouter 获取路由实例

    const register = () => {
      // 注册逻辑，通常会发请求保存数据
      console.log(`注册用户名: ${username.value}, 密码: ${password.value}`);
      alert('注册成功');
      router.push('/login'); // 注册成功后跳转到登录页
    };

    return { username, password, register };
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #2575fc;
}
</style>
