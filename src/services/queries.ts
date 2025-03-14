import {
  collection,
  getDocs,
  setDoc,
  doc,
  DocumentData,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export function getScores() {
  return new Promise<DocumentData[]>((resolve, reject) => {
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
        resolve(userData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function submitScore(name: string, score: number) {
  return setDoc(doc(db, "users"), { name, score });
}
