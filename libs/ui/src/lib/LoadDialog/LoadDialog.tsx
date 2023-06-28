import { v4 as uuidv4 } from 'uuid';
import { DialogComponent } from '../DialogComponent/DialogComponent';
import { BackpackIcon } from '@radix-ui/react-icons';
import { supabase }  from '@tool-ai/supabase';
import { useDispatch, useSelector } from 'react-redux';
import { flowActions, flowSelectors, supabaseSelectors } from '@tool-ai/state';
import { useEffect, useRef, useState, } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../AccordionComponent/AccordionComponent';
import FlowListItem from './FlowListItem';
import { ConfirmLoad } from './ConfirmLoad';
import { ConfirmDelete } from './ConfirmDelete';
export interface LoadDialogProps {}

function LoadDialog(props: LoadDialogProps) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoad, setConfirmLoad] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');
  const [flows, setFlows] = useState<any[]>([]);
  const [examples, setExamples] = useState<any[]>([]);
  const userId = useSelector(supabaseSelectors.getUserId);
  const currentFlow = useSelector(flowSelectors.getFlow);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  // const 
  useEffect(() => {
    if (open) {
      supabase.updateFlows().then(() => {
        setFlows(supabase.getFlows('flows'))
        setExamples(supabase.getFlows('examples'))
      })
    }
  }, [open]);


  const isFlowChanged = async () => {
    return await supabase.isFlowChanged({
      id: currentFlow.id,
      userId:userId || '',
      displayName: currentFlow.displayName,
      flow: currentFlow
    })
  }

  const loadFlow = async (id:string) => {
    const flowData = supabase.getFlow(id);
    if (!flowData) {
    return;
    }
    dispatch(flowActions.setFlow(flowData));
  }
  

  const renameFlow = (id:string, name:string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      supabase.renameFlow(id, name).then(() => {
        const updatedFlows = flows.map(flow => 
          flow.id === id ? { ...flow, displayName: name } : flow
        );
      setFlows(updatedFlows);
      });
    }, 1000)
  }

  const deleteFlow = (id:string) => {
    supabase.deleteFlow(id)
    .then(() => {
      setFlows(supabase.getFlows())
    })
  }
      


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
    <>
      <ConfirmLoad
        open={confirmLoad !== ''}
        onOpenChange={(value) => {
          setConfirmLoad('');
        }}
        onConfirm={() => {
          loadFlow(confirmLoad)
          setConfirmLoad('');
        }}
        onCancel={() => {
          setConfirmLoad('');
        }}
      />
      <ConfirmDelete
          open={confirmDelete !== ''}
          onOpenChange={(value) => {
            setConfirmDelete('');
          }}
          onConfirm={() => {
            deleteFlow(confirmDelete)
            setConfirmDelete('');
          }}
          onCancel={() => {
            setConfirmDelete('');
          }}
        />
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
        <Accordion type="single" collapsible className="w-full" defaultValue='my-flows'>
            <AccordionItem  value="my-flows">
              <AccordionTrigger>My Flows</AccordionTrigger>
              <AccordionContent>
                <ul className='[&>*:nth-child(odd)]:bg-grey-50'>
                {flows.map((flow, index) => {
                  return (
                    <FlowListItem
                      key={flow.id}
                      id={flow.id}
                      index={index}
                      flow={flow}
                      loadFlow={async () => {
                        if (await isFlowChanged()) {
                        setConfirmLoad(flow.id)
                        } else {
                        loadFlow(flow.id)
                        }
                      }}
                      deleteFlow={() => setConfirmDelete(flow.id)}
                    renameFlow={renameFlow}
                    />
                    
                  );
                })}
                  <li>
                    <button
                        className='h-5'
                        type="button"
                        onClick={saveFlow}
                      >
                      Save
                      </button>
                  </li>
                <li>
                  <button
                      className='h-5'
                      type="button"
                      onClick={newFlow}
                    >
                      New Blank Flow
                    </button>
                </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem  value="example-flows">
              <AccordionTrigger>Example Flows</AccordionTrigger>
              <AccordionContent>
                <ul className='[&>*:nth-child(odd)]:bg-grey-50'>
                  {examples.map((flow, index) => {
                    return (
                      <FlowListItem
                        id={flow.id}
                        key={flow.id}
                        index={index}
                        flow={flow}
                        loadFlow={() => {
                          const flowData = supabase.getFlow(flow.id);
                          if (!flowData) {
                          return;
                          }
                          flowData.id = uuidv4()
                          dispatch(flowActions.setFlow(flowData));
                        }}
                        deleteFlow={() => {
                          supabase.deleteFlow(flow.id)
                          .then(() => {
                          setFlows(supabase.getFlows())
                          })
                      }}
                      />
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        
      </div>
    </DialogComponent>
  </>
  );
}

export {LoadDialog};
