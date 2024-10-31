<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { i18n } from '$lib/i18n';
  import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

  function switchToLanguage(newLanguage: AvailableLanguageTag) {
    const canonicalPath = i18n.route($page.url.pathname);
    const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
    goto(localisedPath);
  }

  let url = $derived(new URL($page.url.href));
  let selectedLanguage = $derived(i18n.getLanguageFromUrl(url));

  function handleSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newLanguage = target.value as AvailableLanguageTag;
    switchToLanguage(newLanguage);
  }
</script>

<div class=" text-blue-600">
  <select value={selectedLanguage} onchange={handleSelectChange}>
    <option value="en">en</option>
    <option value="pt">pt</option>
  </select>
</div>
