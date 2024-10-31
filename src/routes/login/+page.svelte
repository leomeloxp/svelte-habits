<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<main class="mx-auto max-w-3xl pt-3">
  <h1 class="mb-6 text-center text-3xl font-bold">Login or Sign up</h1>
  <form method="post" action="?/login" use:enhance class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Username
        <input
          name="username"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </label>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Password
        <input
          type="password"
          name="password"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </label>
    </div>
    <div class="flex space-x-4">
      <button
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
      <button
        formaction="?/register"
        class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Register
      </button>
    </div>
  </form>
  <p style="color: red">{form?.message ?? ''}</p>
</main>
