import {
  getFirestore,
  WhereFilterOp,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getIDsFromDB, getSomeIDsFromDB } from './firestore-get';

export async function deleteDocuments(
  collectionName: string,
  field: string,
  equalitySymbol: WhereFilterOp,
  criteria: string
) {
  try {
    const IDs = await getSomeIDsFromDB(
      collectionName,
      field,
      equalitySymbol,
      criteria
    );
    if (IDs.length === 0) {
      console.error(`document doens't exist and cannot be deleted`);
      return false;
    }
    const db = getFirestore();
    IDs.forEach(async (id) => {
      await deleteDoc(doc(db, collectionName, id));
    });
    console.log('successfully deleted documents with IDs: ', IDs);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deleteCollection(
  collectionName: string
): Promise<boolean> {
  try {
    await getIDsFromDB(collectionName).then((ids) => {
      const db = getFirestore();
      ids.forEach(async (id) => {
        await deleteDoc(doc(db, collectionName, id));
      });
    });
    console.log('successfully deleted collection: ', collectionName);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
