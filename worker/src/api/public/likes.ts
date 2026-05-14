export const getLikeStatus = async (c: any) => {
  try {
    const targetType = c.req.query('target_type');
    const targetId = c.req.query('target_id');
    const visitorId = c.req.query('visitor_id');

    if (!targetType || !targetId) {
      return c.json({ message: 'MISSING_LIKE_TARGET' }, 400);
    }

    if (targetType !== 'post' && targetType !== 'comment') {
      return c.json({ message: 'INVALID_LIKE_TARGET_TYPE' }, 400);
    }

    const countResult = await c.env.MOMO_DB.prepare(`
      SELECT COUNT(*) AS count
      FROM LikeRecord
      WHERE target_type = ? AND target_id = ?
    `).bind(targetType, targetId).first() as { count: number } | null;

    let liked = false;

    if (visitorId) {
      const likedResult = await c.env.MOMO_DB.prepare(`
        SELECT id
        FROM LikeRecord
        WHERE target_type = ? AND target_id = ? AND visitor_id = ?
      `).bind(targetType, targetId, visitorId).first() as { id: number } | null;

      liked = Boolean(likedResult);
    }

    return c.json({
      message: 'LIKE_STATUS_LOADED',
      data: {
        count: Number(countResult?.count || 0),
        liked,
      },
    });
  } catch (e: any) {
    console.error('Get Like Status Error:', e);
    return c.json({ message: 'INTERNAL_SERVER_ERROR' }, 500);
  }
};

export const toggleLike = async (c: any) => {
  try {
    const data = await c.req.json();

    const targetType = data.target_type;
    const targetId = data.target_id;
    const visitorId = data.visitor_id;

    if (!targetType || !targetId || !visitorId) {
      return c.json({ message: 'MISSING_LIKE_PARAMS' }, 400);
    }

    if (targetType !== 'post' && targetType !== 'comment') {
      return c.json({ message: 'INVALID_LIKE_TARGET_TYPE' }, 400);
    }

    const existing = await c.env.MOMO_DB.prepare(`
      SELECT id
      FROM LikeRecord
      WHERE target_type = ? AND target_id = ? AND visitor_id = ?
    `).bind(targetType, targetId, visitorId).first() as { id: number } | null;

    let liked: boolean;

    if (existing) {
      await c.env.MOMO_DB.prepare(`
        DELETE FROM LikeRecord
        WHERE id = ?
      `).bind(existing.id).run();

      liked = false;
    } else {
      await c.env.MOMO_DB.prepare(`
        INSERT INTO LikeRecord (
          target_type, target_id, visitor_id, created_at
        ) VALUES (?, ?, ?, ?)
      `).bind(
        targetType,
        targetId,
        visitorId,
        new Date().toISOString()
      ).run();

      liked = true;
    }

    const countResult = await c.env.MOMO_DB.prepare(`
      SELECT COUNT(*) AS count
      FROM LikeRecord
      WHERE target_type = ? AND target_id = ?
    `).bind(targetType, targetId).first() as { count: number } | null;

    return c.json({
      message: 'LIKE_UPDATED',
      data: {
        count: Number(countResult?.count || 0),
        liked,
      },
    });
  } catch (e: any) {
    console.error('Toggle Like Error:', e);
    return c.json({ message: 'INTERNAL_SERVER_ERROR' }, 500);
  }
};