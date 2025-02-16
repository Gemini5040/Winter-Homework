<template>
  <div class="problem-set">
    <h1>题库</h1>
    
    <!-- 筛选条件 -->
    <div class="filters">
      <label for="difficulty">难度：</label>
      <select v-model="selectedDifficulty">
        <option value="">选择难度</option>
        <option value="easy">简单</option>
        <option value="medium">中等</option>
        <option value="hard">困难</option>
      </select>

      <label for="tag">标签：</label>
      <select v-model="selectedTag">
        <option value="">选择标签</option>
        <option value="dp">动态规划</option>
        <option value="greedy">贪心算法</option>
        <option value="graph">图论</option>
        <option value="binary-search">二分查找</option>
      </select>
    </div>

    <!-- 题库列表 -->
    <div class="problem-list">
      <ul>
        <li v-for="problem in filteredProblems" :key="problem.id" class="problem-item">
          <div class="problem-info">
            <span class="problem-name">{{ problem.name }}</span>
            <span class="problem-difficulty">难度: {{ problem.difficulty }}</span>
            <span class="problem-tests">
              测试: {{ problem.testPassed }} / {{ problem.totalTests }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <span>页码：{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

export default {
  name: 'ProblemSet',
  setup() {
    // 假设这是从服务器获取的题目数据
    const problems = ref([
      { id: 1, name: '两数之和', difficulty: 'easy', testPassed: 5, totalTests: 10, tags: ['dp', 'greedy'] },
      { id: 2, name: '最小路径和', difficulty: 'medium', testPassed: 7, totalTests: 10, tags: ['dp'] },
      { id: 3, name: '二分查找', difficulty: 'hard', testPassed: 9, totalTests: 10, tags: ['binary-search'] },
      { id: 4, name: '最大子序和', difficulty: 'easy', testPassed: 10, totalTests: 10, tags: ['dp'] },
      { id: 5, name: '图的遍历', difficulty: 'medium', testPassed: 8, totalTests: 10, tags: ['graph'] },
      { id: 6, name: '最小生成树', difficulty: 'hard', testPassed: 6, totalTests: 10, tags: ['graph'] },
      // 更多题目...
    ]);
    
    // 筛选条件
    const selectedDifficulty = ref('');
    const selectedTag = ref('');
    
    // 当前页数和每页显示数量
    const currentPage = ref(1);
    const pageSize = 5;

    // 过滤题目
    const filteredProblems = computed(() => {
      return problems.value
        .filter((problem) => {
          return (
            (selectedDifficulty.value ? problem.difficulty === selectedDifficulty.value : true) &&
            (selectedTag.value ? problem.tags.includes(selectedTag.value) : true)
          );
        })
        .slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize);
    });

    // 计算总页数
    const totalPages = computed(() => {
      return Math.ceil(problems.value.length / pageSize);
    });

    // 上一页
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // 下一页
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    return {
      selectedDifficulty,
      selectedTag,
      filteredProblems,
      currentPage,
      totalPages,
      previousPage,
      nextPage,
    };
  },
};
</script>

<style scoped>
.problem-set {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.filters label {
  margin-right: 10px;
}

.problem-list {
  margin-bottom: 20px;
}

.problem-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.problem-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.problem-name {
  font-weight: bold;
  font-size: 16px;
}

.problem-difficulty {
  font-size: 14px;
  color: #666;
}

.problem-tests {
  font-size: 14px;
  color: #333;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #2575fc;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  padding: 5px 10px;
}
</style>
