const fs = require('fs');
const Raml = require('../lib/laag-raml');
let data = fs.readFileSync('examples/example.raml', 'utf8');
doc = new Raml(data);

console.log(Object.keys(doc.getDefinition()));
console.log(`Displaying API: ${doc.title} v${doc.version}`);
console.log('Paths defined in this API:');
for (const pathname of doc.getPathNames()) {
    console.log(pathname);
}