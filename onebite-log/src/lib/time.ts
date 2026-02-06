export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  // 현재에서 작성시간의 차이를 초로 환산
  const secondDiff = (end.getTime() - start.getTime()) / 1000;
  if (secondDiff < 60) return "방금 전";

  const minDiff = Math.floor(secondDiff / 60);
  if (minDiff < 60) return `${minDiff}분 전`;

  const hourDiff = Math.floor(minDiff / 60);
  if (hourDiff < 60) return `${hourDiff}시간 전`;

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
}
