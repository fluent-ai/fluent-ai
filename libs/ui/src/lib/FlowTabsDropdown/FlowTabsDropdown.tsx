import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import styles from './FlowTabsDropdown.module.css';
import { AlertComponent } from '../AlertComponent/AlertComponent';
import alertStyles from '../AlertComponent/AlertComponent.module.css';

import { store } from '@tool-ai/state';
import { FlowCollaborators, FlowTabsDropdownProps } from '../../types';

const FlowTabsDropdown = (props: FlowTabsDropdownProps) => {
  const handleShare = () => {
    const activeId = store.getState().flowTab.flowTabs.activeId;
    const link = 'http://localhost:4200/login?link=' + activeId;
    console.log("Here's your sharing link: ", link);
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
            onClick={handleShare}
          >
            Share <div className={styles.RightSlot}>⌘+N</div>
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
          {props.users.map((user: FlowCollaborators) => {
            return (
              <DropdownMenu.Item
                key={user.id}
                className={styles.DropdownMenuItem}
              >
                {user.name}
                <div className={styles.RightSlot}>remove</div>
              </DropdownMenu.Item>
            );
          })}

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { FlowTabsDropdown };
