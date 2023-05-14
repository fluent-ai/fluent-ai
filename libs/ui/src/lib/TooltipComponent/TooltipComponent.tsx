import * as Tooltip from '@radix-ui/react-tooltip';
import { flowTabActions, store, userActions } from '@tool-ai/state';
import { TooltipProps } from '../../types';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
const TooltipComponent = (props: TooltipProps) => {
  const addNewFlowTab = () => {
    store.dispatch(userActions.setLoadingStatus('loading'));
    const userData = store.getState().user.userData;
    const sessionTabs = userData.flows;

    const flowTabIds = sessionTabs.map((tab) => Number(tab.id.slice(-1)));
    let newTabId = 0;
    for (let i = 1; i <= flowTabIds.length; i++) {
      if (i !== flowTabIds[i - 1]) {
        newTabId = i;
        break;
      }
      if (i === flowTabIds.length) {
        newTabId = i + 1;
      }
    }

    const newFlow = {
      id: userData.id + '-' + newTabId, // this will count the existing tabs and assign tab number according to exisiting count
      title: 'Flow ' + newTabId,
      owner: true,
      stringifiedNodes: '[]',
      stringifiedEdges: '[]',
      colaborators: [],
    };
    // store new state in redux
    store.dispatch(userActions.updateUserFlows(newFlow));
    store.dispatch(
      flowTabActions.addNewFlowTab({ id: newFlow.id, nodes: [], edges: [] })
    );

    // update firestore
    // firestoreService.updateFirestoreDocument('users', user.id, {
    //   flows: [...user.flows],
    // });
    store.dispatch(userActions.setLoadingStatus('loaded'));
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {/* <button
          type="button"
          className="icon"
          aria-label="iconbutton"
          onClick={addNewFlowTab}
          >
          {props.buttonContent}
          </button> */}
          <ButtonComponent
            type="button"
            ariaLabel="iconbutton"
            buttonContent={props.buttonContent}
            classes="icon"
            clickHandler={props.name === 'add-flow' ? addNewFlowTab : undefined}
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
