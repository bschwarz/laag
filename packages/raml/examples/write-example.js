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
doc.contact = {name: 'Brett', email: 'abc@compay.com'};
doc.servers = [{url: 'some.url.com', description: 'This is the main URL to hit the API with'}];
doc.rootExtensions = {'x-my-custom-extension': 'My Value'};
//
// add a path (Note: this is just a partial path definition)
//
const path = {'get': {description: 'This fetches myresource', operationId: 'getMyresource', responses: {'200': {description: 'Success'}}}};
doc.appendPath('/myresounce', path);

console.log(doc.getDefinition('prettyjson'));
