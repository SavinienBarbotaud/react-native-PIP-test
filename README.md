# Example app for apiRTC-React-native

## Build app
```
npm install
```

## Launch react-native app on android sim : 
```
npm run android
```
### Error android sdk not found
Then download SDK and lauch app with

```
ANDROID_HOME=/your/path/to/Sdk npm run android
```

For example : 

```
ANDROID_HOME=/home/savinien/Android/Sdk npm run android
```

### Build apiRTC lib for react-native : 
```
grunt build-react-native
```

### Error : Number of file watchers reached

- On file : ```/etc/sysctl.conf```, add 

```
fs.inotify.max_user_watches=524288
```

- save, exit and 

```
sudo sysctl -p
```

 to ckeck

OR

- delete ```node_modules``` repo and then

```
npm install
```


## Launch react-native app on iOS sim :

[Check here](./README-IOS.md)
