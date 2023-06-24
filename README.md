# MongoDB_ReactNative_Authentication
<blockquote class="imgur-embed-pub" lang="en" data-id="a/r3urqZ8"><a href="//imgur.com/r3urqZ8"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

A authentication app made on react-native , mongodb and express to signup and login user with email and password (Google signin underway)</br>
To run Clone this repo :
```
git clone https://github.com/rishavmukherjeee/MongoDB_ReactNative_Authentication.git
```
</br>Add a .env file like this in the root directory (i.e where the App.js and others are present)
```
MONGO_CONNECTION_STRING=XXXX
BASE_URL=http://XXXX:3000
```
Replace XXX with mongo string and your pc ipv4 adress
</br>To check the ip search cmd and paste
```
ipconfig
```
</br>Open the terminal and type to install the app in mobile:
```
yarn install &&
yarn start
```
</br>Open the server directory and run the server
```
cd server &&
node server.js
```
