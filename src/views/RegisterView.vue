<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Create Account</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirm-password"
            required
          />
        </div>
        <button type="submit" class="btn-primary">Register</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const form = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const handleRegister = async () => {
      // TODO: Implement registration logic
      router.push('/');
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
}

.login-link a {
  color: #2563eb;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
