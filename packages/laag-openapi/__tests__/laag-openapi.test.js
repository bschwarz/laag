'use strict';

// const openapi = require('..');
const fs = require('fs');
const { getMaxListeners } = require('process');
const openapi = require('../lib/laag-openapi.js');

let doc = null;
let docNew = null;

beforeAll(() => {
    let data = fs.readFileSync('examples/petstore-openapi3.json', 'utf8');
    doc = new openapi.Openapi(data);
    docNew = new openapi.Openapi();
});

//
// openapi3 title and version are required under info object, so should
// be at least 2
//

//
// Test getting from existing doc
//
test('Get Definition doc in JS', () => {
    expect(doc.getDefinition().info.title).toBe('Swagger Petstore');
});
test('Get Definition doc in JSON', () => {
    expect(JSON.parse(doc.getDefinition('json')).info.title).toBe('Swagger Petstore');
});
test('Get Definition doc in Pretty JSON', () => {
    expect(JSON.parse(doc.getDefinition('prettyjson')).info.title).toBe('Swagger Petstore');
});
test('Check if dictKeysExists works', () => {
    expect(doc.dictKeysExists(doc.paths,'/pets', 'get')).toBe(true);
});


//
// Test building doc
//
test('Set/Get document version', () => {
    docNew.docVersion = '3.0.0';
    console.log(docNew.getDefinition('prettyjson'));
    expect(docNew.docVersion).toBe('3.0.0');
});
test('Set root level extension', () => {
    let x = {};
    x['x-ext1'] = 'ext1';
    x['x-ext2'] = 'ext2';
    docNew.rootExtensions = x;
    console.log('ROOT LEVEL');
    console.log(docNew.getDefinition('prettyjson'));
    expect(Object.keys(docNew.rootExtensions).length).toBe(2);
});
test('Append root level extension', () => {
    docNew.appendRootExtension('x-another-root', 'value for other root');
    expect(Object.keys(docNew.rootExtensions).length).toBe(3);
});
test('Set info level extension', () => {
    let x = {};
    let y = {};
    x['x-ext1'] = 'ext1';
    docNew.infoExtensions = x;
    y['x-ext2'] = 'ext2';
    y['x-ext3'] = 'ext3';
    docNew.infoExtensions = y;
    console.log('INFO LEVEL');
    console.log(docNew.getDefinition('prettyjson'));
    expect(Object.keys(docNew.infoExtensions).length).toBe(2);
});
test('Append info level extension', () => {
    let y = {};
    y['x-ext2'] = 'ext2';
    docNew.infoExtensions = y;
    docNew.appendInfoExtension('x-another-root', 'value for other root');
    expect(Object.keys(docNew.infoExtensions).length).toBe(2);
});
test('Set info object', () => {
    let x = {title: 'this is a title', version: '1.0.0', junk: 'this is junk'};
    x['x-custom-info'] = 'custom';
    docNew.info = x;
    console.log(docNew.getDefinition('prettyjson'));
    expect(Object.keys(docNew.info).length).toBe(3);
});
test('Set Title of the Openapi Definition', () => {
    docNew.title = 'A New Title';
    expect(docNew.title).toBe('A New Title');
});
test('Set Version of the Openapi Definition', () => {
    docNew.version = '1.0.0';
    expect(docNew.version).toBe('1.0.0');
});
test('Set Description of the Openapi Definition', () => {
    docNew.description = 'this is a description';
    expect(docNew.description).toBe('this is a description');
});
test('Set/Get Terms Of Service of the Openapi Definition', () => {
    docNew.termsOfService = 'this is the terms';
    expect(docNew.termsOfService).toBe('this is the terms');
});

test('Set/Get Contact Object of the Openapi Definition', () => {
    let x = {};
    x['name'] = 'brett';
    x['url'] = 'google.com';
    x['email'] = 'b@gmail.com';
    x['x-custom'] = 'custom contact';
    x['junk'] = 'junk';
    docNew.contact = x;
    expect(Object.keys(docNew.contact).length).toBe(4);
});
test('Set/Get License Object of the Openapi Definition', () => {
    let x = {};
    x['name'] = 'brett';
    x['url'] = 'google.com';
    x['x-custom'] = 'custom contact';
    x['junk'] = 'junk';
    docNew.license = x;
    expect(Object.keys(docNew.license).length).toBe(3);
});
test('Set/Get Servers Object of the Openapi Definition', () => {
    let x = {};
    let arr = [];
    x.description = 'my url';
    x.url = 'google.com';
    x['x-custom'] = 'custom contact';
    x.junk = 'junk';
    arr.push(x);
    docNew.servers = arr;
    console.log(docNew.getDefinition('prettyjson'));
    expect(docNew.servers.length).toBe(1);
});
test('Set paths level extension', () => {
    let x = {};
    let y = {};
    x['x-ext1'] = 'ext1';
    docNew.pathsExtensions = x;
    y['x-ext-paths2'] = 'ext2';
    y['x-ext-path3'] = 'ext3';
    docNew.pathsExtensions = y;
    console.log('PATHS LEVEL');
    console.log(docNew.getDefinition('prettyjson'));
    expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
});
test('Append paths level extension', () => {
    let y = {};
    y['x-ext2'] = 'ext2';
    docNew.pathsExtensions = y;
    docNew.appendPathsExtension('x-another-paths', 'value for other paths');
    expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
    console.log(docNew.getPathNames());
});
test('Get all unique HTTP methods across all operations', () => {
    console.log(doc.getAllHttpMethods());
    expect(doc.getAllHttpMethods().length).toBe(3);
});
test('Get all status codes for an operation', () => {
    console.log(doc.getStatusCodes('/pets', 'get'));
    expect(doc.getStatusCodes('/pets', 'get').length).toBe(1);
});