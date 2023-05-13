import { constants } from "buffer";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";

import { NodeDialogProps } from "../../types";
import { handleChange } from "../functions";
/* eslint-disable-next-line */
export interface TxtFileInputProps {}

function TxtFileInputDialog(props: NodeDialogProps) {
  const reader = new FileReader();

  // function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   if (e.target.files != null && e.target.files.length > 0){
  //     for(const file in e.target.files ){
  //       reader.readAsText(e.target.files[file]);
  //     }
  //     reader.onprogress = updateProgress;
  //     reader.onload = loaded;
  //     reader.onerror = errorHandler;
  //   }

  // }
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

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
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
            console.log(values)
            handleChange(
              props.nodes,
              props.setNodes,
              props.activeNodeId,
              values.join(''),
              'txtFiles'
            );
        });
  }

  return (
    <InnerDialogStructure
    title="Txt File Input"
    description=" text file input description" >
      <input
      aria-label="input txt files"
      type="file"
      accept=".txt,.sgml,.rtf,.html,.xml,.md,.tex"
      multiple
      onChange={(e)=> handleOnChange(e)}
      />
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
