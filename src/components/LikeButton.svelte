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
  let justUpdated = false;

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

      justUpdated = true;
      setTimeout(() => {
        justUpdated = false;
      }, 320);
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
  class={`like-button ${liked ? 'liked' : ''} ${justUpdated ? 'just-updated' : ''}`}
  aria-pressed={liked}
  title={liked ? (t('likes.unlike') || '取消点赞') : (t('likes.like') || '点赞')}
>
  <span class="like-icon" aria-hidden="true">
    {liked ? '♥' : '♡'}
  </span>

  <span class="like-count">
    {loading ? '...' : count}
  </span>
</button>

<style>
  .like-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;

    min-width: 4.25rem;
    padding: 0.45rem 0.9rem;

    border: 1px solid var(--button-border-color);
    border-radius: 999px;

    color: var(--text-color);
    background: color-mix(in srgb, var(--text-color) 4%, transparent);

    font-size: 0.9rem;
    line-height: 1;
    cursor: pointer;

    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background-color 180ms ease,
      color 180ms ease,
      box-shadow 180ms ease,
      opacity 180ms ease;
  }

  .like-button:hover {
    transform: translateY(-1px);
    border-color: var(--link-color);
    color: var(--link-color);
    background: color-mix(in srgb, var(--link-color) 8%, transparent);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  .like-button:active {
    transform: translateY(0) scale(0.97);
  }

  .like-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }

  .like-button.liked {
    border-color: color-mix(in srgb, var(--link-color) 70%, transparent);
    color: var(--link-color);
    background: color-mix(in srgb, var(--link-color) 10%, transparent);
  }

  .like-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 1rem;
    height: 1rem;

    font-size: 1rem;
    line-height: 1;

    transition:
      transform 180ms ease,
      color 180ms ease;
  }

  .like-count {
    min-width: 1ch;
    font-variant-numeric: tabular-nums;
  }

  .like-button.just-updated .like-icon {
    animation: like-pop 320ms ease-out;
  }

  @keyframes like-pop {
    0% {
      transform: scale(1);
    }

    45% {
      transform: scale(1.38);
    }

    100% {
      transform: scale(1);
    }
  }
</style>