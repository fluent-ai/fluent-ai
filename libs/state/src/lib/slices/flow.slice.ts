import { v4 as uuidv4 } from 'uuid';
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

export interface Flow {
  id: string;
  displayName: string;
  nodes: Node[];
  edges: Edge[];
  inputs: {
    id: string;
    nodeInputs: Record<string, unknown>;
  }[];
}
export interface FlowState extends Flow {
  isDialogOpen: boolean;
  activeDialog: string;
  activeNodeId: string;
}

export const flowAdapter = createEntityAdapter<FlowEntity>();

export const initialFlowState: FlowState = flowAdapter.getInitialState({
  id: uuidv4(),
  displayName: 'My Flow',
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
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes = [...state.nodes, action.payload];
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setInputs: (state, action: PayloadAction<FlowState['inputs']>) => {
      state.inputs = action.payload;
    },
    setFlow: (state, action: PayloadAction<Flow>) => {
      state.id = action.payload.id;
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
      state.inputs = action.payload.inputs;
    },
    newFlow: (state) => {
      state.id = uuidv4();
      state.displayName = 'My Flow';
      state.nodes = [];
      state.edges = [];
      state.inputs = [];
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

const getId = createSelector(getFlowState, (state) => state.id);
const getEdges = createSelector(getFlowState, (state) => state.edges);
const getNodes = createSelector(getFlowState, (state) => state.nodes);
const getInputs = createSelector(getFlowState, (state) => state.inputs);
const getFlow = createSelector(getFlowState, (state) => ({
  id: state.id,
  displayName: state.displayName,
  nodes: state.nodes,
  edges: state.edges,
  inputs: state.inputs,
}));
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
  getId,
  getEdges,
  getNodes,
  getInputs,
  getFlow,
  isDialogOpen,
  activeDialog,
  activeNodeId,
};
