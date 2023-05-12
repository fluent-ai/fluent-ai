import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { store, flowtabsActions, userActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';
import { TooltipProps } from '../../types';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
const TooltipComponent = (props: TooltipProps) => {
  const addNewFlowTab = () => {
    store.dispatch(flowtabsActions.setLoadingStatus('loading'));
    const sessionTabs = store.getState().flowtabs.tabs;

    // store new state in redux
    store.dispatch(
      flowtabsActions.addFlowTab({
        value: 'tab' + (sessionTabs.length + 1), // this will count the existing tabs and assign tab number according to exisiting count
        title: 'Flow ' + (sessionTabs.length + 1),
        colaborators: [
          {
            id: '1',
            name: 'John Doe',
            initials: 'JD',
          },
        ],
      })
    );

    // reflect new flow in user state
    const newFlow = {
      id: 'Flow ' + (sessionTabs.length + 1),
      owner: true,
      stringifiedFlowData: '',
    };
    store.dispatch(userActions.updateUserFlows(newFlow));
    const user = store.getState().user.userData;

    // update firestore
    firestoreService.updateFirestoreDocument('users', user.id, {
      flows: [...user.flows],
    });
    store.dispatch(flowtabsActions.setLoadingStatus('loaded'));
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <ButtonComponent
            type="button"
            ariaLabel="iconbutton"
            buttonContent={props.buttonContent}
            classes="icon"
            clickHandler={addNewFlowTab}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="border border-gray-200 shadow-md p-2 text-sm text-black bg-white rounded-lg select-none z-20"
            sideOffset={5}
          >
            {props.text}
            <Tooltip.Arrow className="text-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export { TooltipComponent };
