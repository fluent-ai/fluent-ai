/** * @jest-environment node */
import './firebase-init';
import * as firestoreService from '@libs/firestore-service';
import { Client } from '@libs/custom-types';
import * as mockData from '@libs/mock-data';

describe('Testing Firestore Functionality', () => {
  const testCollectionClients = 'testClients';
  it('should write a document to a collection in firestore', async () => {
    expect(
      await firestoreService.writeToDB(testCollectionClients, mockData.client)
    ).toEqual(true);
    expect(
      await firestoreService.writeToDB(testCollectionClients, 'not an object')
    ).toEqual(false);
  });

  it('should read IDs from firestore', async () => {
    expect(
      (await firestoreService.getIDsFromDB(testCollectionClients)).length
    ).toBeGreaterThan(0);
    expect(
      (await firestoreService.getIDsFromDB('not-an-existing-collection')).length
    ).toEqual(0);
  });

  it('should read a whole collection from firestore', async () => {
    const collectionData: Client[] = (await firestoreService.getAllFromDB(
      testCollectionClients
    )) as Client[];
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0]).toEqual(mockData.client);
  });

  it('should retrieve selected documents from a firestore collection', async () => {
    const collectionData: Client[] = (await firestoreService.getSomeFromDB(
      testCollectionClients,
      'name',
      '==',
      mockData.client.name
    )) as Client[];
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0]).toEqual(mockData.client);
  });
});
