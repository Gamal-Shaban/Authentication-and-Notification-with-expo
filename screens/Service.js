import { Permissions, Notifications } from 'expo'
import * as firebase from 'firebase'


const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()
      console.log('NOTIFICATIONS>>>', token)
      let uid = firebase.auth().currentUser.uid
      firebase.database().ref("users").child(uid).update({
        expoPushToken: token
      })
}
export default  registerForPushNotificationsAsync 
