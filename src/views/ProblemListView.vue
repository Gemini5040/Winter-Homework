<template>
  <div class="problem-list">
    <div class="filters">
      <input v-model="searchQuery" placeholder="Search problems..." />
      
      <select v-model="selectedDifficulty">
        <option value="">All difficulties</option>
        <option v-for="diff in difficulties" :key="diff" :value="diff">
          {{ diff }}
        </option>
      </select>

      <div class="tags">
        <span 
          v-for="tag in tags" 
          :key="tag"
          :class="['tag', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="problem-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="problem in filteredProblems" 
            :key="problem.id"
            @click="navigateToProblem(problem.id)"
          >
            <td>{{ problem.id }}</td>
            <td>{{ problem.title }}</td>
            <td :class="`difficulty-${problem.difficulty}`">
              {{ problem.difficulty }}
            </td>
            <td>
              <span 
                v-for="tag in problem.tags" 
                :key="tag"
                class="problem-tag"
              >
                {{ tag }}
              </span>
            </td>
            <td>{{ problem.solvedCount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button 
          v-for="page in totalPages"
          :key="page"
          :class="['page-btn', { active: currentPage === page }]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  tags: string[];
  solvedCount: number;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    
    // Mock data - will be replaced with API calls
    const problems = ref<Problem[]>([
      {
        id: 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['Array', 'Hash Table'],
        solvedCount: 12345
      },
      {
        id: 2,
        title: 'Add Two Numbers',
        difficulty: 'Medium', 
        tags: ['Linked List', 'Math'],
        solvedCount: 9876
      }
    ]);

    const difficulties = ['Easy', 'Medium', 'Hard'];
    const tags = ['Array', 'Hash Table', 'Linked List', 'Math', 'String'];
    
    const searchQuery = ref('');
    const selectedDifficulty = ref('');
    const selectedTags = ref<string[]>([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const filteredProblems = computed(() => {
      return problems.value
        .filter(p => 
          p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
          (selectedDifficulty.value ? p.difficulty === selectedDifficulty.value : true) &&
          (selectedTags.value.length ? selectedTags.value.every(t => p.tags.includes(t)) : true)
        )
        .slice(
          (currentPage.value - 1) * itemsPerPage,
          currentPage.value * itemsPerPage
        );
    });

    const totalPages = computed(() => 
      Math.ceil(problems.value.length / itemsPerPage)
    );

    function toggleTag(tag: string) {
      const index = selectedTags.value.indexOf(tag);
      if (index === -1) {
        selectedTags.value.push(tag);
      } else {
        selectedTags.value.splice(index, 1);
      }
    }

    function navigateToProblem(id: number) {
      router.push({ name: 'problem-detail', params: { id } });
    }

    return {
      problems,
      difficulties,
      tags,
      searchQuery,
      selectedDifficulty,
      selectedTags,
      currentPage,
      filteredProblems,
      totalPages,
      toggleTag,
      navigateToProblem
    };
  }
});
</script>

<style scoped>
.problem-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.tags {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  margin: 2px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #eee;
  cursor: pointer;
}

.tag.active {
  background: #2196F3;
  color: white;
}

.problem-table {
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

tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.difficulty-Easy {
  color: #4CAF50;
}

.difficulty-Medium {
  color: #FFC107;
}

.difficulty-Hard {
  color: #F44336;
}

.problem-tag {
  display: inline-block;
  margin: 2px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #eee;
  font-size: 0.8em;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.page-btn {
  margin: 2px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.page-btn.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}
</style>
