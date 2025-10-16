
        const { Openapi } = require('./packages/openapi/dist/cjs/index.js');
        const { LaagBase } = require('./packages/core/dist/cjs/index.js');
        
        console.log('✓ CommonJS modules loaded successfully');
        
        // Test basic functionality
        const api = new Openapi();
        console.log('✓ OpenAPI instance created successfully');
        
        // Test that we can access properties
        const info = api.info;
        console.log('✓ OpenAPI info property accessible');
      