import 'firebase/auth'
import firebase from 'firebase/app'
import firebaseConfig from '../config/firebaseConfig.json'
import "firebase/storage"

let _app = null
const getApp = () => {
  if (_app) return _app
  if (firebase.apps.length > 0) {
    return (_app = firebase.app())
  } else {
    _app = firebase.initializeApp(firebaseConfig)
    return _app
  }
}
export const getAuth = () => {
  return getApp().auth()
}
export const signIn = () => {
  return firebase.auth().signInAnonymously()
}
export const signOut = () => {
  return firebase.auth().signOut()
}

export const getFirebase = () => {
  return firebase
}

export const getStorage = () => {
  return firebase.storage();
}

export const downloadImage = (name) => {
  return getStorage().ref()
    .child("images"+name)
    .getDownloadURL()
}