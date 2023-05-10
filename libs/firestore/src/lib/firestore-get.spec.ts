import { getIDsFromDB } from './firestore-get';

describe('firestore', () => {
  it('should retrieve IDs from the message collection', () => {
    expect(getIDsFromDB('messages'));
  });
});
