# `laag-openapi`

This is a library to interface to Swagger/Openapi rest definition documents. If gives an interface to read and write those documents from within a Node or JS application.

## Usage

### Reading an existing document
```
const Openapi = require('laag-openapi');
let data = fs.readFileSync('examples/petstore-openapi3.json', 'utf8');
doc = new Openapi(data);

console.log(`Displaying API: ${doc.title} v${doc.version}`);
console.log('Paths defined in this API:);
for (const pathname in doc.getPathNames()) {
    console.log(pathname);
}

```
### Output
```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
/pets
/pets/{id}
```
