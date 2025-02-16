<template>
  <div class="competition-details">
    <h2>{{ competition.name }}</h2>
    <p>{{ competition.description }}</p>
    <p>开始时间：{{ competition.startTime }}</p>
    <p>结束时间：{{ competition.endTime }}</p>
    <p>竞赛规则：{{ competition.rules }}</p>
    <div v-if="isSubscribed">
      <button @click="viewLeaderboard">查看排行榜</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'CompetitionDetails',
  setup() {
    const competition = ref({
      id: 1,
      name: '华农天梯赛',
      description: '华南农业大学天梯赛',
      startTime: '2025-02-20',
      endTime: '2025-02-25',
      rules: '根据题目得分',
    });

    const isSubscribed = ref(true); // 假设用户已经订阅了此竞赛

    const viewLeaderboard = () => {
      // 跳转到排行榜页面
      console.log('跳转到排行榜');
    };

    return { competition, isSubscribed, viewLeaderboard };
  },
};
</script>

<style scoped>
.competition-details {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 16px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2575fc;
}
</style>
