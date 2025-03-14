import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export function getScores() {
  return new Promise<DocumentData[]>((resolve, reject) => {
    console.log("querying firebase...");
    const userData: DocumentData[] = [];

    const q = query(
      collection(db, "users"),
      orderBy("score", "desc"),
      limit(10)
    );

    getDocs(q)
      .then((data) => {
        data.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log("done!");
        resolve(userData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
