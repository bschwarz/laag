/**
 * Example: Model Validation with Smithy
 *
 * This example demonstrates how to:
 * - Validate complete Smithy models
 * - Handle validation errors
 * - Create invalid models to see error reporting
 * - Fix validation issues
 * - Validate after model modifications
 */

import { Smithy } from '../src/smithy';
import type { SmithyModel } from '../src/types';

console.log('=== Model Validation Example ===\n');

// 1. Valid model example
console.log('1. Validating a correct model:');
const validModel: SmithyModel = {
  smithy: '2.0',
  metadata: {
    authors: ['validation-example@company.com'],
  },
  shapes: {
    'example.validation#TestService': {
      type: 'service',
      version: '2023-01-01',
      operations: ['example.validation#GetData'],
      traits: {
        'smithy.api#documentation': 'A test service for validation',
      },
    },
    'example.validation#GetData': {
      type: 'operation',
      input: 'example.validation#GetDataInput',
      output: 'example.validation#GetDataOutput',
      traits: {
        'smithy.api#readonly': {},
        'smithy.api#http': {
          method: 'GET',
          uri: '/data/{id}',
        },
      },
    },
    'example.validation#GetDataInput': {
      type: 'structure',
      members: {
        id: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#httpLabel': {},
          },
        },
      },
    },
    'example.validation#GetDataOutput': {
      type: 'structure',
      members: {
        data: {
          target: 'smithy.api#String',
        },
        timestamp: {
          target: 'smithy.api#Timestamp',
        },
      },
    },
  },
};

try {
  const validSmithy = new Smithy(validModel);
  const validationResult = validSmithy.validate();
  
  if (validationResult.valid) {
    console.log('✅ Model is valid!');
    console.log(`- Version: ${validSmithy.version}`);
    console.log(`- Shapes: ${validSmithy.shapes.size}`);
    console.log(`- Services: ${validSmithy.getServices().length}`);
  } else {
    console.log('❌ Unexpected validation errors:');
    for (const error of validationResult.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  }
} catch (error) {
  console.log('❌ Failed to create valid model:', error.message);
}
console.log();

// 2. Model with missing required properties
console.log('2. Model missing required Smithy version:');
const invalidModel1 = {
  // Missing 'smithy' version
  shapes: {
    'example.test#TestShape': {
      type: 'string',
    },
  },
} as any;

try {
  const invalidSmithy1 = new Smithy(invalidModel1);
  console.log('❌ Should have failed validation');
} catch (error) {
  console.log('✅ Correctly caught validation error:', error.message);
}
console.log();

// 3. Model with invalid shape references
console.log('3. Model with invalid shape references:');
const invalidModel2: SmithyModel = {
  smithy: '2.0',
  shapes: {
    'example.test#TestService': {
      type: 'service',
      version: '1.0.0',
      operations: ['example.test#NonExistentOperation'], // Invalid reference
    },
    'example.test#TestOperation': {
      type: 'operation',
      input: 'example.test#NonExistentInput', // Invalid reference
      output: 'example.test#NonExistentOutput', // Invalid reference
    },
  },
};

try {
  const invalidSmithy2 = new Smithy(invalidModel2);
  const validationResult2 = invalidSmithy2.validate();
  
  if (!validationResult2.valid) {
    console.log('✅ Correctly identified validation errors:');
    for (const error of validationResult2.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  } else {
    console.log('❌ Should have found validation errors');
  }
} catch (error) {
  console.log('✅ Correctly caught error during creation:', error.message);
}
console.log();

// 4. Model with invalid trait values
console.log('4. Model with invalid trait values:');
const invalidModel3: SmithyModel = {
  smithy: '2.0',
  shapes: {
    'example.test#TestOperation': {
      type: 'operation',
      traits: {
        'smithy.api#http': {
          // Missing required 'method' property
          uri: '/test',
        },
      },
    },
  },
};

try {
  const invalidSmithy3 = new Smithy(invalidModel3);
  const validationResult3 = invalidSmithy3.validate();
  
  if (!validationResult3.valid) {
    console.log('✅ Correctly identified trait validation errors:');
    for (const error of validationResult3.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  } else {
    console.log('❌ Should have found trait validation errors');
  }
} catch (error) {
  console.log('✅ Correctly caught error:', error.message);
}
console.log();

// 5. Fixing validation issues
console.log('5. Fixing validation issues:');
const fixableModel: SmithyModel = {
  smithy: '2.0',
  shapes: {
    'example.fix#TestService': {
      type: 'service',
      version: '1.0.0',
      operations: ['example.fix#TestOperation'],
    },
    'example.fix#TestOperation': {
      type: 'operation',
      // Missing input/output initially
    },
  },
};

try {
  const fixableSmithy = new Smithy(fixableModel);
  
  // Check initial validation
  let validationResult = fixableSmithy.validate();
  console.log('Initial validation result:', validationResult.valid ? 'Valid' : 'Invalid');
  if (!validationResult.valid) {
    console.log('Issues found:');
    for (const error of validationResult.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  }
  
  // Fix by adding missing shapes
  console.log('\nAdding missing input/output shapes...');
  fixableSmithy.addShape('example.fix#TestInput', {
    type: 'structure',
    members: {
      message: {
        target: 'smithy.api#String',
        traits: {
          'smithy.api#required': {},
        },
      },
    },
  });
  
  fixableSmithy.addShape('example.fix#TestOutput', {
    type: 'structure',
    members: {
      result: {
        target: 'smithy.api#String',
      },
    },
  });
  
  // Update the operation to reference the new shapes
  const operation = fixableSmithy.getShape('example.fix#TestOperation');
  if (operation && operation.type === 'operation') {
    operation.input = 'example.fix#TestInput';
    operation.output = 'example.fix#TestOutput';
  }
  
  // Re-validate
  validationResult = fixableSmithy.validate();
  console.log('After fixes validation result:', validationResult.valid ? 'Valid ✅' : 'Invalid ❌');
  if (!validationResult.valid) {
    console.log('Remaining issues:');
    for (const error of validationResult.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  }
  
} catch (error) {
  console.log('❌ Error during fixing example:', error.message);
}
console.log();

// 6. Validation after model modifications
console.log('6. Validation after model modifications:');
try {
  const modifiableSmithy = new Smithy(validModel);
  
  console.log('Initial state: Valid ✅');
  
  // Add a shape with invalid reference
  console.log('Adding shape with invalid reference...');
  modifiableSmithy.addShape('example.validation#InvalidShape', {
    type: 'structure',
    members: {
      invalidMember: {
        target: 'example.validation#DoesNotExist', // Invalid reference
      },
    },
  });
  
  const validationAfterAdd = modifiableSmithy.validate();
  console.log('After adding invalid shape:', validationAfterAdd.valid ? 'Valid ✅' : 'Invalid ❌');
  if (!validationAfterAdd.valid) {
    console.log('New validation errors:');
    for (const error of validationAfterAdd.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  }
  
  // Fix by adding the missing target shape
  console.log('Fixing by adding missing target shape...');
  modifiableSmithy.addShape('example.validation#DoesNotExist', {
    type: 'string',
  });
  
  const validationAfterFix = modifiableSmithy.validate();
  console.log('After fix:', validationAfterFix.valid ? 'Valid ✅' : 'Invalid ❌');
  
} catch (error) {
  console.log('❌ Error during modification example:', error.message);
}
console.log();

// 7. Complex validation scenario
console.log('7. Complex validation scenario:');
const complexModel: SmithyModel = {
  smithy: '2.0',
  shapes: {
    'example.complex#ComplexService': {
      type: 'service',
      version: '2023-01-01',
      operations: [
        'example.complex#CreateResource',
        'example.complex#GetResource',
      ],
      resources: ['example.complex#Resource'],
    },
    'example.complex#Resource': {
      type: 'resource',
      identifiers: {
        id: 'smithy.api#String',
      },
      create: 'example.complex#CreateResource',
      read: 'example.complex#GetResource',
    },
    'example.complex#CreateResource': {
      type: 'operation',
      input: 'example.complex#CreateResourceInput',
      output: 'example.complex#CreateResourceOutput',
      traits: {
        'smithy.api#http': {
          method: 'POST',
          uri: '/resources',
          code: 201,
        },
      },
    },
    'example.complex#GetResource': {
      type: 'operation',
      input: 'example.complex#GetResourceInput',
      output: 'example.complex#GetResourceOutput',
      traits: {
        'smithy.api#readonly': {},
        'smithy.api#http': {
          method: 'GET',
          uri: '/resources/{id}',
        },
      },
    },
    'example.complex#CreateResourceInput': {
      type: 'structure',
      members: {
        name: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
          },
        },
        description: {
          target: 'smithy.api#String',
        },
      },
    },
    'example.complex#CreateResourceOutput': {
      type: 'structure',
      members: {
        resource: {
          target: 'example.complex#ResourceData',
          traits: {
            'smithy.api#required': {},
          },
        },
      },
    },
    'example.complex#GetResourceInput': {
      type: 'structure',
      members: {
        id: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
            'smithy.api#httpLabel': {},
          },
        },
      },
    },
    'example.complex#GetResourceOutput': {
      type: 'structure',
      members: {
        resource: {
          target: 'example.complex#ResourceData',
        },
      },
    },
    'example.complex#ResourceData': {
      type: 'structure',
      members: {
        id: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
          },
        },
        name: {
          target: 'smithy.api#String',
          traits: {
            'smithy.api#required': {},
          },
        },
        description: {
          target: 'smithy.api#String',
        },
        createdAt: {
          target: 'smithy.api#Timestamp',
          traits: {
            'smithy.api#required': {},
          },
        },
      },
    },
  },
};

try {
  const complexSmithy = new Smithy(complexModel);
  const complexValidation = complexSmithy.validate();
  
  console.log('Complex model validation:', complexValidation.valid ? 'Valid ✅' : 'Invalid ❌');
  console.log(`- Services: ${complexSmithy.getServices().length}`);
  console.log(`- Operations: ${complexSmithy.getShapesByType('operation').length}`);
  console.log(`- Resources: ${complexSmithy.getShapesByType('resource').length}`);
  console.log(`- Structures: ${complexSmithy.getShapesByType('structure').length}`);
  
  if (!complexValidation.valid) {
    console.log('Validation errors:');
    for (const error of complexValidation.errors) {
      console.log(`  - ${error.path}: ${error.message}`);
    }
  }
  
} catch (error) {
  console.log('❌ Error with complex model:', error.message);
}

console.log('\nValidation example complete!');