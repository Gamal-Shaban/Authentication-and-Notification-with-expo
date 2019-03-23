
const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('contacts/{id}').onCreate(event => {

    const root = event.data.ref.root
    console.log('root', root)
    var messages = []

    //return the main promise
    return root.child('/users').once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var expoToken = childSnapshot.val().expoPushToken

            if (expoToken) {

                messages.push({
                    "to": expoToken,
                    "body": "New Note Added"
                })
            }
        })

        return Promise.all(messages)

    }).then(messages => {

        return fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })
    })

})