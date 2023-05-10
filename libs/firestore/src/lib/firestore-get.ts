import { getFirestore } from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';

// retrieve IDs
export async function getIDsFromDB(collectionName: string): Promise<string[]> {
  const db = getFirestore();
  const IDs: string[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    IDs.push(doc.id);
  });
  return IDs;
}

// retrieve all data
export async function getAllFromDB(collectionName: string): Promise<any[]> {
  const db = getFirestore();
  const collectionData: any[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    collectionData.push(doc.data());
  });

  return collectionData;
}

// retrieve some data
export async function getSomeFromDB(collectionName: string): Promise<any[]> {
  const db = getFirestore();
  const collectionData: any[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    collectionData.push(doc.data());
  });

  return collectionData;
}
