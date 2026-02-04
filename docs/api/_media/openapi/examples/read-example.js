const fs = require('fs');
const Openapi = require('../lib/laag-openapi');
let data = fs.readFileSync('examples/petstore-openapi3.json', 'utf8');
doc = new Openapi(data);

console.log(`Displaying API: ${doc.title} v${doc.version}`);
console.log('Paths defined in this API:');
for (const pathname of doc.getPathNames()) {
    console.log(pathname);
}