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
    expect(ret.length).toBe(3);
});