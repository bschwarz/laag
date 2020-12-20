const Openapi = require('../lib/laag-openapi.js').Openapi;
const Header = require('../lib/laag-openapi.js').Header;

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
    function t(header) {
        header.required = "true"
    }
    let head1 = new Header('MyCustomHeader1');
    try {
        head1.required = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    let idx = Header.members.indexOf(head1);
    
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
    function t(header) {
        header.deprecated = "true"
    }
    let head1 = new Header('MyCustomHeader1');
    try {
        head1.deprecated = "true"
    } catch(e) {
        expect(e instanceof TypeError).toBe(true);
    }
    let idx = Header.members.indexOf(head1);
    
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