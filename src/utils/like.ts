import { siteConfig } from '@/config';

const VISITOR_ID_KEY = 'momo_like_visitor_id';

export function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

export type LikeTargetType = 'post' | 'comment';

export interface LikeStatus {
  count: number;
  liked: boolean;
}

export async function getLikeStatus(
  targetType: LikeTargetType,
  targetId: string
): Promise<LikeStatus> {
  const visitorId = getVisitorId();
  const apiUrl = siteConfig.comments.backendUrl;

  const params = new URLSearchParams({
    target_type: targetType,
    target_id: targetId,
    visitor_id: visitorId,
  });

  const res = await fetch(`${apiUrl}/api/likes?${params.toString()}`);

  if (!res.ok) {
    throw new Error('Failed to load like status');
  }

  const data = await res.json();

  return {
    count: Number(data.data?.count || 0),
    liked: Boolean(data.data?.liked),
  };
}

export async function toggleLike(
  targetType: LikeTargetType,
  targetId: string
): Promise<LikeStatus> {
  const visitorId = getVisitorId();
  const apiUrl = siteConfig.comments.backendUrl;

  const res = await fetch(`${apiUrl}/api/likes/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      target_type: targetType,
      target_id: targetId,
      visitor_id: visitorId,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to update like');
  }

  const data = await res.json();

  return {
    count: Number(data.data?.count || 0),
    liked: Boolean(data.data?.liked),
  };
}