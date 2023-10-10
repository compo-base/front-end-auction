<script setup lang="ts">
import type { AuctionItem } from "@/type";
import { computed, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import EventService from "@/services/EventService";
import type { AxiosResponse } from "axios";
import { useRouter } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";
import BaseInput from "@/components/BaseInput.vue";
import ItemCard from "@/components/ItemCard.vue";


const router = useRouter();
const events: Ref<Array<AuctionItem>> = ref([]);
const totalEvent = ref<number>(0);
const eventsPerPage = ref(2); //initial value of events
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
});
watchEffect(() => {
  EventService.getAuctionItem(eventsPerPage.value, props.page)
    .then((response: AxiosResponse<AuctionItem[]>) => {
      events.value = response.data;
      totalEvent.value = response.headers["x-total-count"];
      console.log('Fetched total events:', response.headers["x-total-count"]);
    })
    .catch(() => {
      router.push({ name: "NetworkError" });
    });
});
onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page);
  let queryFunction;
  if (keyword.value === null || keyword.value === '') {
    queryFunction = EventService.getAuctionItem(eventsPerPage.value, toPage);
  } else {
    queryFunction = EventService.getAuctionByKeyword(keyword.value, eventsPerPage.value, toPage);
  }
  queryFunction
    .then((response: AxiosResponse<AuctionItem[]>) => {
      events.value = response.data;
      totalEvent.value = response.headers["x-total-count"];
      next();
    })
    .catch(() => {
      next({ name: "NetworkError" });
    });
});

const hasNextPages = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / eventsPerPage.value);
  console.log('Current Page:', props.page.valueOf());
  console.log('Total Pages:', totalPages);
  return props.page.valueOf() < totalPages;
});
const keyword = ref('')
function updateKeyword(value:string){
  let queryFunction;
  if(keyword.value === ''){
    queryFunction = EventService.getAuctionItem(2,1)
  }else{
    queryFunction = EventService.getAuctionByKeyword(keyword.value,2,1)
  }
  queryFunction.then((response:AxiosResponse<AuctionItem[]>) =>{
    events.value = response.data
    console.log('events',events.value)
    totalEvent.value = response.headers['x-total-count']
    console.log('totalEvent',totalEvent.value)
  }).catch(() =>{
    router.push({name:"NetworkErrorView"})
  })

}
</script>

<template>
  <main class="flex flex-col items-center">
    <div class="w-4">
      <BaseInput
      v-model="keyword"
      placeholder="Search..."
      type="text"
      @input="updateKeyword"
      />
    </div>
    <div class="events-input">
      <label for="events-per-page">Events per page:</label>
      <input
        type="number"
        id="events-per-page"
        v-model.number="eventsPerPage"
        class="border border-gray-300 p-2 rounded"
      />
    </div>
    <ItemCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></ItemCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'item-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-5"
      >
        Prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'item-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPages"
        id="page-next"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-5"
      >
        Next page
      </RouterLink>
    </div>
  </main>
</template>
