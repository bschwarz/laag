const Raml = require('../lib/laag-raml');

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
