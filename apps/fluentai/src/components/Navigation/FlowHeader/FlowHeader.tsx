import { flowSelectors, supabaseSelectors } from "@tool-ai/state";
import { useSelector } from 'react-redux';
import { supabase }  from '@tool-ai/supabase';
import { BsSave } from 'react-icons/bs'

/* eslint-disable-next-line */
export interface FlowHeaderProps {}

export function FlowHeader(props: FlowHeaderProps) {

  const currentFlow = useSelector(flowSelectors.getFlow);
  const userId = useSelector(supabaseSelectors.getUserId);
  const saveFlow = () => {
    if (!userId) {
      return;
    }
    console.log('saveFlow', currentFlow);
    supabase.saveFlow({
      id: currentFlow.id,
      userId,
      displayName: currentFlow.displayName,
      flow: currentFlow
      })
  }

  return (
    <div className="w-max right-[10px] p-2.5 mt-2.5 mr-1.5 mb-2.5 absolute
    rounded-md bg-white z-10 text-black flex gap-5 justify-between items-center shadow-md overflow-x-hidden">
      <p>{currentFlow.displayName}</p>
      <div onClick={saveFlow} className="flex gap-0.5 items-center">
        <button title="save flow" className="h-5"><BsSave className="w-[0.8em] h-[0.8em]"/></button>
        <p>save</p>
        </div>
    </div>
  );
}

export default FlowHeader;
