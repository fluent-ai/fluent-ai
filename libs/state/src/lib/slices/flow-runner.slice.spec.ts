// import {
//   fetchFlowRunner,
//   flowRunnerAdapter,
//   flowRunnerReducer,
// } from './flow-runner.slice';

// describe('flowRunner reducer', () => {
//   it('should handle initial state', () => {
//     const expected = flowRunnerAdapter.getInitialState({
//       loadingStatus: 'not loaded',
//       error: null,
//     });

//     expect(flowRunnerReducer(undefined, { type: '' })).toEqual(expected);
//   });

//   it('should handle fetchFlowRunners', () => {
//     let state = flowRunnerReducer(
//       undefined,
//       fetchFlowRunner.pending(null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loading',
//         error: null,
//         entities: {},
//       })
//     );

//     state = flowRunnerReducer(
//       state,
//       fetchFlowRunner.fulfilled([{ id: 1 }], null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loaded',
//         error: null,
//         entities: { 1: { id: 1 } },
//       })
//     );

//     state = flowRunnerReducer(
//       state,
//       fetchFlowRunner.rejected(new Error('Uh oh'), null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'error',
//         error: 'Uh oh',
//         entities: { 1: { id: 1 } },
//       })
//     );
//   });
// });
