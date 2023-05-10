/** * @jest-environment node */
import './firebase-init';
import * as firestoreService from '@libs/firestore-service';

describe('Testing Firestore Functionality', () => {
  it('should read IDs from firestore', async () => {
    expect(
      (await firestoreService.getIDsFromDB('messages')).length
    ).toBeGreaterThan(0);

    expect(
      (await firestoreService.getIDsFromDB('not-an-existing-collection')).length
    ).toEqual(0);
  });

  it('should read a whole collection from firestore', async () => {
    const collectionData = await firestoreService.getAllFromDB('messages');
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0].original).toEqual('localTesting');
  });

  it('should write a document to a collection in firestore', async () => {
    expect(
      await firestoreService.writeToDB('messages', {
        original: 'localTesting',
      })
    ).toEqual(true);

    expect(
      await firestoreService.writeToDB('messages', 'not an object')
    ).toEqual(false);

    expect(
      await firestoreService.writeToDB('ot-an-existing-collection', {
        original: 'localTesting',
      })
    ).toEqual(true);

    expect(
      await firestoreService.deleteCollection('not-an-existing-collection')
    ).toEqual(true);
  });
});
