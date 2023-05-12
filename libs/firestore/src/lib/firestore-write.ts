import {
  getFirestore,
  DocumentData,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getSomeFromDB, getSomeIDsFromDB } from './firestore-get';

export async function writeToDB(collectionName: string, document: any) {
  try {
    const db = getFirestore();
    // TODO: check type of document

    // IF client: check if email exists
    const existingDocs: DocumentData[] = await getSomeFromDB(
      collectionName,
      'id',
      '==',
      document.id
    );
    if (existingDocs.length > 0) {
      console.error('user already exists');
      return false;
    }
    await setDoc(doc(db, collectionName, document.id), document);
    console.log('Document written with ID: ', document.id);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}

export async function updateFirestoreDocument(
  collectionName: string,
  Id: string,
  updateProperties: any
) {
  try {
    const db = getFirestore();
    await updateDoc(doc(db, collectionName, Id), updateProperties);

    console.log('Document updated with ID: ', Id);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}
