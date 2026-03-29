# `@laag/raml`

This is a library to interface to [RAML](https://raml.org/) rest definition documents. If gives an interface to read and write those documents from within a Node or JS application. This interface will follow the same interface as the [@laag/openapi](https://github.com/bschwarz/laag/tree/main/packages/openapi) interface.

## Install

```
npm i @laag/raml --save
```

## Usage

### Reading an existing document

#### Source Code

```
const Raml = require('@laag/raml');
const fs = require('fs');
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
Displaying API: API with Examples vnull
Paths defined in this API:
/documents
/organisation
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
doc.baseUri = 'https://somewhere.com/myapi/v1';
doc.protocols = ['http', 'https'];
doc.rootExtensions = {myannontation: 'My Value'};
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
  "title": "My Awesome API",
  "version": "1.0.0",
  "description": "This is just an API to showcase laag",
  "baseUri": "https://somewhere.com/myapi/v1",
  "protocols": [
    "http",
    "https"
  ],
  "(myannontation)": "My Value",
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
}
```
