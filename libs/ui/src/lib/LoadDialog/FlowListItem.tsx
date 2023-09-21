import { useState, useEffect, useRef } from 'react';
import { TrashIcon, InputIcon } from '@radix-ui/react-icons';
import { BsFolder2Open } from 'react-icons/bs';

export default function FlowListItem({
  id,
  flow,
  index,
  loadFlow,
  deleteFlow,
  renameFlow,
}: {
  id: string;
  flow: any;
  index: number;
  loadFlow: () => void;
  deleteFlow: () => void;
  renameFlow?: (id: string, name: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(flow.displayName);
  const displayNameRef = useRef(displayName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    displayNameRef.current = displayName;
  }, [displayName]);

  // Focus on the input when the component is mounted
  useEffect(() => {
    if (isEditing) inputRef.current && inputRef.current.focus();
  }, [isEditing]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
    displayNameRef.current = event.target.value;
    renameFlow && renameFlow(id, event.target.value);
  };

  return (
    <li
      className={`
    border-solid border-2  rounded-md
    ${isEditing ? 'border-black' : 'border-white'}
    ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
    >
      <div className="flex justify-between">
        <div className="flex justify-between gap-2">
          <button
            className="h-5"
            type="button"
            title="Load Flow"
            onClick={loadFlow}
          >
            <BsFolder2Open />
          </button>
          <div onDoubleClick={() => setIsEditing(true)}>
            {isEditing ? (
              <input
                title="Edit Flow Name"
                ref={inputRef}
                value={displayName}
                onChange={handleNameChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setIsEditing(false);
                  }
                }}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <div className="displayName">{displayName}</div>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          {!isEditing && (
            <button
              className="h-5"
              type="button"
              title="Edit Flow"
              onClick={() => setIsEditing(true)}
            >
              <InputIcon />
            </button>
          )}
          <button
            className="h-5"
            type="button"
            title="Delete Flow"
            onClick={deleteFlow}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}
