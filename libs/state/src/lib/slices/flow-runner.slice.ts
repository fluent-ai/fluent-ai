import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FLOW_RUNNER_FEATURE_KEY = 'flowRunner';

export interface FlowRunnerEntity {
  id: number;
}
export interface FlowRunnerState extends EntityState<FlowRunnerEntity> {
  status: 'ready' | 'running' | 'error';
  inputs: {
    id: string;
    nodeInputs: Record<string, unknown>;
  }[];
  outputs: {
    id: string;
    nodeOutputs: Record<string, unknown>;
  }[];
  states: {
    id: string;
    state: Record<string, unknown>;
  }[];
}

export const flowRunnerAdapter = createEntityAdapter<FlowRunnerEntity>();

export const initialFlowRunnerState: FlowRunnerState =
  flowRunnerAdapter.getInitialState({
    status: 'ready',
    inputs: [],
    outputs: [],
    states: [],
  });

export const flowRunnerSlice = createSlice({
  name: FLOW_RUNNER_FEATURE_KEY,
  initialState: initialFlowRunnerState,
  reducers: {
    setStates: (
      state,
      action: PayloadAction<{ id: string; state: Record<string, unknown> }[]>
    ) => {
      state.states = action.payload;
      //if any state is running, set the status to running, otherwise set it to ready
      state.status = action.payload.some(
        (state) => state.state.status === 'running'
      )
        ? 'running'
        : 'ready';
    },
    setInputs: (
      state,
      action: PayloadAction<
        { id: string; nodeInputs: Record<string, unknown> }[]
      >
    ) => {
      state.inputs = action.payload;
    },
    setInput: (
      state,
      action: PayloadAction<{ id: string; nodeInputs: Record<string, unknown> }>
    ) => {
      console.log('👋 setInput Reducer', action);

      // if the input exists, update it, otherwise add it
      const input = state.inputs.find(
        (input) => input.id === action.payload.id
      );
      if (input) {
        input.nodeInputs = action.payload.nodeInputs;
      } else {
        state.inputs.push(action.payload);
      }
      console.log('👋 Proposed State', state);
    },
    setOutputs: (
      state,
      action: PayloadAction<
        {
          id: string;
          nodeOutputs: Record<string, unknown>;
        }[]
      >
    ) => {
      state.outputs = action.payload;
    },
  },
});

export const flowRunnerReducer = flowRunnerSlice.reducer;
export const flowRunnerActions = flowRunnerSlice.actions;
export const getFlowRunnerState = (rootState: any): FlowRunnerState =>
  rootState[FLOW_RUNNER_FEATURE_KEY];

const selectOutput = (id: string) =>
  createSelector(getFlowRunnerState, (state) =>
    state.outputs.find((output) => output.id === id)
  );

const selectOutputs = createSelector(
  getFlowRunnerState,
  (state) => state.outputs
);

const selectInput = (id: string) =>
  createSelector(getFlowRunnerState, (state) =>
    state.inputs.find((input) => input.id === id)
  );

const selectInputs = createSelector(
  getFlowRunnerState,
  (state) => state.inputs
);

const selectState = (id: string) =>
  createSelector(getFlowRunnerState, (state) =>
    state.states.find((state) => state.id === id)
  );

const selectStates = createSelector(
  getFlowRunnerState,
  (state) => state.states
);

const selectStatus = createSelector(
  getFlowRunnerState,
  (state) => state.status
);

export const flowRunnerSelectors = {
  selectOutput,
  selectOutputs,
  selectInput,
  selectInputs,
  selectState,
  selectStates,
  selectStatus,
};
