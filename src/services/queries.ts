import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type FBUserDoc = {
  name: string;
  score: number;
  round: number;
};

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

export function getRounds() {
  return new Promise<DocumentData[]>((resolve, reject) => {
    const userData: DocumentData[] = [];

    const q = query(
      collection(db, "users"),
      orderBy("round", "desc"),
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

export function submitScore(user: FBUserDoc) {
  return addDoc(collection(db, "users"), {
    name: user.name,
    score: user.score,
    round: user.round,
  });
}
