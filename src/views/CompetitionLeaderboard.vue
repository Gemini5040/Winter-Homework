<template>
  <div class="leaderboard">
    <h2>竞赛排行榜</h2>
    <table>
      <thead>
        <tr>
          <th>排名</th>
          <th>用户名</th>
          <th @click="sortByScore">得分 <span v-if="sortDirection === 'asc'">↑</span><span v-if="sortDirection === 'desc'">↓</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in sortedLeaderboard" :key="user.username">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td :style="{ color: getScoreColor(user.score) }">{{ user.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

export default {
  name: 'CompetitionLeaderboard', // 修改组件名称
  setup() {
    const leaderboard = ref([
      { username: 'User1', score: 100 },
      { username: 'User2', score: 90 },
      { username: 'User3', score: 80 },
      { username: 'User4', score: 120 },
      { username: 'User5', score: 110 },
    ]);

    const sortDirection = ref<'asc' | 'desc'>('desc');

    // 排序函数
    const sortByScore = () => {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    };

    // 排序后的排行榜
    const sortedLeaderboard = computed(() => {
      return [...leaderboard.value].sort((a, b) => {
        return sortDirection.value === 'asc' ? a.score - b.score : b.score - a.score;
      });
    });

    // 根据得分设置颜色
    const getScoreColor = (score: number) => {
      if (score >= 100) return 'green';
      if (score >= 90) return 'orange';
      return 'red';
    };

    return { leaderboard, sortedLeaderboard, sortByScore, sortDirection, getScoreColor };
  },
};
</script>

<style scoped>
.leaderboard {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

th {
  background-color: #6a11cb;
  color: white;
  cursor: pointer;
}

th:hover {
  background-color: #2575fc;
}

td {
  background-color: #fff;
}

td:hover {
  background-color: #f1f1f1;
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

</style>
