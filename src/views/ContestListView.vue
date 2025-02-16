<template>
  <div class="contest-list">
    <div class="filters">
      <select v-model="selectedType">
        <option value="">All Types</option>
        <option 
          v-for="type in contestTypes" 
          :key="type.value"
          :value="type.value"
        >
          {{ type.label }}
        </option>
      </select>

      <select v-model="selectedStatus">
        <option value="">All Statuses</option>
        <option 
          v-for="status in contestStatuses" 
          :key="status.value"
          :value="status.value"
        >
          {{ status.label }}
        </option>
      </select>
    </div>

    <div class="contest-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="contest in filteredContests" 
            :key="contest.id"
          >
            <td>{{ contest.title }}</td>
            <td>{{ contest.type }}</td>
            <td>{{ formatDate(contest.startTime) }}</td>
            <td>{{ contest.duration }} minutes</td>
            <td :class="`status-${contest.status}`">
              {{ contest.status }}
            </td>
            <td>
              <button 
                v-if="isSubscribed(contest.id)"
                @click="unsubscribe(contest.id)"
              >
                Unsubscribe
              </button>
              <button 
                v-else
                @click="subscribe(contest.id)"
              >
                Subscribe
              </button>
            </td>
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

interface Contest {
  id: number;
  title: string;
  type: string;
  startTime: string;
  duration: number;
  status: 'upcoming' | 'ongoing' | 'ended';
}

export default defineComponent({
  setup() {
    // Mock data - will be replaced with API calls
    const contests = ref<Contest[]>([
      {
        id: 1,
        title: 'Weekly Contest 123',
        type: 'individual',
        startTime: '2024-01-15T14:00:00Z',
        duration: 90,
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Biweekly Contest 45',
        type: 'team',
        startTime: '2024-01-10T14:00:00Z',
        duration: 120,
        status: 'ongoing'
      }
    ]);

    const contestTypes = ref([
      { value: 'individual', label: 'Individual' },
      { value: 'team', label: 'Team' }
    ]);

    const contestStatuses = ref([
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'ongoing', label: 'Ongoing' },
      { value: 'ended', label: 'Ended' }
    ]);

    const selectedType = ref('');
    const selectedStatus = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const subscribedContests = ref<number[]>([]);

    const filteredContests = computed(() => {
      return contests.value
        .filter(c => 
          (!selectedType.value || c.type === selectedType.value) &&
          (!selectedStatus.value || c.status === selectedStatus.value)
        )
        .slice(
          (currentPage.value - 1) * itemsPerPage,
          currentPage.value * itemsPerPage
        );
    });

    const totalPages = computed(() => 
      Math.ceil(contests.value.length / itemsPerPage)
    );

    function formatDate(dateString: string) {
      return new Date(dateString).toLocaleString();
    }

    function isSubscribed(contestId: number) {
      return subscribedContests.value.includes(contestId);
    }

    function subscribe(contestId: number) {
      subscribedContests.value.push(contestId);
    }

    function unsubscribe(contestId: number) {
      const index = subscribedContests.value.indexOf(contestId);
      if (index !== -1) {
        subscribedContests.value.splice(index, 1);
      }
    }

    return {
      contests,
      contestTypes,
      contestStatuses,
      selectedType,
      selectedStatus,
      currentPage,
      filteredContests,
      totalPages,
      subscribedContests,
      formatDate,
      isSubscribed,
      subscribe,
      unsubscribe
    };
  }
});
</script>

<style scoped>
.contest-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.contest-table {
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

.status-upcoming {
  color: #2196F3;
}

.status-ongoing {
  color: #4CAF50;
}

.status-ended {
  color: #F44336;
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
