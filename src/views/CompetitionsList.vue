<template>
  <div class="competitions-list">
    <h2>竞赛列表</h2>
    <div v-for="competition in competitions" :key="competition.id" class="competition-item">
      <div class="competition-details">
        <h3>{{ competition.name }}</h3>
        <p>{{ competition.description }}</p>
        <p>开始时间：{{ competition.startTime }}</p>
        <p>结束时间：{{ competition.endTime }}</p>
        <button @click="subscribe(competition.id)" v-if="!competition.subscribed">订阅</button>
        <button @click="unsubscribe(competition.id)" v-if="competition.subscribed">取消订阅</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'CompetitionsList',
  setup() {
    const competitions = ref([
      { id: 1, name: '华农天梯赛', description: '华南农业大学天梯赛', startTime: '2025-02-20', endTime: '2025-02-25', subscribed: false },
      { id: 2, name: '自科部ACM内战赛', description: '自科部的ACM内战赛', startTime: '2025-02-22', endTime: '2025-02-28', subscribed: false },
    ]);

    const subscribe = (id: number) => {
      const competition = competitions.value.find(item => item.id === id);
      if (competition) {
        competition.subscribed = true;
      }
    };

    const unsubscribe = (id: number) => {
      const competition = competitions.value.find(item => item.id === id);
      if (competition) {
        competition.subscribed = false;
      }
    };

    return { competitions, subscribe, unsubscribe };
  },
};
</script>

<style scoped>
.competitions-list {
  padding: 20px;
}

.competition-item {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 5px;
}

.competition-details h3 {
  margin-top: 0;
}

button {
  padding: 8px 16px;
  margin-top: 10px;
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
