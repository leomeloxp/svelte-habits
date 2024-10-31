<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();

  let habits = $derived(data.habits);
</script>

<main class=" min-h-screen bg-gray-100 p-4">
  <h1 class="mb-4 text-4xl font-bold text-blue-600">Habit List</h1>

  <form
    method="post"
    action="?/createHabit"
    class="mb-8 w-full rounded-lg bg-white p-4 shadow-md"
    use:enhance
  >
    <div class="mb-4">
      <label for="habit-name" class="block text-sm font-medium text-gray-700">New Habit</label>
      <input
        type="text"
        id="habit-name"
        name="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter habit name"
        required
      />
    </div>
    <button
      type="submit"
      class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create Habit
    </button>
  </form>

  {#if habits?.length > 0}
    <ul class="w-full rounded-lg bg-white p-4 shadow-md">
      {#each habits as habit}
        <li class="border-b border-gray-200 py-2">
          <a href={`habits/${habit.id}`} class="text-gray-600">{habit.name}</a>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-gray-600">No habits found</p>
  {/if}
</main>
