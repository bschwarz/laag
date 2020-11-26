# `@laag/openapi`

This is a library to interface to [RAML](https://raml.org/) rest definition documents. If gives an interface to read and write those documents from within a Node or JS application. This interface will follow the same interface as the [@laag/openapi](https://github.com/bschwarz/laag/tree/main/packages/openapi) interface.

## Install
```
npm i @laag/openapi --save
```
## Usage

### Reading an existing document
#### Source Code
```
const Raml = require('@laag/raml');
let data = fs.readFileSync('examples/example.raml', 'utf8');
doc = new Raml(data);

console.log(`Displaying API: ${doc.title} v${doc.version}`);
console.log('Paths defined in this API:');
for (const pathname of doc.getPathNames()) {
    console.log(pathname);
}
```
#### Output
```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
/pets
/pets/{id}
```

### Writing a new document
#### Source Code
```
const Raml = require('@laag/raml');

//
// Create empty doc
//
const doc = new Raml();

//
// Set some general properties
//
doc.title = "My Awesome API";
doc.version = "1.0.0";
doc.description = "This is just an API to showcase laag";
doc.contact = {name: 'Brett', email: 'abc@compay.com'};
doc.servers = [{url: 'some.url.com', description: 'This is the main URL to hit the API with'}];
doc.rootExtensions = {'x-my-custom-extension': 'My Value'};
//
// add a path (Note: this is just a partial path definition)
//
const path = {'get': {description: 'This fetches myresource', operationId: 'getMyresource', responses: {'200': {description: 'Success'}}}};
doc.appendPath('/myresounce', path);

console.log(doc.getDefinition('prettyjson'));
```

#### Output
```
{
  "openapi": "3.0.2",
  "info": {
    "title": "My Awesome API",
    "version": "1.0.0",
    "description": "This is just an API to showcase laag",
    "contact": {
      "name": "Brett",
      "email": "abc@compay.com"
    }
  },
  "paths": {
    "/myresounce": {
      "get": {
        "description": "This fetches myresource",
        "operationId": "getMyresource",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  },
  "servers": [
    {
      "url": "some.url.com",
      "description": "This is the main URL to hit the API with"
    }
  ],
  "x-my-custom-extension": "My Value"
}
```