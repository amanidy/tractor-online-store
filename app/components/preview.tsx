import { Editor } from 'react-draft-wysiwyg';
import { EditorState,  convertFromRaw } from 'draft-js';

export const DraftPreview = ({ value }: { value: string }) => {
  let editorState;
  try {
    const contentState = convertFromRaw(JSON.parse(value));
    editorState = EditorState.createWithContent(contentState);
  } catch {
    editorState = EditorState.createEmpty();
  }

  return (
    <Editor
      editorState={editorState}
      readOnly
      toolbarHidden
    />
  );
};

export default DraftPreview;