An Ionic project V4 example using Firebase database realtime.

Stack:

- Node.js 10+
- Ionic 4
- Cordova 9

# Setup Firebase

[Go to the Console Firebase](https://console.firebase.google.com) and log in using your google account.

Click CREATE NEW PROJECT button, name it as you like and choose your country. Finally, click CREATE PROJECT button.

Go to Develop menu then choose Database and click Get Started button. Click RULES tab then edit to make your database writable and readable for everyone then click `PUBLISH` button.

## Setup the project

Go to the environment.ts and put your configurations from your project in Firebase.

## Running project

Install the node_modules

```
npm install
```

Now run in your device or in emulator:

```
ionic cordova run android
```
