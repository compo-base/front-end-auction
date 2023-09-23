<script setup lang="ts">
import type { EventItem } from "@/type";
import { ref } from "vue";
import { useRouter } from "vue-router";
import EventService from "@/services/EventService";
import { useMessageStore } from "../stores/message";
const event = ref<EventItem>({
  id: 0,
  category: "",
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  petsAllowed: true,
  organizer: "",
});

const router = useRouter();
const store = useMessageStore();
function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      console.log(response.data);
      router.push({
        name: "event-detail",
        params: { id: response.data.id },
      });
      store.updateMessage(
        "You are successfully add a new event for " + response.data.title
      );
      setTimeout(() => {
        store.resetMessage();
      }, 3000);
    })
    .catch(() => {
      router.push({ name: "network-error" });
    });
}
</script>

<template>
  <div
    class="p-8 bg-gray-100 w-full max-w-screen-md mx-auto rounded-lg shadow-md"
  >
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Create an event</h1>
    <form @submit.prevent="saveEvent">
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="category">Category</label>
        <input
          v-model="event.category"
          type="text"
          placeholder="Category"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
          id="category"
        />
      </div>

      <h3 class="text-xl font-semibold mb-2 text-gray-800">
        Name & describe your event
      </h3>

      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="title">Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Title"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
          id="title"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="description"
          >Description</label
        >
        <input
          v-model="event.description"
          type="text"
          placeholder="Description"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
          id="description"
        />
      </div>

      <h3 class="text-xl font-semibold mb-2 text-gray-800">
        Where is your event?
      </h3>

      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="location">Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Location"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
          id="location"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150"
      >
        Submit
      </button>
    </form>

    <pre
      class="mt-4 bg-white p-4 rounded border border-gray-300 text-gray-700"
      >{{ event }}</pre
    >
  </div>
</template>
