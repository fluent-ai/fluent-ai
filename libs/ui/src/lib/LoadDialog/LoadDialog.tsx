import { DialogComponent } from '../DialogComponent/DialogComponent';
import * as  Form  from '@radix-ui/react-form';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { TrashIcon, BackpackIcon } from '@radix-ui/react-icons';
import { supabase }  from '@tool-ai/supabase';
import { useDispatch, useSelector } from 'react-redux';
import { flowActions, flowSelectors, supabaseSelectors } from '@tool-ai/state';
import { useEffect, useState, } from 'react';
/* eslint-disable-next-line */
export interface LoadDialogProps {}

function LoadDialog(props: LoadDialogProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [flows, setFlows] = useState<any[]>([]);
  const userId = useSelector(supabaseSelectors.getUserId);
  const currentFlow = useSelector(flowSelectors.getFlow);

  // const 
  useEffect(() => {
    if (open) {
      supabase.updateFlows().then(() => {
        setFlows(supabase.getFlows())
      })
    }
  }, [open]);

  const newFlow = () => {
    dispatch(flowActions.newFlow());
  }

  const saveFlow = () => {
    if (!userId) {
      return;
    }
    supabase.saveFlow({
      id: currentFlow.id,
      userId,
      displayName: currentFlow.displayName,
      flow: currentFlow
      })
      .then(() => {
        setFlows(supabase.getFlows())
      })
  }


  return (
    <DialogComponent
    onOpenChange={setOpen}
    trigger={
      <div className='flex gap-x-3'>
        <div className='sidebar-icon w-[30px] h-[30px]'>
          <BackpackIcon />
        </div>
        <p className='w-100' aria-label="Flow Storage" >Flows</p>
      </div>
    }
    title="Flows"
    >
      <div>
        <button
          className='h-5'
          type="button"
          onClick={newFlow}
        >New Flow</button>
        <ul>
        {flows.map((flow) => {
          return (
            <li key={flow.id} className='flex gap-x-3'>
              <div
                onClick={() => {
                  const flowData = supabase.getFlow(flow.id);
                  
                  if (!flowData) {
                    return;
                  }
                  dispatch(flowActions.setFlow(flowData));
                }}
              >
                {flow.displayName}
              </div>
              <button
                className='h-5'
                type="button"
                title='Delete Flow'
                onClick={() => {
                  supabase.deleteFlow(flow.id)
                  .then(() => {
                    setFlows(supabase.getFlows())
                  })
                }}
              ><TrashIcon/></button>
            </li>
          );
        })}
        </ul>
        <ButtonComponent
          type="button"
          ariaLabel="Save current flow"
          buttonContent="Save"
          clickHandler={saveFlow}
        />
    </div>
  </DialogComponent>
  );
}

export {LoadDialog};
