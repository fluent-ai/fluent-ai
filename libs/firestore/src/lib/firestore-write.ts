import { getFirestore } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { getIDsFromDB } from './firestore-get';

// retrieve all data
export async function writeToDB(collectionName: string, document: any) {
  try {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, collectionName), document);
    console.log('Document written with ID: ', docRef.id);
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
    return false;
  }
}
