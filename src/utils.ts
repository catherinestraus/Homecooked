import firebase from "firebase";

export function getUid() {
  const user = firebase.auth().currentUser
  if (!user ) {
    return null
  }
  return user.uid;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
