<template>
  <vue-cal :events="events" @cell-click="onDateClick"></vue-cal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default defineComponent({
  name: 'CompetitionCalendar',
  components: {
    VueCal,
  },
  setup() {
    const events = ref([
      {
        start: '2025-02-20T00:00:00',
        end: '2025-02-20T23:59:59',
        title: '华农天梯赛',
      },
      {
        start: '2025-02-22T00:00:00',
        end: '2025-02-22T23:59:59',
        title: '自科部ACM内战赛',
      },
    ]);

    const onDateClick = (date: string) => {
      console.log(`你点击了 ${date}`);
    };

    return { events, onDateClick };
  },
});
</script>

<style scoped>
.vuecal {
  max-width: 100%;
  margin: 20px auto;
}
</style>
