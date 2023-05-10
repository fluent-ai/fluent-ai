import { getFirestore, WhereFilterOp } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { getIDsFromDB, getSomeFromDB } from './firestore-get';

export async function deleteDocuments(
  collectionName: string,
  field: string,
  equalitySymbol: WhereFilterOp,
  criteria: string
) {
  try {
    await getSomeFromDB(collectionName, field, equalitySymbol, criteria).then(
      (entries) => {
        const db = getFirestore();
        entries.forEach(async (data) => {
          await deleteDoc(doc(db, collectionName, data['id']));
        });
      }
    );
    console.log('successfully deleted collection: ', collectionName);

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
