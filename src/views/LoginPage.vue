<template>
  <div class="login">
    <h1>登录</h1>

    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">用户名</label>
        <input v-model="username" type="text" id="username" placeholder="请输入用户名" required />
      </div>

      <div class="input-group">
        <label for="password">密码</label>
        <input v-model="password" type="password" id="password" placeholder="请输入密码" required />
      </div>

      <button type="submit" class="btn">登录</button>
    </form>

    <div class="register-link">
      <p>没有账号？<router-link to="/register">注册</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

export default {
  name: 'LoginPage',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter(); // 使用 useRouter 获取路由实例

    const login = () => {
      if (username.value === 'Caibo' && password.value === '666') {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/'); // 登录成功后跳转到首页
      } else {
        alert('用户名或密码错误');
      }
    };

    return { username, password, login };
  },
};
</script>

<style scoped>
.login {
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

.register-link {
  margin-top: 20px;
}
</style>
