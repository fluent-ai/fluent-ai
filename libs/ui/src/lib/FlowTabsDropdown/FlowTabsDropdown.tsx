import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './FlowTabsDropdown.module.css';
import { AlertComponent } from '../AlertComponent/AlertComponent';
import styles from '../AlertComponent/AlertComponent.module.css';

import { store } from '@tool-ai/state';
import { FlowCollaborator, FlowTabsDropdownProps } from '../../types';
import { removeCollaborator } from '../../ui-interactions/remove-collaborator';

const FlowTabsDropdown = (props: FlowTabsDropdownProps) => {
  const handleShare = () => {
    const activeId = store.getState().flowTab.flowTabs.activeId;
    const link = 'http://localhost:4200/login?link=' + activeId;
    console.log("Here's your collaboration link: ", link);
  };

  const handleCopy = () => {
    const activeId = store.getState().flowTab.flowTabs.activeId;
    const link = 'http://localhost:4200/login?copy=' + activeId;
    console.log("Here's your link to share a copy: ", link);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton sidebar-icon" aria-label="FlowTab Menu">
          <CaretDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          <DropdownMenu.Item
            className={styles.DropdownMenuItem}
            onClick={props.onSave}
          >
            Save <div className={styles.RightSlot}>⌘+S</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.DropdownMenuItem}
            onClick={handleCopy}
          >
            Share Copy
            {/* Share a Copy <div className={styles.RightSlot}>⌘+S</div> */}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.DropdownMenuItem}
            onClick={handleShare}
          >
            Collaborate
            {/* Share <div className={styles.RightSlot}>⌘+N</div> */}
          </DropdownMenu.Item>
          <AlertComponent
            classes={styles.DropdownMenuItem}
            buttonText="Delete"
            description="This action cannot be undone. This will permanently delete the flow and remove it from our servers."
            title="Delete Flow"
          />
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            People
          </DropdownMenu.Label>
          {props.users.map((collaborator: FlowCollaborator) => {
            if (collaborator.id !== props.flowChartOwner) {
              return (
                <DropdownMenu.Item
                  key={collaborator.id}
                  className={styles.DropdownMenuItem}
                >
                  {collaborator.name}
                  <div
                    className={styles.RightSlot}
                    onClick={() => removeCollaborator(collaborator.id)}
                  >
                    {/* we only show the option if the flow is owned by the current user */}
                    {store.getState().user.userData.id === props.flowChartOwner
                      ? 'remove'
                      : ''}
                  </div>
                </DropdownMenu.Item>
              );
            } else return null;
          })}

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { FlowTabsDropdown };
