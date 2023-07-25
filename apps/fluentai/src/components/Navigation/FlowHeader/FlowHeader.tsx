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
    rounded-md bg-white z-10 text-black flex gap-2 justify-between items-center shadow-md overflow-x-hidden">
      <p>{currentFlow.displayName}</p>
      <div className="flex items-center"><BsSave className="w-4/5"/><p onClick={saveFlow}>save</p></div>
    </div>
  );
}

export default FlowHeader;
