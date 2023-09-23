<script setup lang="ts">
import type { OrganizerItem } from "@/type";
import { ref } from "vue";
import EventService from "@/services/EventService";
import { useRouter } from "vue-router";
import { useMessageStore } from "../stores/message";

const organize = ref<OrganizerItem>({
  id: 0,
  name: "",
  address: "",
  description: "",
});
const router = useRouter();
const store = useMessageStore();
function submitForm() {
  EventService.saveOrganizer(organize.value)
    .then((response) => {
      console.log(response.data);
      router.push({
        name: "Organize",
        params: { id: response.data.id },
      });
      store.updateMessage(
        "You are successfully add a new organize for " + response.data.name
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
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Create an organizer</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="name">Name</label>
        <input
          v-model="organize.name"
          type="text"
          placeholder="Organizer Name"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
        />
      </div>

      <h3 class="text-xl font-semibold mb-2 text-gray-800">
        address & describtion
      </h3>

      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="adress">Address</label>
        <input
          v-model="organize.address"
          type="text"
          placeholder="address"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-600 mb-2" for="description"
          >Description</label
        >
        <input
          v-model="organize.description"
          type="text"
          placeholder="Description"
          class="field w-full p-2 rounded border focus:border-blue-400 focus:outline-none transition duration-150"
          id="description"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150"
      >
        Submit
      </button>
    </form>
  </div>
</template>
