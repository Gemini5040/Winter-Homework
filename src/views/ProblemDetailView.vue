<template>
  <div class="problem-detail">
    <div class="problem-content">
      <h1>{{ problem.title }}</h1>
      <div class="meta">
        <span class="difficulty" :class="`difficulty-${problem.difficulty}`">
          {{ problem.difficulty }}
        </span>
        <span class="tags">
          <span 
            v-for="tag in problem.tags" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </span>
      </div>

      <div class="description" v-html="problem.description"></div>

      <div class="editor-container">
        <div class="editor-header">
          <select v-model="selectedLanguage">
            <option 
              v-for="lang in languages" 
              :key="lang.value"
              :value="lang.value"
            >
              {{ lang.label }}
            </option>
          </select>
          <button @click="submitCode">Submit</button>
        </div>
        
        <textarea 
          v-model="code"
          class="code-editor"
          placeholder="Write your code here..."
        ></textarea>
      </div>

      <div class="test-results" v-if="submissionResults">
        <h3>Test Results</h3>
        <div 
          v-for="(result, index) in submissionResults" 
          :key="index"
          class="test-case"
        >
          <span class="status" :class="result.status">
            Test Case {{ index + 1 }}: {{ result.status }}
          </span>
          <div v-if="result.message" class="message">
            {{ result.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
}

interface TestResult {
  status: 'passed' | 'failed' | 'error';
  message?: string;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const problemId = route.params.id;

    // Mock data - will be replaced with API call
    const problem = ref<Problem>({
      id: Number(problemId),
      title: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      description: `
        <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
        <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
        <p>You can return the answer in any order.</p>
      `
    });

    const languages = ref([
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++' }
    ]);

    const selectedLanguage = ref('javascript');
    const code = ref('');
    const submissionResults = ref<TestResult[] | null>(null);

    function submitCode() {
      // Mock submission results
      submissionResults.value = [
        { status: 'passed' },
        { status: 'failed', message: 'Expected [0,1], got [1,2]' },
        { status: 'error', message: 'Time limit exceeded' }
      ];
    }

    return {
      problem,
      languages,
      selectedLanguage,
      code,
      submissionResults,
      submitCode
    };
  }
});
</script>

<style scoped>
.problem-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.problem-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.meta {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;
}

.difficulty {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.difficulty-Easy {
  background: #e8f5e9;
  color: #4CAF50;
}

.difficulty-Medium {
  background: #fff3e0;
  color: #FFC107;
}

.difficulty-Hard {
  background: #ffebee;
  color: #F44336;
}

.tag {
  display: inline-block;
  padding: 2px 6px;
  margin: 2px;
  background: #eee;
  border-radius: 4px;
  font-size: 0.9em;
}

.description {
  margin: 20px 0;
  line-height: 1.6;
}

.editor-container {
  margin: 20px 0;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.code-editor {
  width: 100%;
  height: 300px;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.test-results {
  margin-top: 20px;
}

.test-case {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.status {
  font-weight: bold;
}

.status.passed {
  color: #4CAF50;
}

.status.failed {
  color: #F44336;
}

.status.error {
  color: #FFC107;
}

.message {
  margin-top: 5px;
  color: #666;
}
</style>
