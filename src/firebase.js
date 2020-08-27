import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyCXZJx8LDrfWnSkeI_ht0GIgux3IsiK6l4",
	authDomain: "whatsapp-clone-cd16e.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-cd16e.firebaseio.com",

	projectId: "whatsapp-clone-cd16e",
	storageBucket: "whatsapp-clone-cd16e.appspot.com",
	messagingSenderId: "292668468824",
	appId: "1:292668468824:web:4cd00cced1d4a8e60c642d",
	measurementId: "G-DSTWYKDNW6",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
