/**
 * Browser Examples for @laag/openapi
 *
 * This module demonstrates how to use the laag OpenAPI library
 * in browser environments with ES modules.
 */

import { Openapi } from '../../../packages/openapi/dist/esm/index.js';

// Global API instance for examples
let currentApi = null;

// Sample OpenAPI document for demonstrations
const sampleDocument = {
  openapi: '3.0.2',
  info: {
    title: 'Browser Example API',
    version: '1.0.0',
    description: 'A sample API for browser demonstrations',
    contact: {
      name: 'Browser Team',
      email: 'browser@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'https://api.example.com/v1',
      description: 'Production server',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'List users',
        operationId: 'listUsers',
        tags: ['users'],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create user',
        operationId: 'createUser',
        tags: ['users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        operationId: 'getUserById',
        tags: ['users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
    },
  },
  tags: [
    {
      name: 'users',
      description: 'User management operations',
    },
  ],
};

// Utility functions
function log(elementId, message, type = 'info') {
  const element = document.getElementById(elementId);
  const timestamp = new Date().toLocaleTimeString();
  const className = type;
  element.innerHTML += `<div class="${className}">[${timestamp}] ${message}</div>`;
  element.scrollTop = element.scrollHeight;
}

function clearLog(elementId) {
  document.getElementById(elementId).innerHTML = '';
}

function updateCurrentDocument() {
  const element = document.getElementById('current-document');
  if (currentApi) {
    const doc = currentApi.getDefinition('prettyjson');
    element.textContent = doc;
  } else {
    element.textContent = 'No document loaded';
  }
}

// Example functions (exposed globally for button clicks)
window.createEmptyDocument = function () {
  clearLog('basic-output');
  try {
    currentApi = new Openapi();
    log('basic-output', '✅ Created empty OpenAPI document', 'success');
    log('basic-output', `Title: "${currentApi.title}"`, 'info');
    log('basic-output', `Version: ${currentApi.version}`, 'info');
    log('basic-output', `OpenAPI spec version: ${currentApi.getDocument().openapi}`, 'info');
    updateCurrentDocument();
  } catch (error) {
    log('basic-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.createFromObject = function () {
  clearLog('basic-output');
  try {
    const simpleDoc = {
      openapi: '3.0.2',
      info: {
        title: 'Browser Created API',
        version: '2.0.0',
        description: 'Created directly in the browser',
      },
      paths: {},
    };

    currentApi = new Openapi(simpleDoc);
    log('basic-output', '✅ Created API from object', 'success');
    log('basic-output', `Title: ${currentApi.title}`, 'info');
    log('basic-output', `Description: ${currentApi.description}`, 'info');
    updateCurrentDocument();
  } catch (error) {
    log('basic-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.loadSampleDocument = function () {
  clearLog('basic-output');
  try {
    currentApi = new Openapi(sampleDocument);
    log('basic-output', '✅ Loaded sample document', 'success');
    log('basic-output', `Title: ${currentApi.title}`, 'info');
    log('basic-output', `Paths: ${currentApi.getPathNames().length}`, 'info');
    log('basic-output', `Tags: ${currentApi.tags.length}`, 'info');
    updateCurrentDocument();
  } catch (error) {
    log('basic-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.analyzeDocument = function () {
  clearLog('analysis-output');
  if (!currentApi) {
    log(
      'analysis-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    const paths = currentApi.getPathNames();
    log('analysis-output', `📊 Document Analysis:`, 'info');
    log('analysis-output', `• Paths: ${paths.length}`, 'info');
    log('analysis-output', `• Servers: ${currentApi.servers.length}`, 'info');
    log('analysis-output', `• Tags: ${currentApi.tags.length}`, 'info');

    if (paths.length > 0) {
      log('analysis-output', `\n📍 Available paths:`, 'info');
      paths.forEach(path => {
        log('analysis-output', `  ${path}`, 'info');
      });

      // Analyze operations
      const allMethods = currentApi.getAllHttpMethods();
      log('analysis-output', `\n🔧 HTTP methods used: ${allMethods.join(', ')}`, 'info');

      const allStatusCodes = currentApi.getAllStatusCodes();
      log('analysis-output', `📋 Status codes used: ${allStatusCodes.join(', ')}`, 'info');
    }
  } catch (error) {
    log('analysis-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.validateDocument = function () {
  clearLog('analysis-output');
  if (!currentApi) {
    log(
      'analysis-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    const result = currentApi.validate();
    if (result.valid) {
      log('analysis-output', '✅ Document is valid!', 'success');
    } else {
      log('analysis-output', '❌ Document validation failed:', 'error');
      result.errors.forEach(error => {
        log('analysis-output', `  • ${error.path}: ${error.message} (${error.code})`, 'error');
      });
    }
  } catch (error) {
    log('analysis-output', `❌ Error during validation: ${error.message}`, 'error');
  }
};

window.listOperations = function () {
  clearLog('analysis-output');
  if (!currentApi) {
    log(
      'analysis-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    const operations = currentApi.getOperationIds();
    log('analysis-output', `🔧 Operations (${operations.length} total):`, 'info');

    operations.forEach(op => {
      const description = currentApi.getOperationDescription(op.path, op.method);
      log('analysis-output', `  ${op.method.toUpperCase()} ${op.path} → ${op.id}`, 'info');
      if (description) {
        log('analysis-output', `    Description: ${description}`, 'info');
      }
    });
  } catch (error) {
    log('analysis-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.addPath = function () {
  clearLog('manipulation-output');
  if (!currentApi) {
    log(
      'manipulation-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    const newPath = {
      get: {
        summary: 'Get products',
        operationId: 'getProducts',
        tags: ['products'],
        parameters: [
          {
            name: 'category',
            in: 'query',
            description: 'Filter by category',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'List of products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      price: { type: 'number' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    currentApi.appendPath('/products', newPath);
    log('manipulation-output', '✅ Added /products path with GET operation', 'success');
    log('manipulation-output', `Total paths now: ${currentApi.getPathNames().length}`, 'info');
    updateCurrentDocument();
  } catch (error) {
    log('manipulation-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.updateInfo = function () {
  clearLog('manipulation-output');
  if (!currentApi) {
    log(
      'manipulation-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    currentApi.title = 'Updated Browser API';
    currentApi.version = '2.1.0';
    currentApi.description = 'This API was updated in the browser!';

    currentApi.contact = {
      name: 'Updated Contact',
      email: 'updated@example.com',
      url: 'https://example.com/updated',
    };

    log('manipulation-output', '✅ Updated API information', 'success');
    log('manipulation-output', `New title: ${currentApi.title}`, 'info');
    log('manipulation-output', `New version: ${currentApi.version}`, 'info');
    log('manipulation-output', `Contact: ${currentApi.contact.name}`, 'info');
    updateCurrentDocument();
  } catch (error) {
    log('manipulation-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.addExtensions = function () {
  clearLog('manipulation-output');
  if (!currentApi) {
    log(
      'manipulation-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    // Add root extensions
    currentApi.rootExtensions = {
      'x-browser-created': true,
      'x-timestamp': new Date().toISOString(),
      'x-user-agent': navigator.userAgent.substring(0, 50) + '...',
    };

    // Add info extensions
    currentApi.infoExtensions = {
      'x-api-category': 'browser-demo',
      'x-features': ['real-time', 'responsive', 'modern'],
    };

    log('manipulation-output', '✅ Added custom extensions', 'success');
    log(
      'manipulation-output',
      `Root extensions: ${Object.keys(currentApi.rootExtensions).join(', ')}`,
      'info'
    );
    log(
      'manipulation-output',
      `Info extensions: ${Object.keys(currentApi.infoExtensions).join(', ')}`,
      'info'
    );
    updateCurrentDocument();
  } catch (error) {
    log('manipulation-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.showStatistics = function () {
  clearLog('stats-output');
  if (!currentApi) {
    log(
      'stats-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    const doc = currentApi.getDefinition('js');
    const paths = currentApi.getPathNames();
    const operations = currentApi.getOperationIds();
    const methods = currentApi.getAllHttpMethods();
    const statusCodes = currentApi.getAllStatusCodes();

    // Create statistics display
    const statsHtml = `
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">${paths.length}</div>
          <div class="stat-label">Paths</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${operations.length}</div>
          <div class="stat-label">Operations</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${methods.length}</div>
          <div class="stat-label">HTTP Methods</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${statusCodes.length}</div>
          <div class="stat-label">Status Codes</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${Object.keys(doc.components?.schemas || {}).length}</div>
          <div class="stat-label">Schemas</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${doc.servers?.length || 0}</div>
          <div class="stat-label">Servers</div>
        </div>
      </div>
    `;

    document.getElementById('stats-output').innerHTML = statsHtml;

    log('stats-output', `\n📊 Detailed Statistics:`, 'info');
    log('stats-output', `• API Title: ${currentApi.title}`, 'info');
    log('stats-output', `• API Version: ${currentApi.version}`, 'info');
    log('stats-output', `• OpenAPI Version: ${doc.openapi}`, 'info');
    log('stats-output', `• HTTP Methods: ${methods.join(', ')}`, 'info');
    log('stats-output', `• Status Codes: ${statusCodes.join(', ')}`, 'info');
  } catch (error) {
    log('stats-output', `❌ Error: ${error.message}`, 'error');
  }
};

window.exportDocument = function () {
  clearLog('stats-output');
  if (!currentApi) {
    log(
      'stats-output',
      '⚠️ No document loaded. Please create or load a document first.',
      'warning'
    );
    return;
  }

  try {
    // Create downloadable JSON file
    const jsonDoc = currentApi.getDefinition('prettyjson');
    const blob = new Blob([jsonDoc], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentApi.title.replace(/\s+/g, '-').toLowerCase()}-openapi.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    log('stats-output', '✅ Document exported successfully!', 'success');
    log('stats-output', `File: ${a.download}`, 'info');
    log('stats-output', `Size: ${new Blob([jsonDoc]).size} bytes`, 'info');
  } catch (error) {
    log('stats-output', `❌ Error: ${error.message}`, 'error');
  }
};

// Initialize with a sample document
window.addEventListener('DOMContentLoaded', () => {
  log('basic-output', '🌐 Browser environment initialized', 'success');
  log('basic-output', '💡 Click "Load Sample Document" to get started', 'info');
});
