<script lang="ts">
  import { onMount } from 'svelte';
  import { getLikeStatus, toggleLike } from '@/utils/like';
  import i18nit from '../i18n/translation';

  export let targetType: 'post' | 'comment' = 'post';
  export let targetId: string;
  export let language: string = 'zh-cn';

  const t = i18nit(language);

  let count = 0;
  let liked = false;
  let loading = true;
  let updating = false;

  onMount(async () => {
    try {
      const status = await getLikeStatus(targetType, targetId);
      count = status.count;
      liked = status.liked;
    } catch (err) {
      console.warn('Failed to load like status:', err);
    } finally {
      loading = false;
    }
  });

  async function handleClick() {
    if (updating || loading) return;

    updating = true;

    try {
      const status = await toggleLike(targetType, targetId);
      count = status.count;
      liked = status.liked;
    } catch (err) {
      console.warn('Failed to update like:', err);
      alert(t('likes.likeFailed') || '点赞失败，请稍后再试');
    } finally {
      updating = false;
    }
  }
</script>

<button
  type="button"
  on:click={handleClick}
  disabled={loading || updating}
  class="inline-flex items-center gap-1.5 rounded-full border border-[var(--button-border-color)] px-3 py-1.5 text-sm text-[var(--text-color)] hover:border-[var(--link-color)] hover:text-[var(--link-color)] transition-colors disabled:opacity-60"
  aria-pressed={liked}
  title={liked ? (t('likes.unlike') || '取消点赞') : (t('likes.like') || '点赞')}
>
  <span class={liked ? 'text-red-500' : ''}>
    {liked ? '♥' : '♡'}
  </span>

  <span>
    {loading ? '...' : count}
  </span>
</button>