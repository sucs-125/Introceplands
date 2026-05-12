/**
 * 辅助函数：生成评论头像地址
 *
 * 策略：
 * 1. 如果是 QQ 邮箱，优先使用 QQ 头像
 * 2. 其他邮箱使用 Cravatar
 * 3. Cravatar 不存在时，由 open.motues.top 自动回退到生成头像
 */
export const getCravatar = async (email: string): Promise<string> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. QQ 邮箱：使用 QQ 头像
  const qqMatch = cleanEmail.match(/^([1-9]\d{4,11})@qq\.com$/);

  if (qqMatch) {
    const qqNumber = qqMatch[1];
    return `https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`;
  }

  // 2. 非 QQ 邮箱：使用 Cravatar
  const msgUint8 = new TextEncoder().encode(cleanEmail);
  const hashBuffer = await crypto.subtle.digest('MD5', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `https://open.motues.top/avatar?name=${hashHex}&mode=cravatar&variant=beam`;
};