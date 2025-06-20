type RichTextEditorProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export default function ReactQuillMock(props: RichTextEditorProps) {
  return (
    <textarea
      data-testid="react-quill-mock"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
