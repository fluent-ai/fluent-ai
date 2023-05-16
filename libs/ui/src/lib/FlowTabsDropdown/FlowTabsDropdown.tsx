import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import styles from './FlowTabsDropdown.module.css';
import { AlertComponent } from '../AlertComponent/AlertComponent';
import alertStyles from '../AlertComponent/AlertComponent.module.css';
import { DialogComponent } from '../DialogComponent/DialogComponent';
import { store } from '@tool-ai/state';
import { FlowCollaborators, FlowTabsDropdownProps } from '../../types';
import * as Dialog from '@radix-ui/react-dialog';
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
            <DialogComponent
              trigger={<p>Share</p>}
              title="Share"
            >
              <input aria-label="sharing-link" value="link"></input>
            </DialogComponent>
            {/* <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="" aria-label="FlowTab Menu">
          share
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0 z-1000" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-1000 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            share
          </Dialog.Title>
          <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
            share
          </Dialog.Description>
          <div>


            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-blue focus:shadow-blue absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root> */}
            <div className={styles.RightSlot}>⌘+N</div>
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
