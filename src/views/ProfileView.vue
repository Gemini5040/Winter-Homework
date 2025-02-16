<template>
  <div class="profile-view">
    <div class="profile-header">
      <div class="avatar-container">
        <img 
          :src="user.avatar" 
          alt="User avatar"
          class="avatar"
        />
        <button 
          v-if="isCurrentUser"
          class="edit-avatar"
          @click="editAvatar"
        >
          Edit
        </button>
      </div>
      
      <div class="profile-info">
        <h1>{{ user.name }}</h1>
        <p class="bio">{{ user.bio }}</p>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-value">{{ user.rating }}</span>
            <span class="stat-label">Rating</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ user.solved }}</span>
            <span class="stat-label">Solved</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ user.contests }}</span>
            <span class="stat-label">Contests</span>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <div class="main-content">
        <section class="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li 
              v-for="activity in recentActivities"
              :key="activity.id"
              class="activity-item"
            >
              <span class="activity-type">{{ activity.type }}</span>
              <span class="activity-details">{{ activity.details }}</span>
              <span class="activity-time">{{ activity.time }}</span>
            </li>
          </ul>
        </section>

        <section class="contest-history">
          <h2>Contest History</h2>
          <table>
            <thead>
              <tr>
                <th>Contest</th>
                <th>Rank</th>
                <th>Solved</th>
                <th>Rating Change</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="contest in contestHistory"
                :key="contest.id"
              >
                <td>{{ contest.name }}</td>
                <td>{{ contest.rank }}</td>
                <td>{{ contest.solved }}</td>
                <td 
                  :class="{
                    positive: contest.ratingChange > 0,
                    negative: contest.ratingChange < 0
                  }"
                >
                  {{ contest.ratingChange > 0 ? '+' : '' }}{{ contest.ratingChange }}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <div class="sidebar">
        <section class="social-connections">
          <h2>Connections</h2>
          <div class="connection-stats">
            <div class="connection-stat">
              <span class="stat-value">{{ user.followers }}</span>
              <span class="stat-label">Followers</span>
            </div>
            <div class="connection-stat">
              <span class="stat-value">{{ user.following }}</span>
              <span class="stat-label">Following</span>
            </div>
          </div>
          
          <div class="connection-actions">
            <button 
              v-if="!isCurrentUser"
              class="follow-button"
              @click="toggleFollow"
            >
              {{ isFollowing ? 'Unfollow' : 'Follow' }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

interface User {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  solved: number;
  contests: number;
  followers: number;
  following: number;
}

interface Activity {
  id: number;
  type: string;
  details: string;
  time: string;
}

interface ContestHistory {
  id: number;
  name: string;
  rank: number;
  solved: number;
  ratingChange: number;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const userId = computed(() => parseInt(route.params.id as string));
    
    const user = ref<User>({
      id: 1,
      name: 'Alice',
      avatar: '/images/avatars/default.png',
      bio: 'Competitive programmer and problem solver',
      rating: 2100,
      solved: 120,
      contests: 15,
      followers: 150,
      following: 80
    });

    const recentActivities = ref<Activity[]>([
      {
        id: 1,
        type: 'Solved',
        details: 'Problem 123: Two Sum',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'Joined',
        details: 'Weekly Contest 123',
        time: '1 day ago'
      }
    ]);

    const contestHistory = ref<ContestHistory[]>([
      {
        id: 1,
        name: 'Weekly Contest 123',
        rank: 15,
        solved: 4,
        ratingChange: +25
      },
      {
        id: 2,
        name: 'Biweekly Contest 45',
        rank: 30,
        solved: 3,
        ratingChange: -10
      }
    ]);

    const isFollowing = ref(false);
    const isCurrentUser = computed(() => userId.value === 1); // Replace with actual current user ID

    const toggleFollow = () => {
      isFollowing.value = !isFollowing.value;
      user.value.followers += isFollowing.value ? 1 : -1;
    };

    const editAvatar = () => {
      // Implement avatar editing
    };

    return {
      user,
      recentActivities,
      contestHistory,
      isFollowing,
      isCurrentUser,
      toggleFollow,
      editAvatar
    };
  }
});
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.profile-info {
  flex: 1;
}

.bio {
  color: #666;
  margin: 10px 0;
}

.stats {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.profile-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.recent-activity {
  margin-bottom: 30px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.activity-type {
  font-weight: bold;
  width: 120px;
}

.activity-details {
  flex: 1;
  margin: 0 20px;
}

.activity-time {
  color: #666;
}

.contest-history table {
  width: 100%;
  border-collapse: collapse;
}

.contest-history th,
.contest-history td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #F44336;
}

.social-connections {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.connection-stats {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.connection-stat {
  text-align: center;
}

.follow-button {
  width: 100%;
  padding: 10px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.follow-button:hover {
  background: #1976D2;
}
</style>
