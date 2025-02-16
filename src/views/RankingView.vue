<template>
  <div class="ranking-view">
    <h1>User Rankings</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label>Category:</label>
        <select v-model="selectedCategory">
          <option value="overall">Overall</option>
          <option value="contest">Contest</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div class="filter-group" v-if="selectedCategory === 'contest'">
        <label>Contest:</label>
        <select v-model="selectedContest">
          <option 
            v-for="contest in contests"
            :key="contest.id"
            :value="contest.id"
          >
            {{ contest.title }}
          </option>
        </select>
      </div>

      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search users..."
        />
      </div>
    </div>

    <div class="ranking-content">
      <div class="ranking-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Solved</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(user, index) in filteredRankings"
              :key="user.id"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <router-link :to="`/profile/${user.id}`">
                  {{ user.name }}
                </router-link>
              </td>
              <td>{{ user.score }}</td>
              <td>{{ user.solved }}</td>
              <td>{{ user.rating }}</td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button 
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <div class="ranking-charts">
        <div class="chart-container">
          <h3>Rating Distribution</h3>
          <canvas ref="ratingChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import Chart from 'chart.js/auto';

interface UserRanking {
  id: number;
  name: string;
  score: number;
  solved: number;
  rating: number;
}

interface Contest {
  id: number;
  title: string;
}

export default defineComponent({
  setup() {
    const rankings = ref<UserRanking[]>([
      // Mock data
      { id: 1, name: 'Alice', score: 1500, solved: 120, rating: 2100 },
      { id: 2, name: 'Bob', score: 1400, solved: 110, rating: 2000 },
      { id: 3, name: 'Charlie', score: 1300, solved: 100, rating: 1900 },
    ]);

    const contests = ref<Contest[]>([
      { id: 1, title: 'Weekly Contest 123' },
      { id: 2, title: 'Biweekly Contest 45' }
    ]);

    const selectedCategory = ref('overall');
    const selectedContest = ref(1);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 20;

    const filteredRankings = computed(() => {
      return rankings.value
        .filter(user => 
          user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        .slice(
          (currentPage.value - 1) * itemsPerPage,
          currentPage.value * itemsPerPage
        );
    });

    const totalPages = computed(() => 
      Math.ceil(rankings.value.length / itemsPerPage)
    );

    let ratingChart: Chart | null = null;

    onMounted(() => {
      const ctx = (document.querySelector('.ranking-charts canvas') as HTMLCanvasElement)
        .getContext('2d');
      
      if (ctx) {
        ratingChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['0-999', '1000-1499', '1500-1999', '2000+'],
            datasets: [{
              label: 'Users',
              data: [10, 20, 15, 5],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });

    return {
      rankings,
      contests,
      selectedCategory,
      selectedContest,
      searchQuery,
      currentPage,
      filteredRankings,
      totalPages
    };
  }
});
</script>

<style scoped>
.ranking-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.ranking-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 5px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin-top: 0;
}
</style>
