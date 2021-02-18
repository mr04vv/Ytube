/* eslint-disable no-bitwise */
export const convertPlayTime = (seconds: number): string => {
  const h = seconds / 3600 | 0;
  const m = (seconds / 60 | 0) % 60;
  const s = seconds % 60;

  const strSec = s.toString().padStart(2, '0');
  const strMin = h > 0 ? m.toString().padStart(2, '0') : m.toString();
  const strHour = h.toString();

  if (h === 0) {
    if (m === 0) {
      return `0:${strSec}`;
    }
    return `${strMin}:${strSec}`;
  }
  return `${strHour}:${strMin}:${strSec}`;
};
