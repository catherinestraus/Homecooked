import firebase from "firebase";

export function getUid() {
  return firebase.auth().currentUser.uid;
}
