import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';

//import our credentials (serviceAccount)
import serviceAccount from './serviceAccount.js'

//connect to our firebase project using those credentials
initializeApp({
    credential: cert(serviceAccount)
})

//connect to firestore database
const db = getFirestore();

//define a new video game
const newGame = {
    title: 'Frogger',
    rate: 'E',
    genre: 'Arcade',
    released: 1981,
}

//create a doc inside a collection
db.collection('games').add(newGame)
    //if ok console.log doc id
    .then(doc => console.log('Game created: ', doc.id))
    //else console the error
    .catch(console.error)

//get all games
db.collection('games').get()
    //reshape the collection
    .then(collection => {
        collection.docs.forEach(doc => {
            console.log(doc.id, doc.data())
        })
    })
    .catch(console.error)

//set id to 'frogger'. Wouldn't add new line each time, only update doc with id of 'frogger'
// db.collection('games').doc('frogger').set(newGame)

//update any doc where title is frogger
// db.collection('games').where('title', '==', 'Frogger').update({released: 1982})

// db.collection('games').where('title', '==', 'Dead Island 2').delete()
