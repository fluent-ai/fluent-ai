import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const FLOW_FEATURE_KEY = 'flow';

export interface FlowEntity {
  id: number;
}
export interface FlowState extends EntityState<FlowEntity> {
  nodes: Node[];
  edges: Edge[];
  inputs: {
    id: string;
    nodeInputs: Record<string, unknown>;
  }[];
  isDialogOpen: boolean;
  activeDialog: string;
  activeNodeId: string;
}

export const flowAdapter = createEntityAdapter<FlowEntity>();

export const initialFlowState: FlowState = flowAdapter.getInitialState({
  nodes: [],
  edges: [],
  inputs: [],
  isDialogOpen: false,
  activeDialog: '',
  activeNodeId: '',
});

export const flowSlice = createSlice({
  name: FLOW_FEATURE_KEY,
  initialState: initialFlowState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      console.log('addNode', action.payload);
      state.nodes = [...state.nodes, action.payload];
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setInputs: (state, action: PayloadAction<FlowState['inputs']>) => {
      state.inputs = action.payload;
    },
    applyNodeChanges: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    applyEdgeChanges: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setActiveDialog: (state, action: PayloadAction<string>) => {
      state.activeDialog = action.payload;
    },
    setActiveNodeId: (state, action: PayloadAction<string>) => {
      state.activeNodeId = action.payload;
    },
  },
});

export const flowReducer = flowSlice.reducer;
export const flowActions = flowSlice.actions;
export const getFlowState = (rootState: any): FlowState =>
  rootState[FLOW_FEATURE_KEY];

const getEdges = createSelector(getFlowState, (state) => state.edges);
const getNodes = createSelector(getFlowState, (state) => state.nodes);
const getInputs = createSelector(getFlowState, (state) => state.inputs);
const isDialogOpen = createSelector(
  getFlowState,
  (state) => state?.isDialogOpen
);
const activeDialog = createSelector(
  getFlowState,
  (state) => state?.activeDialog
);
const activeNodeId = createSelector(
  getFlowState,
  (state) => state?.activeNodeId
);

export const flowSelectors = {
  getEdges,
  getNodes,
  getInputs,
  isDialogOpen,
  activeDialog,
  activeNodeId,
};
