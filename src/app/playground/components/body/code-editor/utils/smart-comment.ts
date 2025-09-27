import { SmartCommentOptions } from "../types/editor.types";

/**
 * Toggles comments based on JSX or JavaScript context
 * @param options - Smart comment options
 */
export const toggleSmartComments = (options: SmartCommentOptions) => {
  const { isInJSX, startLine, endLine, model, editor } = options;

  let allCommented = true;
  let allUncommented = true;

  // Check current comment state
  for (let line = startLine; line <= endLine; line++) {
    const lineText = model.getLineContent(line);
    const trimmedLine = lineText.trim();

    if (isInJSX) {
      // JSX comments: {/* */}
      if (!trimmedLine.startsWith("{/*") || !trimmedLine.endsWith("*/}")) {
        allCommented = false;
      }
      if (trimmedLine.startsWith("{/*") && trimmedLine.endsWith("*/}")) {
        allUncommented = false;
      }
    } else {
      // JavaScript comments: //
      if (!trimmedLine.startsWith("//")) {
        allCommented = false;
      }
      if (trimmedLine.startsWith("//")) {
        allUncommented = false;
      }
    }
  }

  // Toggle comments
  editor.pushUndoStop();
  editor.executeEdits("smart-comment", []);

  for (let line = startLine; line <= endLine; line++) {
    const lineText = model.getLineContent(line);
    const trimmedLine = lineText.trim();

    if (isInJSX) {
      // JSX comments
      if (allCommented) {
        // Remove JSX comments
        const newText = lineText
          .replace(/^\s*\{\/\*/, "")
          .replace(/\*\/\}\s*$/, "");
        editor.executeEdits("smart-comment", [
          {
            range: {
              startLineNumber: line,
              startColumn: 1,
              endLineNumber: line,
              endColumn: lineText.length + 1,
            },
            text: newText,
          },
        ]);
      } else {
        // Add JSX comments
        const newText = `{/* ${trimmedLine} */}`;
        editor.executeEdits("smart-comment", [
          {
            range: {
              startLineNumber: line,
              startColumn: 1,
              endLineNumber: line,
              endColumn: lineText.length + 1,
            },
            text: newText,
          },
        ]);
      }
    } else {
      // JavaScript comments
      if (allCommented) {
        // Remove JavaScript comments
        const newText = lineText.replace(/^\s*\/\//, "");
        editor.executeEdits("smart-comment", [
          {
            range: {
              startLineNumber: line,
              startColumn: 1,
              endLineNumber: line,
              endColumn: lineText.length + 1,
            },
            text: newText,
          },
        ]);
      } else {
        // Add JavaScript comments
        const newText = `// ${trimmedLine}`;
        editor.executeEdits("smart-comment", [
          {
            range: {
              startLineNumber: line,
              startColumn: 1,
              endLineNumber: line,
              endColumn: lineText.length + 1,
            },
            text: newText,
          },
        ]);
      }
    }
  }
};
