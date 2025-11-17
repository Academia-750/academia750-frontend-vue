/**
 * Get color based on mark value
 * Ranges are divided by 5 based on lowest and highest mark of the assessment
 * - Rojo (Red): Lowest range (0-20%)
 * - Naranja (Orange): Second range (20-40%)
 * - Amarillo (Yellow): Third range (40-60%)
 * - Azul (Blue): Fourth range (60-80%)
 * - Verde (Green): Highest range (80-100%)
 *
 * @param {number} mark - The mark value
 * @param {number} lowestMark - The lowest mark in the assessment (optional, defaults to 2)
 * @param {number} highestMark - The highest mark in the assessment (optional, defaults to 8)
 * @returns {string} - Color class name
 */
export function getMarkColor(mark, lowestMark = 2, highestMark = 8) {
  if (mark === null || mark === undefined) {
    return 'grey'
  }

  const markValue = parseFloat(mark)
  const lowest = parseFloat(lowestMark) || 2
  const highest = parseFloat(highestMark) || 8

  console.log(lowest, highest, markValue)
  // If lowest and highest are the same, return a default color
  if (lowest === highest) {
    return 'gray'
  }

  // Calculate the range
  const range = highest - lowest

  // Calculate which range the mark falls into
  const relativePosition = (markValue - lowest) / range

  if (relativePosition >= 0.8) {
    return 'success' // Verde (Green) - 80-100%
  }
  if (relativePosition >= 0.6) {
    return 'primary' // Azul (Blue) - 60-80%
  }
  if (relativePosition >= 0.4) {
    return 'warning' // Amarillo (Yellow) - 40-60%
  }
  if (relativePosition >= 0.2) {
    return 'orange' // Naranja (Orange) - 20-40%
  }

  return 'error' // Rojo (Red) - 0-20%
}
