<script lang="ts">
  import { loginPath, logoutPath } from '$lib';
  import * as m from '$lib/paraglide/messages';
  import LanguageSelect from './LanguageSelect.svelte';

  const { user } = $props();
  console.log('user', user);

  let isLoggedIn = $derived(!!user);
  $effect(() => {
    console.log('isLoggedIn', isLoggedIn);
  });
</script>

<header class="flex items-center justify-between bg-blue-600 p-4 text-white">
  <div class="text-xl font-bold">
    <a href="/" class="text-white">{m.app_name()}</a>
  </div>
  <nav class="flex items-center space-x-4">
    {#if !isLoggedIn}
      <a
        href={loginPath()}
        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </a>
    {:else}
      <a
        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        href={logoutPath()}
      >
        Logout
      </a>
    {/if}
    <LanguageSelect />
  </nav>
</header>
