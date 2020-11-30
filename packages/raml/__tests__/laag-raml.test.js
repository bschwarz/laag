'use strict';

const fs = require('fs');
const Raml = require('../lib/laag-raml.js');

let doc = null;
let docNew = null;

beforeAll(() => {
    let data = fs.readFileSync('examples/example.raml', 'utf8');
    doc = new Raml(data);
    docNew = new Raml();
});

//
// Test getting from existing doc
//
test('Get Definition doc in JS', () => {
    expect(doc.getDefinition().title).toBe('API with Examples');
});
test('Get Definition doc in JSON', () => {
    expect(JSON.parse(doc.getDefinition('json')).title).toBe('API with Examples');
});
test('Get Definition doc in Pretty JSON', () => {
    expect(JSON.parse(doc.getDefinition('prettyjson')).title).toBe('API with Examples');
});
test('Check if dictKeysExists works', () => {
    expect(doc.dictKeysExists(doc.getDefinition(),'/organisation', 'post')).toBe(true);
});

//
// Test building doc
//
test('Set/Get document version', () => {
    docNew.docVersion = '1.1';
    console.log(docNew.getDefinition('prettyjson'));
    expect(docNew.docVersion).toBe('1.1');
});
test('Set root level extension', () => {
    docNew.rootExtensions = {annotation1: 'ann1', annotation2: 'ann2'};
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
    expect(Object.keys(docNew.infoExtensions).length).toBe(0);
});
test('Append info level extension', () => {
    let y = {};
    y['x-ext2'] = 'ext2';
    docNew.infoExtensions = y;
    docNew.appendInfoExtension('x-another-root', 'value for other root');
    expect(Object.keys(docNew.infoExtensions).length).toBe(0);
});
test('Set info object', () => {
    let x = {title: 'this is a title', version: '1.0.0', junk: 'this is junk'};
    x['x-custom-info'] = 'custom';
    docNew.info = x;
    console.log(docNew.getDefinition('prettyjson'));
    expect(docNew.info.title).toBe('this is a title');
});
test('Set Title of the RAML Definition', () => {
    docNew.title = 'A New Title';
    expect(docNew.title).toBe('A New Title');
});
test('Set Version of the RAML Definition', () => {
    docNew.version = '1.0.0';
    expect(docNew.version).toBe('1.0.0');
});
test('Set Description of the RAML Definition', () => {
    docNew.description = 'this is a description';
    expect(docNew.description).toBe('this is a description');
});
test('Set/Get baseUri', () => {
    docNew.baseUri = 'https://google.com';
    expect(docNew.baseUri).toBe('https://google.com');
});
test('Set/Get Protocols array', () => {
    docNew.protocols = ['http'];
    expect(docNew.protocols.length).toBe(1);
});
test('Append a Protocol', () => {
    docNew.appendProtocol('https');
    expect(docNew.protocols.length).toBe(2);
});
test('Set/Get Terms Of Service of the RAML Definition', () => {
    docNew.termsOfService = 'this is the terms';
    expect(docNew.termsOfService).toBe('this is the terms');
});

// test('Set/Get Contact Object of the RAML Definition', () => {
//     let x = {};
//     x['name'] = 'brett';
//     x['url'] = 'google.com';
//     x['email'] = 'b@gmail.com';
//     x['x-custom'] = 'custom contact';
//     x['junk'] = 'junk';
//     docNew.contact = x;
//     expect(Object.keys(docNew.contact).length).toBe(4);
// });
// test('Set/Get License Object of the RAML Definition', () => {
//     let x = {};
//     x['name'] = 'brett';
//     x['url'] = 'google.com';
//     x['x-custom'] = 'custom contact';
//     x['junk'] = 'junk';
//     docNew.license = x;
//     expect(Object.keys(docNew.license).length).toBe(3);
// });
test('Set/Get Servers Object of the RAML Definition', () => {
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
// test('Set paths level extension', () => {
//     let x = {};
//     let y = {};
//     x['x-ext1'] = 'ext1';
//     docNew.pathsExtensions = x;
//     y['x-ext-paths2'] = 'ext2';
//     y['x-ext-path3'] = 'ext3';
//     docNew.pathsExtensions = y;
//     console.log('PATHS LEVEL');
//     console.log(docNew.getDefinition('prettyjson'));
//     expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
// });
// test('Append paths level extension', () => {
//     let y = {};
//     y['x-ext2'] = 'ext2';
//     docNew.pathsExtensions = y;
//     docNew.appendPathsExtension('x-another-paths', 'value for other paths');
//     expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
//     console.log(docNew.getPathNames());
// });
// test('Get a Specific Path', () => {
//     console.log('GET PATH');
//     console.log(doc.getPath('/organisation'));
//     expect(Object.keys(doc.getPath('/organisation')).length).toBe(2);
// });
// test('Get All Unique HTTP Methods Across All Operations', () => {
//     expect(doc.getAllHttpMethods().length).toBe(3);
// });
// test('Get All Status Codes for an Operation', () => {
//     expect(doc.getStatusCodes('/organisation', 'get').length).toBe(1);
// });
// test('Get Operation Id for an Operation', () => {
//     expect(doc.getOperationId('/organisation', 'get')).toBe('getOrganisation');
// });
// test('Check if an Operation exists (true)', () => {
//     expect(doc.operationExists('/organisation', 'get')).toBe(true);
// });
// test('Check if an Operation exists (false)', () => {
//     expect(doc.operationExists('/organisationX', 'get')).toBe(false);
// });
// test('Check if an Path exists (true)', () => {
//     expect(doc.pathExists('/organisation')).toBe(true);
// });
// test('Check if an Path exists (false)', () => {
//     expect(doc.pathExists('/organisationX')).toBe(false);
// });
// test('Get Operation RequestBody Media Type', () => {
//     console.log(doc.getOperationRequestMedia('/organisation', 'post'));
//     expect(Object.keys(doc.getOperationRequestMedia('/organisation', 'post')).length).toBe(1);
// });
// test('Get Operation Description', () => {
//     console.log(doc.getOperationDescription('/organisation', 'post'));
//     expect(Object.keys(doc.getOperationDescription('/organisation', 'post')).length).toBeGreaterThanOrEqual(5);
// });
// test('Set/Get components', () => {
//     let x = {schemas: {}, responses: {}, parameters: {}, examples: {}, requestBodies: {}, headers: {}};
//     docNew.components = x;
//     console.log('COMPONENTS');
//     console.log(docNew.getDefinition('prettyjson'));
//     expect(Object.keys(docNew.components).length).toBe(6);
// });
// test('Set/Get security', () => {
//     let x = {};
//     x['ApiKeyAuth'] = [];
//     docNew.security = x;
//     console.log('security');
//     console.log(docNew.getDefinition('prettyjson'));
//     expect(Object.keys(docNew.security).length).toBe(1);
// });
// test('Set/Get tags', () => {
//     let x = {name: 'xxx', description: 'this is a tag'};
//     docNew.tags = x;
//     console.log('tags');
//     console.log(docNew.getDefinition('prettyjson'));
//     expect(Object.keys(docNew.tags).length).toBe(2);
// });
// test('Set/Get externalDocs', () => {
//     let x = {url: 'xxx', description: 'this is a externalDocs'};
//     docNew.externalDocs = x;
//     console.log('externalDocs');
//     console.log(docNew.getDefinition('prettyjson'));
//     expect(Object.keys(docNew.externalDocs).length).toBe(2);
// });