const { Openapi } = require('@laag/openapi');
const yaml = require('js-yaml')
const fs = require('fs')

var args = process.argv.slice(2);

if (args.length != 1) {
    console.log('Usage: node index.js <path-to-openapi-file>');
    process.exit(1);
}
let fname = args[0];

// let outputfile = 'output.json'
let jsonObj = yaml.load(fs.readFileSync(fname, 'utf8'));
// this code if you want to save
// fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));

// let data = fs.readFileSync(jsonObj, 'utf8');

// const newStr = str.replace(/^#/, "");
doc = new Openapi(jsonObj);

console.log(`Displaying API: ${doc.title} v${doc.version}`);
console.log('Paths defined in this API:');
// for (const pathname of doc.getPathNames()) {
//     console.log(pathname);
// }

let summary = doc.getOperationSummary()
for (const R of summary) {
    console.log(`${R.method.toUpperCase()} ${R.resource}`)
}
// console.log(summary)