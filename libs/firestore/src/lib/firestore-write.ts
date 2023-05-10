import { getFirestore } from 'firebase/firestore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getIDsFromDB } from './firestore-get';

export async function writeToDB(collectionName: string, document: any) {
  // check if exists
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
