<template>
    <div class="event-class">
      <div class="p-5 w-64 cursor-pointer border border-gray-600 mb-5">
        <span> @{{ event?.type }}</span>
        <h4 class="mt-2">{{ event?.description }}</h4>
      </div>
    </div>
</template>

<script setup lang="ts">

import {type AuctionItem} from "@/type";
import { type PropType } from "vue";

const props = defineProps({
  event: {
    type: Object as PropType<AuctionItem>,
    require: true,
  }
});
</script>
