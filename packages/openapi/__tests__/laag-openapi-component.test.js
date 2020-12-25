const Openapi = require('../lib/laag-openapi.js').Openapi;
const Header = require('../lib/laag-openapi.js').Header;
const Parameter = require('../lib/laag-openapi.js').Parameter;

let doc = null;
let docNew = null;

beforeAll(() => {
    docNew = new Openapi();
});

//
// Test getting header description
//
test('Get/Set header description', () => {
    let head1 = new Header('MyCustomHeader');
    head1.description = "This is my description"
    console.log(head1.getHeader());
    expect(head1.description).toBe('This is my description');
});
//
// Test get/set header required
//
test('Get/Set header required', () => {
    let head1 = new Header('MyCustomHeader1');
    head1.description = "description1"
    head1.required = true
    console.log(head1.getHeader());
    expect(head1.required).toBe(true);
});
//
// Test get/set header required type error
//
test('Get/Set header required type error', () => {

    let head1 = new Header('MyCustomHeader1');
    try {
        head1.required = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    
    Header.deleteHeader(head1);
});
//
// Test get/set header deprecated
//
test('Get/Set header deprecated', () => {
    let head1 = new Header('MyCustomHeader1');
    head1.description = "description1"
    head1.deprecated = true
    console.log(head1.getHeader());
    expect(head1.deprecated).toBe(true);
    Header.deleteHeader(head1);
});
//
// Test get/set header deprecated type error
//
test('Get/Set header deprecated type error', () => {
    let head1 = new Header('MyCustomHeader1');
    try {
        head1.deprecated = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    
    Header.deleteHeader(head1);
});
//
// Test get all description
//
test('Get/Set header description', () => {
    let head1 = new Header('MyCustomHeader1');
    let head2 = new Header('MyCustomHeader2');
    head1.description = "description1"
    head2.description = "description2"
    let ret = [];
    for (let x of Header.members) {
        ret.push(x.description);
    }
    expect(ret.length).toBe(4);
});
//
// Test delete Header instance
//
test('Delete Header instance', () => {
    let pre = Header.members.length;
    let head1 = new Header('MyCustomHeader1');
    Header.deleteHeader(head1);
    expect(Header.members.length).toBe(pre);
});
//
// Test get all header objects
//
test('print out header objects', () => {
    let head1 = new Header('MyCustomHeader1');
    let head2 = new Header('MyCustomHeader2');
    head1.description = "description1"
    head2.description = "description2"
    let keys = Object.keys(Header.getHeaders());
    console.log(Header.getHeaders());
    expect(keys.length).toBe(3);
});
//
// Test Header extensions
//
test('Set Header extension', () => {
    let x = {};
    x['x-ext1'] = 'ext1';
    x['x-ext2'] = 'ext2';
    let head1 = new Header('MyCustomHeader1');
    head1.extensions = x;
    console.log('ROOT LEVEL');
    console.log(head1.getHeader());
    expect(Object.keys(head1.extensions).length).toBe(2);
});
test('Append root level extension', () => {
    let head1 = new Header('MyCustomHeader1');
    head1.appendRootExtension('x-another-root', 'value for other root');
    console.log(head1.getHeader());
    expect(Object.keys(head1.extensions).length).toBe(1);
});

//
// Parameters
//

//
// Test setting/getting name of parameter
//
test('Get/Set parameter name', () => {
    let param1 = new Parameter('MyParam1');
    param1.name = "MyParam1"
    console.log(param1.getParameter());
    expect(param1.name).toBe('MyParam1');
});
//
// Test setting/getting description of parameter
//
test('Get/Set parameter description', () => {
    let param2 = new Parameter('MyParam2');
    param2.description = "This is my description"
    console.log(param2.getParameter());
    expect(param2.description).toBe('This is my description');
});
//
// Test setting/getting in of parameter
//
test('Get/Set parameter in', () => {
    let param3 = new Parameter('MyParam3');
    param3.in = "path"
    console.log(param3.getParameter());
    expect(param3.in).toBe('path');
});
//
// Test get/set parameter required type error
//
test('Get/Set parameter required type error', () => {
    let param1 = new Header('MyCustomParam1');
    try {
        param1.required = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    
    Header.deleteHeader(param1);
});
//
// Test get/set parameter deprecated
//
test('Get/Set parameter deprecated', () => {
    let param1 = new Parameter('MyCustomParam1');
    param1.description = "description1"
    param1.deprecated = true
    console.log(param1.getParameter());
    expect(param1.deprecated).toBe(true);
    Parameter.deleteParameter(param1);
});
//
// Test get/set header deprecated type error
//
test('Get/Set parameter deprecated type error', () => {
    let param1 = new Parameter('MyCustomParameter1');
    try {
        param1.deprecated = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    
    Parameter.deleteParameter(param1);
});
//
// Test get/set parameter allowEmptyValue
//
test('Get/Set parameter allowEmptyValue', () => {
    let param5 = new Parameter('MyCustomParam5');
    param5.description = "description1"
    param5.allowEmptyValue = true
    console.log(param5.getParameter());
    expect(param5.allowEmptyValue).toBe(true);
    Parameter.deleteParameter(param5);
});
//
// Test get/set parameter allowEmptyValue type error
//
test('Get/Set parameter allowEmptyValue type error', () => {
    let param1 = new Parameter('MyCustomParameter1');
    try {
        param1.allowEmptyValue = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    
    Parameter.deleteParameter(param1);
});
//
// Test parameter extensions
//
test('Set parameter extension', () => {
    let x = {};
    x['x-ext1'] = 'ext1';
    x['x-ext2'] = 'ext2';
    let param1 = new Parameter('MyCustomParam1');
    param1.extensions = x;
    console.log('ROOT LEVEL');
    console.log(param1.getParameter());
    expect(Object.keys(param1.extensions).length).toBe(2);
});
test('Append root level extension for parameter', () => {
    let param1 = new Parameter('MyCustomParam1');
    param1.appendRootExtension('x-another-root', 'value for other root');
    console.log(param1.getParameter());
    expect(Object.keys(param1.extensions).length).toBe(1);
});