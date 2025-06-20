import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './rich-test-editor.css';

const MODULES = {
  toolbar: [
    ['bold', 'italic'],
    [{ header: [1, 2, false] }],
    ['blockquote', 'link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

type RichTextEditorProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  id,
}) => {
  return (
    <ReactQuill id={id} value={value} onChange={onChange} modules={MODULES} />
  );
};

export { RichTextEditor };
