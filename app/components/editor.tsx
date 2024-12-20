"use client";
import { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface DraftEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const DraftEditor = ({ value, onChange }: DraftEditorProps) => {
  const [editorState, setEditorState] = useState(() => {
    
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        return EditorState.createWithContent(contentState);
      } catch {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    
    
    const contentRaw = JSON.stringify(
      convertToRaw(newEditorState.getCurrentContent())
    );
    
    onChange(contentRaw);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      toolbar={{
        options: ['inline', 'blockType', 'list'],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        blockType: {
          options: ['Normal', 'H1', 'H2', 'Blockquote'],
        },
        list: {
          options: ['unordered', 'ordered'],
        },
      }}
    />
  );
};

export default DraftEditor;