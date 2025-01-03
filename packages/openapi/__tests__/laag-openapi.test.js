import { describe, expect, test, beforeAll } from 'bun:test'
import { Openapi } from '../lib/laag-openapi.js';
import data from '../examples/houses-openapi3.json';

let doc = null;
let docNew = null;

beforeAll(() => {
    doc = new Openapi(data);
    docNew = new Openapi();
});

//
// openapi3 title and version are required under info object, so should
// be at least 2
//

//
// Test getting from existing doc
//
test('Get Definition doc in JS', () => {
    expect(doc.getDefinition().info.title).toBe('House API Example');
});
test('Get Definition doc in JSON', () => {
    expect(JSON.parse(doc.getDefinition('json')).info.title).toBe('House API Example');
});
test('Get Definition doc in Pretty JSON', () => {
    expect(JSON.parse(doc.getDefinition('prettyjson')).info.title).toBe('House API Example');
});
test('Check if dictKeysExists works', () => {
    expect(doc.dictKeysExists(doc.paths,'/houses', 'get')).toBe(true);
});
test('Rename a path', () => {
    doc.renamePath('/houses', '/housesX');
    expect(doc.getPathNames().includes('/housesX')).toBe(true);
    doc.renamePath('/housesX', '/houses');
});
test('Get tree representation of the paths', () => {
    let objs = doc.getPathsAsTree();
    expect(objs[0].name === 'houses').toBe(true);
});

//
// Test building doc
//
test('Set/Get document version', () => {
    docNew.docVersion = '3.0.0';
    expect(docNew.docVersion).toBe('3.0.0');
});
test('Set/Get base path', () => {
    docNew.basePath = 'http://somewhere.com';
    expect(docNew.basePath).toBe('http://somewhere.com');
});
test('Set root level extension', () => {
    let x = {};
    x['x-ext1'] = 'ext1';
    x['x-ext2'] = 'ext2';
    docNew.rootExtensions = x;
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
    expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
});
test('Append paths level extension', () => {
    let y = {};
    y['x-ext2'] = 'ext2';
    docNew.pathsExtensions = y;
    docNew.appendPathsExtension('x-another-paths', 'value for other paths');
    expect(Object.keys(docNew.pathsExtensions).length).toBe(2);
});
test('Get a Specific Path', () => {
    // console.log(Object.keys(doc.getPath('/houses')))
    let path = doc.getPath('/houses');
    let keys = Object.keys(path);
    expect(keys.length).toBe(4);
    expect(keys.includes('get')).toBe(true);
    expect(keys.includes('post')).toBe(true);
    expect(keys.includes('description')).toBe(true);
    expect(keys.includes('parameters')).toBe(true);
});
test('Get All Unique HTTP Methods Across All Operations', () => {
    expect(doc.getAllHttpMethods().length).toBe(4);
});
test('Get All Status Codes for an Operation', () => {
    expect(doc.getStatusCodes('/houses', 'get').length).toBe(3);
});
test('Get All Status Codes for *all* Operations', () => {
    expect(doc.getAllStatusCodes().length).toBe(5);
});
test('Get All Status Codes Summary for *all* Operations', () => {
    expect(doc.getStatusCodeSummary().length).toBe(10);
});
test('Get Success Code for an Operation', () => {
    expect(doc.getSuccessCode('/houses/{houseId}', 'delete')).toBe('204');
});
test('Get Operation Id for an Operation', () => {
    expect(doc.getOperationId('/houses', 'get')).toBe('ListHouses');
});
test('Set Operation Id for an Operation', () => {
    doc.setOperationId('/houses', 'get', 'someId');
    expect(doc.getOperationId('/houses', 'get')).toBe('someId');
});
test('Get Operation Ids for all Operations', () => {
    expect(doc.getOperationIds().length).toBe(10);
});
test('Check if an Operation exists (true)', () => {
    expect(doc.operationExists('/houses', 'get')).toBe(true);
});
test('Check if an Operation exists (false)', () => {
    expect(doc.operationExists('/housesX', 'get')).toBe(false);
});
test('Check if an Path exists (true)', () => {
    expect(doc.pathExists('/houses')).toBe(true);
});
test('Check if an Path exists (false)', () => {
    expect(doc.pathExists('/housesX')).toBe(false);
});
test('Get Operation RequestBody Media Type', () => {
    expect(Object.keys(doc.getOperationRequestMedia('/houses', 'post')).length).toBe(1);
});
test('Get Operation Description', () => {
    expect(Object.keys(doc.getOperationDescription('/houses', 'post')).length).toBeGreaterThanOrEqual(5);
});
test('Get Operation Data', () => {
    expect(Object.keys(doc.getOperationData('/houses', 'post')).length).toBeGreaterThanOrEqual(5);
});
test('Get Operation Parameters', () => {
    expect(doc.getOperationParameters('/houses/{houseId}', 'get').length).toBe(0);
    expect(doc.getOperationParameters('/houses/{houseId}', 'path').length).toBe(4);
    expect(doc.getOperationParameters('/houses/{houseId}', 'get', true).length).toBe(4);
});
test('Get Operation Parameter Summary', () => {
    // console.log("OPERATION SUMMARY")
    // console.log(doc.getParameterSummary())
    let summary = doc.getParameterSummary();
    let lengths = summary.map(x => Object.keys(x).length);
    let slengths = new Set(lengths)
    expect(summary.length).toBe(22);
    expect(slengths.size).toBe(1);
    expect(Array.from(slengths)[0]).toBe(7);
});
test('Check operation deprecation', () => {
    expect(doc.isOperationDeprecated('/houses', 'post')).toBe(true);
});
test('Set/Get components', () => {
    let x = {schemas: {}, responses: {}, parameters: {}, examples: {}, requestBodies: {}, headers: {}};
    docNew.components = x;
    expect(Object.keys(docNew.components).length).toBe(6);
});
test('Set/Get security', () => {
    let x = {};
    x['ApiKeyAuth'] = [];
    docNew.security = x;
    expect(Object.keys(docNew.security).length).toBe(1);
});
test('Set/Get tags', () => {
    let x = {name: 'xxx', description: 'this is a tag'};
    docNew.tags = x;
    expect(Object.keys(docNew.tags).length).toBe(2);
});
test('Set/Get externalDocs', () => {
    let x = {url: 'xxx', description: 'this is a externalDocs'};
    docNew.externalDocs = x;
    expect(Object.keys(docNew.externalDocs).length).toBe(2);
});
test('Get curl commands', () => {
    // console.log("CURL COMMANDS")
    // console.log(doc.getCurlCommands('/houses', 'post'))
    expect(Object.keys(doc.getCurlCommands('/houses', 'post')).length).toBe(1);
});
test('Get python code', () => {
    expect(Object.keys(doc.getPythonCode('/houses', 'post')).length).not.toBe(0);
});
test('Get Resource Summary', () => {
    let resources = doc.getResourceSummary();
    expect(resources[0].get).toBe(true);
});
test('Get operation Summary', () => {
    let resources = doc.getOperationSummary();
    expect(resources.length).toBe(10);
    expect(resources[0].resource).toBe('/houses');
});
test('Get Resource Summary, negative case', () => {
    doc.httpMethods = ['post'];
    let resources = doc.getResourceSummary();
    let getCmds = resources.filter(x => x.hasOwnProperty('get'));
    expect(getCmds.length).toBe(0);
});
test('Get Parameters from path with {}', () => {
    let res = doc.getParametersFromPath('/one/{two_2}/three/{four}');
    expect(res.length).toBe(2);
});
test('Get Parameters from path with :', () => {
    let res = doc.getParametersFromPath('/one/:two-2/three/:four');
    expect(res.length).toBe(2);
});
test('Generate JSON sample :', () => {
    let res = doc.generateJsonSample('/houses', 'get', 'response') || {};
    console.log(res)
    expect(!!res.houses).toBe(true);
});

test('Get Header request header sample', () => {
    let res = doc.getRequestHeadersSample('/houses', 'post');
    expect(res.length).not.toBe(0);
});
test('Get Header response header sample', () => {
    let res = doc.getResponseHeadersSample('/houses', 'get');
    expect(res.length).not.toBe(0);
});
test('Get Header request header sample - no body', () => {
    let res = doc.getRequestHeadersSample('/houses', 'get');
    expect(res.match('Content-Length')).toBe(null);
});
test('Get Header response header sample - no body', () => {
    let res = doc.getResponseHeadersSample('/houses/{houseId}', 'delete');
    // console.log(res)
    expect(res.match('Content-Length')).toBe(null);
});
test('Delete an operation', () => {
    let res = doc.deleteOperation('/houses/{houseId}', 'delete');
    // console.log(res);
    expect(doc.operationExists('/houses/{houseId}', 'delete')).toBe(false);
});
test('Delete a path', () => {
    let res = doc.deletePath('/houses/{houseId}');
    // console.log(res);
    expect(doc.pathExists('/houses/{houseId}')).toBe(false);
});

console.log(__dirname);