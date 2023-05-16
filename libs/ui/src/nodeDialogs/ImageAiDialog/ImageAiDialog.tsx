import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useState } from "react";
/* eslint-disable-next-line */
export interface ImageAiDialogProps {}


function ImageAiDialog({id}:{id:string}) {

  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string>('')

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.files){
      setImageSelected(e.target.files[0]);
      setTempImageUrl(URL.createObjectURL(e.target.files[0]));
    }

  }

  return (
    <InnerDialogStructure
          title='Image AI Dialog'
          description=''
        >
        <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-38 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.png</p>
          </div>
          <input
          className="hidden"
          id="dropzone-file"
          aria-label="input images"
          type="file"
          accept=".png"
          onChange={(e)=> handleChange(e)}
          />
          </label>
        </div>
        <div>
        {tempImageUrl &&
        <img className="preview-image" src={tempImageUrl} alt="tempImage" />}
        </div>
    </InnerDialogStructure>
  );
}

export {ImageAiDialog};
