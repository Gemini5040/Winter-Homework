<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to Online Judge</h1>
        <p class="subtitle">Practice coding, compete with others, and improve your skills</p>
        <div class="cta-buttons">
          <router-link to="/problems" class="btn-primary">Start Practicing</router-link>
          <router-link to="/contests" class="btn-secondary">View Contests</router-link>
        </div>
      </div>
    </section>

    <section class="latest-news">
      <h2>Latest News</h2>
      <div class="news-list">
        <div class="news-item" v-for="(news, index) in latestNews" :key="index">
          <h3>{{ news.title }}</h3>
          <p>{{ news.description }}</p>
          <span class="news-date">{{ formatDate(news.date) }}</span>
        </div>
      </div>
    </section>

    <section class="upcoming-contests">
      <h2>Upcoming Contests</h2>
      <div class="contest-list">
        <div class="contest-item" v-for="(contest, index) in upcomingContests" :key="index">
          <div class="contest-info">
            <h3>{{ contest.name }}</h3>
            <p>{{ contest.description }}</p>
            <div class="contest-meta">
              <span>Starts: {{ formatDateTime(contest.startTime) }}</span>
              <span>Duration: {{ contest.duration }} hours</span>
            </div>
          </div>
          <div class="contest-actions">
            <button class="btn-primary" @click="registerForContest(contest.id)">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const latestNews = ref([
      {
        title: 'New Problems Added',
        description: 'We\'ve added 50 new problems across various difficulty levels',
        date: new Date()
      },
      {
        title: 'Winter Coding Challenge',
        description: 'Join our annual winter coding challenge starting next week',
        date: new Date(Date.now() - 86400000) // 1 day ago
      }
    ]);

    const upcomingContests = ref([
      {
        id: 1,
        name: 'Weekly Coding Challenge',
        description: 'Test your skills in this weekly coding competition',
        startTime: new Date(Date.now() + 86400000 * 2), // 2 days from now
        duration: 3
      },
      {
        id: 2,
        name: 'Algorithm Masters',
        description: 'Advanced algorithms competition for experienced coders',
        startTime: new Date(Date.now() + 86400000 * 5), // 5 days from now
        duration: 5
      }
    ]);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatDateTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const registerForContest = (contestId: number) => {
      // TODO: Implement contest registration
      console.log('Registering for contest:', contestId);
    };

    return {
      latestNews,
      upcomingContests,
      formatDate,
      formatDateTime,
      registerForContest
    };
  }
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  background-color: #2563eb;
  color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background-color: white;
  color: #2563eb;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #f0f4f8;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.latest-news, .upcoming-contests {
  margin-bottom: 3rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.news-list, .contest-list {
  display: grid;
  gap: 1.5rem;
}

.news-item, .contest-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.news-date {
  display: block;
  margin-top: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.contest-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.contest-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.contest-actions {
  margin-top: 1rem;
  text-align: right;
}
</style>
