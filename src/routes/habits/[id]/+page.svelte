<script lang="ts">
  import { enhance } from '$app/forms';
  import { add, differenceInDays } from 'date-fns';
  import type { ActionData, PageServerData } from './$types';

  let { data, form }: { data: PageServerData; form: ActionData } = $props();
  let habit = $derived(data.habit);
  let habitEvents = $derived(data.habitEvents);

  const startDate = $derived.by(() => habitEvents?.[0]?.createdAt || new Date());
  const habitEntries = $derived.by(() => {
    const entries = [];
    const daysBetweenStartAndNow = differenceInDays(new Date(), startDate);
    for (let i = 0; i <= daysBetweenStartAndNow; i++) {
      const date = add(startDate, { days: i });
      entries.push({
        date,
        completed: habitEvents?.some(
          (event) =>
            event.createdAt.toISOString().split('T')[0] === date.toISOString().split('T')[0]
        )
      });
    }
    return entries;
  });
</script>

<main class="min-h-screen bg-gray-100 p-4">
  <a href="/habits" class="mb-4 inline-block text-blue-500 hover:underline">← Back to all habits</a>
  <h1 class="mb-4 text-4xl font-bold text-blue-600">{habit?.name}</h1>

  <form
    method="post"
    action="?/createHabitEvent"
    class="mb-8 w-full rounded-lg bg-white p-4 shadow-md"
    use:enhance
  >
    <div class="mb-4">
      <label for="habit-event-date" class="block text-sm font-medium text-gray-700"
        >Completion Date</label
      >
      <input
        type="date"
        id="habit-event-date"
        name="createdAt"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Pick a date"
        value={new Date().toISOString().split('T')[0]}
        required
      />
    </div>
    <button
      type="submit"
      class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Mark as Completed
    </button>
    {#if form?.message}
      <p class="pt-1 text-xs text-red-600">{form.message}</p>
    {/if}
  </form>

  <ul class="w-full rounded-lg bg-white p-4 shadow-md">
    {#each habitEntries as entry}
      <li class="border-b border-gray-200 py-2">
        <p class="text-gray-600">
          {entry.completed ? '✅' : '❌'}
          {entry.date.toLocaleDateString()}
        </p>
      </li>
    {/each}
  </ul>
</main>
