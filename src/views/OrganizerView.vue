<template>
  <main class="flex flex-col items-center">
    <div class="events-input">
      <label for="events-per-page">Events per page:</label>
      <input
        type="number"
        id="events-per-page"
        v-model.number="eventsPerPage"
        class="border border-gray-300 p-2 rounded"
      />
    </div>
    <OrganizeCard
      v-for="organizer in organize"
      :key="organizer.id"
      :organize="organizer"
    ></OrganizeCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'Organize', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-300 m-5"
      >
        Prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'Organize', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPages"
        id="page-next"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-300 m-5"
      >
        Next page
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import type { OrganizerItem } from "@/type";
import EventService from "@/services/EventService";
import type { AxiosResponse } from "axios";
import OrganizeCard from "@/components/OrganizeCard.vue";

const router = useRouter();
const organize: Ref<Array<OrganizerItem>> = ref([]);
const totalEvent = ref<number>(0);
const eventsPerPage = ref(3); //initial value of events
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
});
watchEffect(() => {
  EventService.getOrganizer(eventsPerPage.value, props.page)
    .then((response: AxiosResponse<OrganizerItem[]>) => {
      organize.value = response.data;
      totalEvent.value = response.headers["x-total-count"];
    })
    .catch(() => {
      router.push({ name: "NetworkError" });
    });
});

const hasNextPages = computed(() => {
  //first calculate total page
  const totalPages = Math.ceil(totalEvent.value / eventsPerPage.value);
  return props.page.valueOf() < totalPages;
});
</script>
