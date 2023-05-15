// import {
//   fetchActiveTab,
//   activeTabAdapter,
//   activeTabReducer,
// } from './active-tab.slice';

// describe('activeTab reducer', () => {
//   it('should handle initial state', () => {
//     const expected = activeTabAdapter.getInitialState({
//       loadingStatus: 'not loaded',
//       error: null,
//     });

//     expect(activeTabReducer(undefined, { type: '' })).toEqual(expected);
//   });

//   it('should handle fetchActiveTabs', () => {
//     let state = activeTabReducer(undefined, fetchActiveTab.pending(null, null));

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loading',
//         error: null,
//         entities: {},
//       })
//     );

//     state = activeTabReducer(
//       state,
//       fetchActiveTab.fulfilled([{ id: 1 }], null, null)
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: 'loaded',
//         error: null,
//         entities: { 1: { id: 1 } },
//       })
//     );

//     state = activeTabReducer(
//       state,
//       fetchActiveTab.rejected(new Error('Uh oh'), null, null)
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
