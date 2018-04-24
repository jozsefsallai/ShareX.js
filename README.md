# ShareX.js

[![Build Status](https://travis-ci.org/jozsefsallai/ShareX.js.svg?branch=master)](https://travis-ci.org/jozsefsallai/ShareX.js)

Using this simple JavaScript app you will be able to upload your ShareX screenshots to your own host. 

You can use this app as a standalone service on your server but you can also copy parts of it to include it in your other projects.

This project is not affiliated or endorsed by ShareX.

## Requirements

 * A web server
 * Node v8+

## Installation

1. Clone this repository:

```
git clone git@github.com:jozsefsallai/ShareX.js
```

2. Install the Node.js modules:

```
npm i -g yarn
yarn
```

## Configuration

The configuration file is available in `src/config.json`. It is very important to edit the configuration file before running the app.

The configuration file looks like this:

```json
{
  "app": {
    "port": 7125,
    "savedir": "i",
    "domain": "YOUR_DOMAIN",
    "key": "YOUR_PRIVATE_KEY",
    "allowedExtensions": [
      "png",
      "jpg",
      "jpeg",
      "gif"
    ],
    "nameLength": 10
  }
}
```

 * **app.port** - the port on which the app will listen.
 * **app.savedir** - the name of the directory in which the uploaded images will be available. In this case, it would be *YOUR_DOMAIN/i/* (the trailing slash is not required here).
 * **app.domain** - the domain name of the app.
 * **app.key** - if you want to set up a secret key to use in ShareX, you can paste it here. Using a secret key is recommended when you don't want anyone to upload images to your server using ShareX. This key can be of any length and complexity as long as it matches the ShareX settings. If you don't want a key, just set it to `null` (without quotation marks).
 * **app.allowedExtensions** - an array of all the file extensions that are good to be uploaded to the server.
 * **app.nameLength** - the length of the uploaded random file names (without the extension).

## ShareX Configuration

In order to configure the custom uploader in ShareX, go to **Destinations -> Destination settings...** and scroll all the way down to **Custom uploaders**. 

Check the following screenshot for the ShareX configuration:

![ShareX custom uploader configuration](https://i.imgur.com/oOzh5NK.png)

(Open in new tab: https://i.imgur.com/oOzh5NK.png)

## Run

To start the app, simply run

```
node .
```

If you want to run it forever, use tools like **pm2** or **forever**. I personally recommend **pm2**.

```
npm i -g pm2
pm2 start index.js
```
