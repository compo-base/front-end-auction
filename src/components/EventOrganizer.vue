<template>
  <div class="p-5 w-64 cursor-pointer border border-blue-600 mb-5 mt-3">
    <p>{{ event.category }}</p>
    <p>{{ event.organizer }}</p>
  </div>
</template>

<script setup lang="ts">
import { type EventItem } from '@/type'
import { PropTypes } from 'vue'

const props = defineProps({
  event: {
    type: Object as PropTypes<EventItem>,
    require: true
  }
})
</script>
