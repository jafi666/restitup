# **API Framework Automation**

Herramienta de automatizacion de aplicacion REST para el Diplomado de Control de Calida de Software Comercial

## Framework name

> restitup

## **Node Version**

> ~10.15.3

## **NPM version**

> ~6.4.1

## **Installation**

> npm install restitup

## **Usage**

---

Version all by default

```js
const Service = require('restitup');
Service.Start();

```

## **Streaming Usage**

---

```js
const gulp = require('gulp');
const Service = require('restitup');
const options = {
  apiUrl: 'https://api.schoology.com',
  rootPath: '/v1',
  headers: {
    'Content-Type': 'application/json',
    'Host': 'api.schoology.com'
  },
  authorization: {
    strategy: 'oauth1',
    oauth1: {
      consumerKey: 'e993008d7985640358536211ff3bc0a305ca417d2',
      consumerSecret: '1f7f14cd28427f19f31da1e8de7ba01d'
    }
  },
  endpointsPath: 'lib/objects'
};

gulp.task('restitup', 'Initializes Restitup module', function() {
  gulp.src('')
    .pipe(Service.Gulp(options));
});
```

## **Service.Start(options) / Service.Gulp(options)**

---

The options argument is an object, whe all paramters are optional as the framework has default values for all of them.

* `apiUrl` - the endpoint url base required to access the API, default `http://localhost`
* `rootPath` - is the api root path, add this option with empty estring to ignore, default `/api`
* `headers` - add here all the headers by default that all endpoint object will apply, it needs to be an object, defaults to `{}`
* `authorization` - it must be have two attributes `strategy` and `oauth1 || basic || bearer`, defaults to `{strategy: 'none'}`
* `endpointsPath` - the location path for all the endpoint object files, defaults to `endpointsPath: 'src/endpoint-objects'`, the folder must exist.
* `logger` - the logger configuration, it responses to [log4js](https://www.npmjs.com/package/log4js) module

All options by default

```js
{
  apiUrl: 'http://localhost',
  rootPath: '/api',
  headers: {},
  authorization: {
    strategy: 'none',
    oauth1: {
      consumerKey: '',
      consumerSecret: '',
      oauthToken: '',
      oauthTokenSecret: '',
      requestUrl: '',
      accessUrl: '',
      version: '1.0',
      authorizeCallback: '',
      signatureMethod: 'HMAC-SHA1',
    },
    basic: {
      username: '',
      password: ''
    },
    bearer: {
      token: ''
    }
  },
  endpointsPath: 'src/endpoint-objects',
  logger: {
    type: 'RESTITUP'
  }
}
```

## **How to initiate an endpoint object**

---

```js
$Endpoint({ 
  object: 'Group',
  resourceUri: '/groups'
});
module.exports = class Group {
  
};
```

## **Using an Endpoint**

---

```js
const Service = require('restitup');
const options = {
  apiUrl: 'https://api.schoology.com',
  rootPath: '/v1',
  headers: {
    'Content-Type': 'application/json',
    'Host': 'api.schoology.com'
  },
  authorization: {
    strategy: 'oauth1',
    oauth1: {
      consumerKey: 'e993008d7985640358536211ff3bc0a305ca417d2',
      consumerSecret: '1f7f14cd28427f19f31da1e8de7ba01d'
    }
  },
  endpointsPath: 'lib/objects'
}
Service.Start();

const { Restitup } = Service;
const { $HttpStatus, $asyncSpec } = Restitup.modules

const postGroup1 = {
  title: 'API Group 1 - ' + Date.now(),
  description: 'testing api group 1 '+ Date.now(),
  'privacy_level': 'everyone',
  admin: 1
};

const {statusCode, data} = await Restitup.Group.post(postGroup1);

// statusCode must be 201
// data must be the new Schoology Group
```

## **License**
---

This is a Jalasoft product, the license is free to use.
