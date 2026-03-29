[**@laag/smithy v1.0.0-alpha.0**](../README.md)

***

[@laag/smithy](../globals.md) / ServiceManager

# Class: ServiceManager

Defined in: [smithy/src/service-manager.ts:22](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L22)

Manages service-specific operations in a Smithy model
Provides methods for accessing services, operations, resources, and HTTP bindings

## Constructors

### Constructor

> **new ServiceManager**(`shapeManager`, `traitManager`): `ServiceManager`

Defined in: [smithy/src/service-manager.ts:31](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L31)

Create a new ServiceManager

#### Parameters

##### shapeManager

[`ShapeManager`](ShapeManager.md)

The shape manager instance

##### traitManager

[`TraitManager`](TraitManager.md)

The trait manager instance

#### Returns

`ServiceManager`

## Methods

### getServices()

> **getServices**(): `ServiceShape`[]

Defined in: [smithy/src/service-manager.ts:40](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L40)

Get all services in the model

#### Returns

`ServiceShape`[]

Array of service shapes

***

### getService()

> **getService**(`serviceId`): `ServiceShape` \| `undefined`

Defined in: [smithy/src/service-manager.ts:50](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L50)

Get a specific service by its shape ID

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`ServiceShape` \| `undefined`

The service shape, or undefined if not found or not a service

***

### getOperations()

> **getOperations**(`serviceId`): `OperationShape`[]

Defined in: [smithy/src/service-manager.ts:63](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L63)

Get all operations for a service

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`OperationShape`[]

Array of operation shapes

***

### getResources()

> **getResources**(`serviceId`): `ResourceShape`[]

Defined in: [smithy/src/service-manager.ts:85](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L85)

Get all resources for a service

#### Parameters

##### serviceId

`string`

The service shape ID

#### Returns

`ResourceShape`[]

Array of resource shapes

***

### getOperationInput()

> **getOperationInput**(`operationId`): `StructureShape` \| `undefined`

Defined in: [smithy/src/service-manager.ts:107](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L107)

Get the input structure for an operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`StructureShape` \| `undefined`

The input structure shape, or undefined if not found

***

### getOperationOutput()

> **getOperationOutput**(`operationId`): `StructureShape` \| `undefined`

Defined in: [smithy/src/service-manager.ts:130](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L130)

Get the output structure for an operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`StructureShape` \| `undefined`

The output structure shape, or undefined if not found

***

### getOperationErrors()

> **getOperationErrors**(`operationId`): `StructureShape`[]

Defined in: [smithy/src/service-manager.ts:153](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L153)

Get all error structures for an operation

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

`StructureShape`[]

Array of error structure shapes

***

### getHttpBinding()

> **getHttpBinding**(`operationId`): [`HttpBinding`](../interfaces/HttpBinding.md) \| `undefined`

Defined in: [smithy/src/service-manager.ts:180](https://github.com/bschwarz/laag/blob/main/packages/smithy/packages/smithy/src/service-manager.ts#L180)

Get HTTP binding information for an operation
Extracts HTTP method, URI, status code, headers, query params, labels, and payload

#### Parameters

##### operationId

`string`

The operation shape ID

#### Returns

[`HttpBinding`](../interfaces/HttpBinding.md) \| `undefined`

HTTP binding information, or undefined if no HTTP trait is present
