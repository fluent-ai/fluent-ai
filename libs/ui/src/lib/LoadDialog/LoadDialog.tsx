import { DialogComponent } from '../DialogComponent/DialogComponent';
import * as  Form  from '@radix-ui/react-form';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { BackpackIcon } from '@radix-ui/react-icons';
import * as supabase from '@tool-ai/supabase';
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
      supabase.getFlows().then((result) => {
        try {
          setFlows(result);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [open]);

  const saveFlow = () => {
    if (!userId) {
      return;
    }
    supabase.saveFlow(currentFlow.id, userId, JSON.stringify(currentFlow));
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
        <ul>
        {flows.map((flow) => {
          return (
            <li key={flow.id} className='flex gap-x-3'>
              <div
                onClick={() => {
                    console.log("load flow");
                    try {
                      const flowData = JSON.parse(flow.flow);
                      console.log(flowData);
                      
                      dispatch(flowActions.setFlow(flowData));
                    } catch (error) {
                      console.log(error);
                    }
                }}
              >
                {flow.id}
              </div>
              <ButtonComponent
                type="button"
                ariaLabel="Delete flow"
                buttonContent="Delete"
                clickHandler={() => {
                  // supabase.deleteFlow(flow.id);
                }}
              />
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
