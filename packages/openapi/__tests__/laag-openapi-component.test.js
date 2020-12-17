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
