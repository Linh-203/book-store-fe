// import { message } from 'antd';
import { LegacyRef, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
type Props = {
   getValue: (value: string) => void;
   defaultValue?: string;
};

const formats = [
   'header',
   'bold',
   'italic',
   'underline',
   'strike',
   'blockquote',
   'list',
   'bullet',
   'indent',
   'link',
   'image'
];

const TextQuill = ({ getValue, defaultValue }: Props) => {
   const [value, setValue] = useState<string>('');
   const handleGetValue = (value: string) => {
      getValue(value);
      setValue(value);
   };

   const quillRef = useRef() as LegacyRef<ReactQuill>;
   //  const imageHandler = (e) => {
   //     if (!quillRef) return;
   //     console.log(quillRef);
   //     return;
   //     const editor = quillRef?.current?.getEditor();
   //     console.log(editor);
   //     const input = document.createElement('input');
   //     input.setAttribute('type', 'file');
   //     input.setAttribute('accept', 'image/*');
   //     input.click();

   //     input.onchange = async () => {
   //        const file = input?.files[0];
   //        if (/^image\//.test(file.type)) {
   //           console.log(file);
   //           const formData = new FormData();
   //           formData.append('image', file);
   //           const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
   //           const url = res?.data?.url;
   //           editor.insertEmbed(editor.getSelection(), 'image', url);
   //        } else {
   //           message.error('You could only upload images.');
   //        }
   //     };
   //  };
   const modules = useMemo(
      () => ({
         toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            ['clean']
         ]
      }),
      []
   );
   return (
      <ReactQuill
         theme='snow'
         formats={formats}
         modules={modules}
         value={defaultValue ? defaultValue : value}
         onChange={(value) => handleGetValue(value)}
         ref={quillRef}
      />
   );
};

export default TextQuill;
