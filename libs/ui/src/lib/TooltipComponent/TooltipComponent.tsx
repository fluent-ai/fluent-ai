import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { store, userActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';
import { TooltipProps } from '../../types';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
const TooltipComponent = (props: TooltipProps) => {
  const addNewFlowTab = () => {
    store.dispatch(userActions.setLoadingStatus('loading'));
    const sessionTabs = store.getState().user.userData.flows;

    // store new state in redux
    store.dispatch(
      userActions.updateUserFlows({
        id: 'tab' + (sessionTabs.length + 1), // this will count the existing tabs and assign tab number according to exisiting count
        title: 'Flow ' + (sessionTabs.length + 1),
        owner: true,
        stringifiedFlowData: '',
        colaborators: [
          {
            id: '1',
            name: 'John Doe',
            initials: 'JD',
          },
        ],
      })
    );

    const user = store.getState().user.userData;

    // update firestore
    firestoreService.updateFirestoreDocument('users', user.id, {
      flows: [...user.flows],
    });
    store.dispatch(userActions.setLoadingStatus('loaded'));
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
