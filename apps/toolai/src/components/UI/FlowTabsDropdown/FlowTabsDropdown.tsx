import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  ArrowDownIcon,
} from '@radix-ui/react-icons';
import './FlowTabsDropdown.module.css';
import AlertComponent from '../AlertComponent/AlertComponent';
import styles from '../AlertComponent/AlertComponent.module.css';

interface User {
  id: string
  initials: string,
  name?: string;
  url?: string;
  alt?: string
}

interface FlowTabsDropdownProps {
  users: User[]
}


const FlowTabsDropdown = (props: FlowTabsDropdownProps) => {

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton sidebar-icon" aria-label="FlowTab Menu">
          <ArrowDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Save <div className={styles.RightSlot}>⌘+S</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            Share <div className={styles.RightSlot}>⌘+N</div>
          </DropdownMenu.Item>
          <AlertComponent
            classes={styles.DropdownMenuItem}
            buttonText='Delete'
            description='This action cannot be undone. This will permanently delete the flow and remove it from our servers.'
            title="Delete Flow"
          />
          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>People</DropdownMenu.Label>
          {props.users.map((user: User) => {
            return (
              <DropdownMenu.Item key={user.id} className={styles.DropdownMenuItem}>
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

export default FlowTabsDropdown;

