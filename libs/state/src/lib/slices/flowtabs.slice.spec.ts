import {
  fetchFlowtabs,
  flowtabsAdapter,
  flowtabsReducer,
} from './flowtabs.slice';

describe('flowtabs reducer', () => {
  it('should handle initial state', () => {
    const expected = flowtabsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(flowtabsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchFlowtabss', () => {
    let state = flowtabsReducer(undefined, fetchFlowtabs.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = flowtabsReducer(
      state,
      fetchFlowtabs.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = flowtabsReducer(
      state,
      fetchFlowtabs.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
