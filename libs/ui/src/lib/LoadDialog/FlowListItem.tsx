import { TrashIcon } from '@radix-ui/react-icons';
import { RenameDialog } from './RenameDialog';
import { useDispatch } from 'react-redux';

export default function FlowListItem(
    {key, flow, index, loadFlow, deleteFlow}
    : {
        key: string,
        flow: any,
        index: number,
        loadFlow: () => void,
        deleteFlow: () => void,
     }
) {
  const dispatch = useDispatch();
  return (
    <li
        key={key}
        className={`${index % 2 === 1 ? 'bg-gray-50' : ''}`}
        >
        <div className='flex justify-between'>
            <div onClick={loadFlow} >
                {flow.displayName}
            </div>
                <div className='flex justify-between gap-2'>
                    <button
                        className='h-5'
                        type="button"
                        title='Delete Flow'
                        onClick={deleteFlow}
                    >
                        <TrashIcon/>
                    </button>
                <RenameDialog
                    currentValue={flow.displayName}
                    onChange={() => {console.log('change')}}
                />
            </div>
        </div>
        </li>
  )
}
