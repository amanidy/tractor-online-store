'use client';

import dynamic from 'next/dynamic';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DraftPreview = ({ value }: { value: string }) => {
  let editorState;
  
  try {
    const contentState = convertFromRaw(JSON.parse(value));
    editorState = EditorState.createWithContent(contentState);
  } catch {
    editorState = EditorState.createEmpty();
  }

  return (
    <div className="bg-white">
      <Editor
        editorState={editorState}
        readOnly
        toolbarHidden
        editorClassName="prose max-w-full p-4"
      />
    </div>
  );
};


export default dynamic(() => Promise.resolve(DraftPreview), {
  ssr: false
});