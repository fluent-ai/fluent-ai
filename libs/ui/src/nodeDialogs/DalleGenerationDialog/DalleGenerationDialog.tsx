
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";

/* eslint-disable-next-line */
export interface DalleGenerationDialogProps {}

interface IOutputs {
  nodeOutputs?: {
    image?: {
      url: string
    }
  };
}
function DalleGenerationDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInput(id));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id)) as IOutputs;
  const state = useSelector(flowRunnerSelectors.selectState(id)) as IOutputs;
  // const url = outputs?.nodeOutputs?.image?.url || ''

  return (
    <InnerDialogStructure
    title="Open AI Dall.e Generation"
    description="Generate an image based on in incoming message (msg.payload) using OpenAI's Dall.e"
    >
      <div title="Settings" >
      <label title="Output Images"  className="mt-2.5">select amount of variations
          <select aria-label="select amount of variations"
            onChange={(e)=> dispatch(flowRunnerActions.setInput(
              {
                id,
                nodeInputs: {
                  ...inputs?.nodeInputs,
                  numberVariations: e.target.value
                }
              }
            ))}
           defaultValue={1}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </label>
        </div>
      <div title="Output Images" className="flex flex-col items-center justify-center">
        {/* {url !== '' ? <img src={url} alt="Open AI" /> : <div>Run the flow to generate an image</div>} */}
        { 
        // @ts-ignore
        outputs?.nodeOutputs?.images?.map((image, index) => {
          return <img key={index} src={image.url} alt="Open AI" />
        })
        }
      </div>



    </InnerDialogStructure>
  );
}

export {DalleGenerationDialog};


