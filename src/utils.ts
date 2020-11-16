import firebase from "firebase";

export function getUid() {
  const user = firebase.auth().currentUser
  if (!user ) {
    return null
  }
  return user.uid;
}
