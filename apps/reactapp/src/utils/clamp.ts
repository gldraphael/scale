/**
 * 
 * 
 * @param val The value you want to clamp
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 * @returns 
 */
export default function(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
};