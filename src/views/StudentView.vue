<template>
  <div class="student">
    <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
  </div>
</template>

<script setup lang="ts">
import EventService from '@/services/EventService';
import StudentCard from '../components/StudentCard.vue'
import type { studentInfo } from '@/student'
import { ref } from 'vue'
import type { Ref } from 'vue'
const students: Ref<Array<studentInfo>> = ref([])
EventService.getStudent().then((response) => {
  students.value = response.data
})
</script>
