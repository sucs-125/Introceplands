/**
 * 让后端返回的信息适配多语言，后续更新直接在此添加即可
 */
type TranslateFunction = (key: string) => string;

export function getCommentApiMessage(
  t: TranslateFunction,
  message?: string
): string {
  const messages: Record<string, string> = {
    COMMENT_SUBMITTED:
      t('comments.submitSuccess') || '提交成功',

    COMMENT_DELETED:
      t('comments.deleteSuccess') || '删除成功',

    MISSING_DELETE_TOKEN:
      t('comments.missingDeleteToken') || '缺少评论 ID 或删除凭证',

    COMMENT_NOT_FOUND:
      t('comments.commentNotFound') || '评论不存在',

    NO_DELETE_PERMISSION:
      t('comments.noDeletePermission') || '这个浏览器没有删除这条评论的权限',

    INTERNAL_SERVER_ERROR:
      t('comments.serverError') || '服务器错误，请稍后再试',
  };

  if (message && messages[message]) {
    return messages[message];
  }

  return t('comments.operationFailed') || '操作失败，请稍后再试';
}