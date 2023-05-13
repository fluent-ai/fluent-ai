import React, { useState, useEffect } from 'react'
import { constants } from "buffer";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { FileIcon, Cross1Icon } from '@radix-ui/react-icons';

import { NodeDialogProps } from "../../types";
import { handleChange } from "../functions";
import { Handle } from 'reactflow';
/* eslint-disable-next-line */
export interface TxtFileInputProps {}

function TxtFileInputDialog(props: NodeDialogProps) {
  const [files, setFiles] = useState<any[]>([]);

 function handleFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles =  Array.prototype.slice.call(e.currentTarget.files);
    if(newFiles != null){
      const newArray = newFiles.filter(({ name }) => !files.some((file) => file.name === name))
      setFiles([...files, ...newArray]);
      e.target.value = '';
    }

  }
  function readFileAsText(file: Blob) {
    return new Promise(function(resolve,reject){
        const fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsText(file);
    });
  }

  function handleOnChange(files: Blob[]) {

    const readers = [];

    // Abort if there were no files selected
    if(files == null || !files.length) return;
        // Store promises in array
        for(let i = 0;i < files.length;i++){
            readers.push(readFileAsText(files[i]));
        }
        // Trigger Promises
        Promise.all(readers).then((values) => {
            // Values will be an array that contains an item
            // with the text of every selected file
            // ["File1 Content", "File2 Content" ... "FileN Content"]
            handleChange(
              props.nodes,
              props.setNodes,
              props.activeNodeId,
              values.join(''),
              'txtFiles'
            );
        });
  }

  function handleFileDelete(file: Blob) {
    setFiles(files.filter((f) => f.name!== file.name));
  }

  useEffect(() => {
    handleOnChange(files);
  }, [files]);

  return (
    <InnerDialogStructure
    title="Txt File Input"
    description=" text file input description" >
      <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-38 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">.txt,sgml,rtf,html,xml,md,tex</p>
        </div>
        <input
        className="hidden"
        id="dropzone-file"
        aria-label="input txt files"
        type="file"
        accept=".txt,.sgml,.rtf,.html,.xml,.md,.tex"
        multiple
        onChange={(e)=> handleFilesUpload(e)}
        />
        </label>
      </div>
      {files.length > 0 &&
      files.map((file) => <div className="flex justify-between">
        <div className="flex" >
          <div className="sidebar-icon"><FileIcon className="text-gray-500 dark:text-gray-400" /></div>
          <p>{file.name}</p>
        </div>
        <div onClick={()=>handleFileDelete(file)}><Cross1Icon /></div>
        </div>)
        }
       {/* <Toggle.Root
        aria-label="Toggle italic"
        className="hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        Coming soon
      </Toggle.Root> */}
    </InnerDialogStructure>
  );
}

export {TxtFileInputDialog};