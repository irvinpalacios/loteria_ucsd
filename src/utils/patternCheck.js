export function checkPatterns(marked, size) {
  const patterns = [];

  // Rows and columns
  for (let i = 0; i < size; i += 1) {
    if (marked[i].every(Boolean)) {
      patterns.push({ type: 'row', index: i });
    }
    if (marked.every((row) => row[i])) {
      patterns.push({ type: 'column', index: i });
    }
  }

  // Diagonals
  if (marked.every((row, idx) => row[idx])) {
    patterns.push({ type: 'diagonal' });
  }
  if (marked.every((row, idx) => row[size - 1 - idx])) {
    patterns.push({ type: 'reverse-diagonal' });
  }

  // Four corners
  if (marked[0][0] && marked[0][size - 1] && marked[size - 1][0] && marked[size - 1][size - 1]) {
    patterns.push({ type: 'corners' });
  }

  return { hasWin: patterns.length > 0, patterns };
}
