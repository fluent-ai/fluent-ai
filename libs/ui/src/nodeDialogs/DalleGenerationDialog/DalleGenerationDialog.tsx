
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from "react-redux";
import { flowActions, flowSelectors, flowRunnerSelectors } from "@tool-ai/state";

/* eslint-disable-next-line */
export interface DalleGenerationDialogProps {}

interface IOutputs {
  msg?: {
    image?: {
      url: string
    }
  };
}
function DalleGenerationDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id)) as IOutputs;
  // const url = outputs?.msg?.image?.url || ''

  return (
    <InnerDialogStructure
    title="Open AI Dall.e Generation"
    description="Generate an image based on in incoming message (msg.payload) using OpenAI's Dall.e"
    >
      <div title="Settings" >
      <label title="Output Images"  className="mt-2.5">select amount of variations
          <select aria-label="select amount of variations"
            onChange={(e)=> dispatch(flowActions.setInput(
              {
                id,
                nodeInputs: {
                  ...inputs,
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
        { 
        // @ts-ignore
        outputs?.msg?.images?.map((image, index) => {
          return <img key={index} src={image.url} alt="Open AI" />
        })
        }
      </div>



    </InnerDialogStructure>
  );
}

export {DalleGenerationDialog};


