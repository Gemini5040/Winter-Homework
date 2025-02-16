<template>
  <div class="contest-detail">
    <div class="contest-header">
      <h1>{{ contest.title }}</h1>
      <div class="contest-meta">
        <span class="status" :class="`status-${contest.status}`">
          {{ contest.status }}
        </span>
        <span class="time">
          {{ formatDate(contest.startTime) }} - 
          {{ formatDate(contest.endTime) }}
        </span>
        <span class="duration">
          Duration: {{ contest.duration }} minutes
        </span>
      </div>
    </div>

    <div class="contest-content">
      <div class="problems-section">
        <h2>Problems</h2>
        <div class="problem-list">
          <div 
            v-for="problem in contest.problems"
            :key="problem.id"
            class="problem-item"
          >
            <router-link 
              :to="`/contest/${contest.id}/problem/${problem.id}`"
            >
              {{ problem.title }}
            </router-link>
            <span class="difficulty" :class="`difficulty-${problem.difficulty}`">
              {{ problem.difficulty }}
            </span>
          </div>
        </div>
      </div>

      <div class="leaderboard-section">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Solved</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(entry, index) in leaderboard"
              :key="entry.user.id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ entry.user.name }}</td>
              <td>{{ entry.score }}</td>
              <td>{{ entry.solved }} / {{ contest.problems.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="stats-section">
        <h2>Statistics</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ stats.totalSubmissions }}</div>
            <div class="stat-label">Total Submissions</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ stats.acceptedSubmissions }}</div>
            <div class="stat-label">Accepted</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ stats.participants }}</div>
            <div class="stat-label">Participants</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

interface Contest {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  problems: Problem[];
}

interface Problem {
  id: number;
  title: string;
  difficulty: string;
}

interface LeaderboardEntry {
  user: {
    id: number;
    name: string;
  };
  score: number;
  solved: number;
}

interface ContestStats {
  totalSubmissions: number;
  acceptedSubmissions: number;
  participants: number;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const contestId = route.params.id;

    // Mock data - will be replaced with API calls
    const contest = ref<Contest>({
      id: Number(contestId),
      title: 'Weekly Contest 123',
      description: 'A contest featuring algorithmic problems',
      startTime: '2024-01-15T14:00:00Z',
      endTime: '2024-01-15T15:30:00Z',
      duration: 90,
      status: 'ongoing',
      problems: [
        {
          id: 1,
          title: 'Two Sum',
          difficulty: 'easy'
        },
        {
          id: 2,
          title: 'Add Two Numbers',
          difficulty: 'medium'
        }
      ]
    });

    const leaderboard = ref<LeaderboardEntry[]>([
      {
        user: { id: 1, name: 'Alice' },
        score: 100,
        solved: 2
      },
      {
        user: { id: 2, name: 'Bob' },
        score: 80,
        solved: 1
      }
    ]);

    const stats = ref<ContestStats>({
      totalSubmissions: 150,
      acceptedSubmissions: 50,
      participants: 30
    });

    function formatDate(dateString: string) {
      return new Date(dateString).toLocaleString();
    }

    return {
      contest,
      leaderboard,
      stats,
      formatDate
    };
  }
});
</script>

<style scoped>
.contest-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.contest-header {
  margin-bottom: 30px;
}

.contest-meta {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  color: #666;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.status-upcoming {
  background: #e3f2fd;
  color: #2196f3;
}

.status-ongoing {
  background: #e8f5e9;
  color: #4caf50;
}

.status-ended {
  background: #ffebee;
  color: #f44336;
}

.problems-section,
.leaderboard-section,
.stats-section {
  margin-bottom: 30px;
}

.problem-list {
  display: grid;
  gap: 10px;
}

.problem-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.difficulty {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.difficulty-easy {
  background: #e8f5e9;
  color: #4caf50;
}

.difficulty-medium {
  background: #fff3e0;
  color: #ff9800;
}

.difficulty-hard {
  background: #ffebee;
  color: #f44336;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}
</style>
