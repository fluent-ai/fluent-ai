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
  document: any,
  updateProperties: any
) {
  try {
    const db = getFirestore();
    // TODO: check type of document

    // IF client: check if email exists
    const existingIds: string[] = await getSomeIDsFromDB(
      collectionName,
      'email',
      '==',
      document.email
    );
    console.log(existingIds);

    if (existingIds.length === 0) {
      console.error(`document does't exist and cannot be updated`);
      return false;
    }
    const existingDocRef = doc(db, collectionName, existingIds[0]);
    await updateDoc(existingDocRef, updateProperties);

    console.log('Document updated with ID: ', existingIds[0]);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}
