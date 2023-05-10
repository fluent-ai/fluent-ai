import { getFirestore, WhereFilterOp, DocumentData } from 'firebase/firestore';
import { getDocs, collection, query, where } from 'firebase/firestore';

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
export async function getAllFromDB(
  collectionName: string
): Promise<DocumentData[]> {
  const db = getFirestore();
  const collectionData: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    collectionData.push(doc.data());
  });

  return collectionData;
}

// retrieve some data
export async function getSomeFromDB(
  collectionName: string,
  field: string,
  equalitySymbol: WhereFilterOp,
  criteria: string | boolean
): Promise<DocumentData[]> {
  const db = getFirestore();
  const collectionData: DocumentData[] = [];

  const q = query(
    collection(db, collectionName),
    where(field, equalitySymbol, criteria)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    collectionData.push(doc.data());
  });

  return collectionData;
}
