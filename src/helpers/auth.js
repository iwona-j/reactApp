import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, username) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((user) => saveUser(user, username));
}

export function logout () {
  return firebaseAuth().signOut();
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
    .then( (user) => {
      //TODO set some variable with user data
      console.log(user)
    });
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser (user, username) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      id: user.uid,
      username: username
    })
    .then(() => user);
}