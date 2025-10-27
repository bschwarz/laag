/**
 * Example: Working with Traits in Smithy Models
 *
 * This example demonstrates how to:
 * - Check for traits on shapes
 * - Add and remove traits
 * - Work with standard traits (http, required, documentation)
 * - Extract HTTP binding information
 * - Query shapes by traits using selectors
 */

import { Smithy } from '../src/smithy';
import type { SmithyModel } from '../src/types';

// Example model with various traits
const userServiceModel: SmithyModel = {
  smithy: '2.0',
  metadata: {
    authors: ['api-team@company.com'],
  },
  shapes: {
    'example.users#UserService': {
      type: 'service',
      version: '2023-01-01',
      operations: [
        'example.users#GetUser',
        'example.users#CreateUser',
        'example.users#UpdateUser',
        'example.users#DeleteUser'
      ],
      traits: {
        'smithy.api#documentation': 'A comprehensive user management service',
        'smithy.api#title': 'User Management API',
      },
    },
    'example.users#GetUser': {
      type: 'operation',
      input: 'example.users#GetUserInput',
      output: 'example.users#GetUserOutput',
      traits: {
        'smithy.api#readonly': {},
        'smithy.api#http': {
          method: 'GET',
          uri: '/users/{userId}',
        },
        'smithy.api#documentation': 'Retrieve a user by their unique identifier',
      },
    },
    'example.users#CreateUser': {
      type: 'operation',
      input: 'example.users#CreateUserInput',
      output: 'example.users#CreateUserOutput',
      traits: {
        'smithy.api#http': {
          method: 'POST',
          uri: '/users',
          code: 201,
        },
        'smithy.api#documentation': 'Create a new user account',
      },
    },
    'example.users#UpdateUser': {
      type: 'operation',
      input: 'example.users#UpdateUserInput',
      output: 'example.users#UpdateUserOutput',
      traits: {
        'smithy.api#idempotent': {},
        'smithy.api#http': {
          method: 'PUT',
          uri: '/users/{userId}',
        },
        'smithy.api#documentation': 'Update an existing user',
      },
    },
    'example.users#DeleteUser': {
      type: 'operation',
      input: 'example.users#DeleteUserInput',
      traits: {
        'smithy.api#idempotent': {},
        'smithy.api#http': {
          method: 'DELETE',
          uri: '/users/{userId}',
          code: 204,
        },
        'smithy.api#documentation': 'Delete a user account',
      },
    },
    'example.users#GetUserInput': {
      type: 'structure',
      members: {
        userId: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#httpLabel': {},
            'smithy.api#documentation': 'The unique user identifier',
          },
        },
      },
    },
    'example.users#GetUserOutput': {
      type: 'structure',
      members: {
        user: {
          target: 'example.users#User',
          traits: {
            'smithy.api#documentation': 'The user information',
          },
        },
      },
    },
    'example.users#CreateUserInput': {
      type: 'structure',
      members: {
        name: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'The user\'s full name',
          },
        },
        email: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'The user\'s email address',
          },
        },
        age: {
          target: 'smithy.api#Integer',
          traits: {
            'smithy.api#documentation': 'The user\'s age (optional)',
          },
        },
      },
    },
    'example.users#CreateUserOutput': {
      type: 'structure',
      members: {
        user: {
          target: 'example.users#User',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'The created user',
          },
        },
      },
    },
    'example.users#User': {
      type: 'structure',
      members: {
        id: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'Unique user identifier',
          },
        },
        name: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'User\'s full name',
          },
        },
        email: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'User\'s email address',
          },
        },
        age: {
          target: 'smithy.api#Integer',
          traits: {
            'smithy.api#documentation': 'User\'s age',
          },
        },
        createdAt: {
          target: 'smithy.api#Timestamp',
          traits: {
            'smithy.api#required': {},
            'smithy.api#documentation': 'Account creation timestamp',
          },
        },
      },
      traits: {
        'smithy.api#documentation': 'Represents a user in the system',
      },
    },
  },
};

// Create Smithy instance
console.log('=== Trait Usage Example ===\n');
const smithy = new Smithy(userServiceModel);

// 1. Check for traits on shapes
console.log('1. Checking for traits:');
console.log('- GetUser has readonly trait:', smithy.hasTrait('example.users#GetUser', 'smithy.api#readonly'));
console.log('- CreateUser has readonly trait:', smithy.hasTrait('example.users#CreateUser', 'smithy.api#readonly'));
console.log('- UpdateUser has idempotent trait:', smithy.hasTrait('example.users#UpdateUser', 'smithy.api#idempotent'));
console.log('- userId has required trait:', smithy.hasTrait('example.users#GetUserInput', 'smithy.api#required'));
console.log();

// 2. Get all traits for a shape
console.log('2. All traits for GetUser operation:');
const getUserTraits = smithy.getTraits('example.users#GetUser');
if (getUserTraits) {
  for (const [traitId, value] of getUserTraits) {
    console.log(`- ${traitId}:`, value);
  }
}
console.log();

// 3. Extract HTTP binding information
console.log('3. HTTP bindings for operations:');
const operations = ['GetUser', 'CreateUser', 'UpdateUser', 'DeleteUser'];
for (const op of operations) {
  const operationId = `example.users#${op}`;
  const binding = smithy.getHttpBinding(operationId);
  if (binding) {
    console.log(`- ${op}: ${binding.method} ${binding.uri}${binding.code ? ` (${binding.code})` : ''}`);
  }
}
console.log();

// 4. Add new traits to existing shapes
console.log('4. Adding new traits:');
smithy.addTrait('example.users#User', 'smithy.api#sensitive', {});
smithy.addTrait('example.users#GetUser', 'smithy.api#paginated', {
  inputToken: 'nextToken',
  outputToken: 'nextToken',
  pageSize: 'maxResults',
});

console.log('- Added sensitive trait to User');
console.log('- Added paginated trait to GetUser');
console.log('- User now has sensitive trait:', smithy.hasTrait('example.users#User', 'smithy.api#sensitive'));
console.log();

// 5. Query shapes by traits using selectors
console.log('5. Querying shapes by traits:');

// Find all readonly operations
const readonlyOps = smithy.select('[trait|readonly]');
console.log(`- Readonly operations (${readonlyOps.length}):`);
for (const match of readonlyOps) {
  console.log(`  - ${match.shapeId}`);
}

// Find all required members (this is a simplified selector)
const allShapes = smithy.select('*');
const requiredMembers = [];
for (const match of allShapes) {
  if (match.shape.type === 'structure' && match.shape.members) {
    for (const [memberName, member] of Object.entries(match.shape.members)) {
      if (member.traits && member.traits['smithy.api#required']) {
        requiredMembers.push(`${match.shapeId}.${memberName}`);
      }
    }
  }
}
console.log(`- Required members (${requiredMembers.length}):`);
for (const member of requiredMembers) {
  console.log(`  - ${member}`);
}
console.log();

// 6. Work with documentation traits
console.log('6. Documentation traits:');
const structures = smithy.getShapesByType('structure');
for (const structure of structures) {
  const shapeId = Array.from(smithy.shapes.entries())
    .find(([_, shape]) => shape === structure)?.[0];
  
  if (shapeId) {
    const traits = smithy.getTraits(shapeId);
    const doc = traits?.get('smithy.api#documentation');
    if (doc) {
      console.log(`- ${shapeId}: "${doc}"`);
    }
  }
}
console.log();

// 7. Create a new shape with multiple traits
console.log('7. Creating new shape with traits:');
smithy.addShape('example.users#UserPreferences', {
  type: 'structure',
  members: {
    theme: {
      target: 'smithy.api#String',
      traits: {
        'smithy.api#documentation': 'UI theme preference',
      },
    },
    language: {
      target: 'smithy.api#String',
      traits: {
        'smithy.api#required': {},
        'smithy.api#documentation': 'Preferred language',
      },
    },
    notifications: {
      target: 'smithy.api#Boolean',
      traits: {
        'smithy.api#documentation': 'Enable notifications',
      },
    },
  },
  traits: {
    'smithy.api#documentation': 'User preference settings',
    'smithy.api#sensitive': {},
  },
});

// Add additional traits to the new shape
smithy.addTrait('example.users#UserPreferences', 'smithy.api#unstable', {});

console.log('- Created UserPreferences with documentation and sensitive traits');
console.log('- Added unstable trait');
console.log('- UserPreferences has sensitive trait:', 
  smithy.hasTrait('example.users#UserPreferences', 'smithy.api#sensitive'));
console.log('- UserPreferences has unstable trait:', 
  smithy.hasTrait('example.users#UserPreferences', 'smithy.api#unstable'));
console.log();

// 8. Summary of trait usage
console.log('8. Summary:');
console.log(`- Total shapes: ${smithy.shapes.size}`);
console.log(`- Shapes with documentation: ${Array.from(smithy.shapes.entries())
  .filter(([shapeId, _]) => smithy.hasTrait(shapeId, 'smithy.api#documentation')).length}`);
console.log(`- Readonly operations: ${readonlyOps.length}`);
console.log(`- Required members: ${requiredMembers.length}`);

console.log('\nTrait usage example complete!');