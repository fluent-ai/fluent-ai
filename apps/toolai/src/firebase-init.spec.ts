/** * @jest-environment node */
import './firebase-init';
import * as firestoreService from '@libs/firestore-service';
import { Client } from '@libs/custom-types';
import * as mockData from '@libs/mock-data';

describe('Testing Firestore Functionality', () => {
  it('should write a document to a collection in firestore', async () => {
    expect(
      await firestoreService.writeToDB('testClients', mockData.client)
    ).toEqual(true);
    expect(
      await firestoreService.writeToDB('testClients', 'not an object')
    ).toEqual(false);
  });

  it('should read IDs from firestore', async () => {
    expect(
      (await firestoreService.getIDsFromDB('testClients')).length
    ).toBeGreaterThan(0);
    expect(
      (await firestoreService.getIDsFromDB('not-an-existing-collection')).length
    ).toEqual(0);
  });

  it('should read a whole collection from firestore', async () => {
    const collectionData: Client[] = await firestoreService.getAllFromDB(
      'testClients'
    );
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0]).toEqual(mockData.client);
  });

  // it('should retrieve selected documents from a firestore collection', async () => {
  //   const collectionData = await firestoreService.getAllFromDB('messages');
  //   expect(collectionData.length).toBeGreaterThan(0);
  //   expect(collectionData[0].original).toEqual('localTesting');
  // });
});
