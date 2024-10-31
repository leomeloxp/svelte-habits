<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';
  let { children, data } = $props();
  let user: any = $derived(data.user);

  import Header from '../components/Header.svelte';
</script>

<ParaglideJS {i18n}>
  <Header {user} />
  {@render children()}
</ParaglideJS>
