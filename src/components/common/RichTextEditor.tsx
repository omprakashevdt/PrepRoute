import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box } from "@mui/material";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  error?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  height = "300px", // Jodit sets height differently
  error = false,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      height: parseInt(height, 10) || 300,
      width: "100%",
      buttons: [
        "source",
        "|",
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "fullsize",
      ],
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      enableDragAndDropFileToEditor: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      // Apply error styling through Jodit's container if possible,
      // but easier to wrap it
    }),
    [placeholder, height],
  );

  return (
    <Box
      sx={{
        "& .jodit-container": {
          border: error ? "1px solid red !important" : undefined,
          borderRadius: "4px",
        },
        // Ensure editor content area respects height
        "& .jodit-wysiwyg": {
          minHeight: height,
        },
      }}
    >
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        // creating new strings on blur/change is safer for performance
        onBlur={(newContent) => onChange(newContent)}
        // onChange={onChange} // Jodit triggers onChange frequently, onBlur is often better for forms
      />
    </Box>
  );
};

export default RichTextEditor;
