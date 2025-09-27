/**
 * Detects if the cursor is inside JSX context
 * @param model - Monaco editor model
 * @param line - Line number
 * @param column - Column number
 * @returns true if inside JSX context
 */
export const isInsideJSX = (
  model: any,
  line: number,
  column: number
): boolean => {
  const text = model.getValue();
  const position = model.getOffsetAt({ lineNumber: line, column });

  // Simple heuristic: look for return statement and check if we're after it
  const beforePosition = text.substring(0, position);
  const returnMatch = beforePosition.match(/return\s*\(/g);
  const jsxMatch = beforePosition.match(/<[^>]*>/g);

  return returnMatch && jsxMatch && returnMatch.length > 0;
};
