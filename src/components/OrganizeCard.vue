<template>
  <div class="event-class">
    <div class="p-5 w-72 cursor-pointer border border-gray-600 mb-5">
      <h4>{{ organize?.name }}</h4>
      <span> @{{ organize?.address }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type OrganizerItem } from "@/type";
import { type PropType } from "vue";
const props = defineProps({
  organize: {
    type: Object as PropType<OrganizerItem>,
    requier: true,
  },
});
</script>
