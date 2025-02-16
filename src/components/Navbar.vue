<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="OJ Logo" class="logo" />
        <span class="brand-name">Online Judge</span>
      </router-link>
    </div>
    
    <div class="navbar-menu">
      <ul class="navbar-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/problems">Problems</router-link></li>
        <li><router-link to="/contests">Contests</router-link></li>
        <li><router-link to="/rankings">Rankings</router-link></li>
      </ul>
      
      <div class="navbar-auth">
        <template v-if="isAuthenticated">
          <div class="user-menu">
            <router-link to="/profile" class="user-link">
              <span class="username">{{ user.username }}</span>
              <img :src="user.avatar" alt="User Avatar" class="avatar" />
            </router-link>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="auth-link">Login</router-link>
          <router-link to="/register" class="auth-link">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const user = computed(() => store.getters.currentUser);

    return {
      isAuthenticated,
      user
    };
  }
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo {
  height: 40px;
  margin-right: 0.5rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2563eb;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin: 0 1rem;
}

.navbar-links a {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
}

.navbar-links a:hover {
  color: #2563eb;
}

.navbar-auth {
  margin-left: 2rem;
}

.auth-link {
  margin-left: 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
}

.auth-link:hover {
  color: #2563eb;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.username {
  margin-right: 0.5rem;
  font-weight: 500;
  color: #4b5563;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
