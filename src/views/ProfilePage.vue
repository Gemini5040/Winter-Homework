<template>
  <div class="profile">
    <h1>个人中心</h1>

    <div class="profile-info">
      <div class="user-info">
        <h2>个人信息</h2>
        <div class="info-item">
          <label for="username">用户名：</label>
          <span>{{ username }}</span>
        </div>
        <div class="info-item">
          <label for="email">邮箱：</label>
          <span>{{ email }}</span>
        </div>
        <div class="info-item">
          <label for="joinDate">加入时间：</label>
          <span>{{ joinDate }}</span>
        </div>
      </div>

      <div class="stats">
        <h2>个人统计</h2>
        <div class="stat-item">
          <span class="stat-title">积分：</span>
          <span class="stat-value">{{ points }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-title">已通过题目：</span>
          <span class="stat-value">{{ solvedProblems }} 个</span>
        </div>
        <div class="stat-item">
          <span class="stat-title">竞赛参与：</span>
          <span class="stat-value">{{ competitionsParticipated }} 场</span>
        </div>
      </div>
    </div>

    <div class="problem-history">
      <h2>已通过的题目</h2>
      <ul>
        <li v-for="problem in solvedProblemsList" :key="problem.id" class="problem-item">
          <span>{{ problem.name }}</span>
          <span>难度: {{ problem.difficulty }}</span>
        </li>
      </ul>
    </div>

    <div class="competition-history">
      <h2>竞赛记录</h2>
      <ul>
        <li v-for="competition in competitionHistory" :key="competition.id" class="competition-item">
          <span>{{ competition.name }}</span>
          <span>成绩: {{ competition.score }}</span>
          <span>时间: {{ competition.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ProfilePage',
  setup() {
    // 用户个人信息
    const username = ref('Caibo');
    const email = ref('caibo@example.com');
    const joinDate = ref('2023-01-01');

    // 用户统计信息
    const points = ref(1200);
    const solvedProblems = ref(99);
    const competitionsParticipated = ref(5);

    // 已通过的题目
    const solvedProblemsList = ref([
      { id: 1, name: '两数之和', difficulty: 'easy' },
      { id: 2, name: '最小路径和', difficulty: 'medium' },
      { id: 3, name: '最大子序和', difficulty: 'easy' },
      // 更多题目...
    ]);

    // 竞赛记录
    const competitionHistory = ref([
      { id: 1, name: '华农天梯赛', score: 300, date: '2023-09-15' },
      { id: 2, name: '自科部ACM内战赛', score: 500, date: '2023-10-10' },
      { id: 3, name: '全国编程大赛', score: 450, date: '2023-08-20' },
      // 更多记录...
    ]);

    return {
      username,
      email,
      joinDate,
      points,
      solvedProblems,
      competitionsParticipated,
      solvedProblemsList,
      competitionHistory,
    };
  },
};
</script>

<style scoped>
.profile {
  padding: 20px;
}

.profile-info {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.user-info,
.stats {
  flex: 1;
  background-color: #f4f7f6;
  padding: 15px;
  border-radius: 10px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.info-item,
.stat-item {
  margin-bottom: 15px;
}

.info-item label,
.stat-item .stat-title {
  font-weight: bold;
}

.stat-item {
  font-size: 16px;
}

.problem-history,
.competition-history {
  margin-top: 30px;
}

.problem-item,
.competition-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.problem-item span,
.competition-item span {
  font-size: 16px;
}

.problem-item:hover,
.competition-item:hover {
  background-color: #f0f0f0;
}

ul {
  list-style: none;
  padding-left: 0;
}
</style>
