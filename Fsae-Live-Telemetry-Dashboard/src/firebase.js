import firebase from "firebase";

const config = {
	apiKey: "AIzaSyDIvxaO0abmVyxwo1UNOsKYuYC8GbMXLmY",
	authDomain: "fsae-live-telemetry.firebaseapp.com",
	databaseURL: "https://fsae-live-telemetry-default-rtdb.firebaseio.com",
	projectId: "fsae-live-telemetry",
	storageBucket: "fsae-live-telemetry.appspot.com",
	messagingSenderId: "227430928623",
	appId: "1:227430928623:web:a32c2e3203050db3f28b1a",
	measurementId: "G-VWQBZ74HB6",
};

firebase.initializeApp(config);
export default firebase;
