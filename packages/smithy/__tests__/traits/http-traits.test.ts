/**
 * Tests for HTTP trait implementations
 */

import { describe, expect, test } from 'bun:test';
import {
  CorsTrait,
  HttpErrorTrait,
  HttpHeaderTrait,
  HttpLabelTrait,
  HttpPayloadTrait,
  HttpQueryTrait,
  HttpResponseCodeTrait,
  HttpTrait,
} from '../../src/traits/http-traits';
import { SMITHY_TRAITS } from '../../src/types';

describe('HttpTrait', () => {
  test('should create HTTP trait', () => {
    const trait = new HttpTrait({
      method: 'GET',
      uri: '/users/{id}',
      code: 200,
    });

    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP);
    expect(trait.getMethod()).toBe('GET');
    expect(trait.getUri()).toBe('/users/{id}');
    expect(trait.getCode()).toBe(200);
  });

  test('should check HTTP method', () => {
    const trait = new HttpTrait({ method: 'POST', uri: '/users' });
    expect(trait.isMethod('POST')).toBe(true);
    expect(trait.isMethod('post')).toBe(true);
    expect(trait.isMethod('GET')).toBe(false);
  });

  test('should detect path parameters', () => {
    const traitWithParams = new HttpTrait({ method: 'GET', uri: '/users/{id}/posts/{postId}' });
    expect(traitWithParams.hasPathParameters()).toBe(true);
    expect(traitWithParams.getPathParameters()).toEqual(['id', 'postId']);

    const traitWithoutParams = new HttpTrait({ method: 'GET', uri: '/users' });
    expect(traitWithoutParams.hasPathParameters()).toBe(false);
    expect(traitWithoutParams.getPathParameters()).toEqual([]);
  });

  test('should serialize to JSON', () => {
    const trait = new HttpTrait({ method: 'GET', uri: '/test' });
    const json = trait.toJSON();
    expect(json).toEqual({ method: 'GET', uri: '/test' });
  });
});

describe('HttpErrorTrait', () => {
  test('should create HTTP error trait', () => {
    const trait = new HttpErrorTrait(404);
    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP_ERROR);
    expect(trait.getCode()).toBe(404);
  });

  test('should identify client errors', () => {
    const clientError = new HttpErrorTrait(404);
    expect(clientError.isClientError()).toBe(true);
    expect(clientError.isServerError()).toBe(false);
  });

  test('should identify server errors', () => {
    const serverError = new HttpErrorTrait(500);
    expect(serverError.isServerError()).toBe(true);
    expect(serverError.isClientError()).toBe(false);
  });

  test('should serialize to JSON', () => {
    const trait = new HttpErrorTrait(404);
    expect(trait.toJSON()).toBe(404);
  });
});

describe('HttpLabelTrait', () => {
  test('should create HTTP label trait', () => {
    const trait = new HttpLabelTrait();
    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP_LABEL);
  });

  test('should serialize to empty object', () => {
    const trait = new HttpLabelTrait();
    expect(trait.toJSON()).toEqual({});
  });
});

describe('HttpQueryTrait', () => {
  test('should create HTTP query trait', () => {
    const trait = new HttpQueryTrait('page');
    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP_QUERY);
    expect(trait.getParameterName()).toBe('page');
  });

  test('should serialize to string', () => {
    const trait = new HttpQueryTrait('page');
    expect(trait.toJSON()).toBe('page');
  });
});

describe('HttpHeaderTrait', () => {
  test('should create HTTP header trait', () => {
    const trait = new HttpHeaderTrait('X-Custom-Header');
    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP_HEADER);
    expect(trait.getHeaderName()).toBe('X-Custom-Header');
  });

  test('should get canonical header name', () => {
    const trait = new HttpHeaderTrait('X-Custom-Header');
    expect(trait.getCanonicalHeaderName()).toBe('x-custom-header');
  });

  test('should serialize to string', () => {
    const trait = new HttpHeaderTrait('X-Custom-Header');
    expect(trait.toJSON()).toBe('X-Custom-Header');
  });
});

describe('HttpPayloadTrait', () => {
  test('should create HTTP payload trait', () => {
    const trait = new HttpPayloadTrait();
    expect(trait.getId()).toBe(SMITHY_TRAITS.HTTP_PAYLOAD);
  });

  test('should serialize to empty object', () => {
    const trait = new HttpPayloadTrait();
    expect(trait.toJSON()).toEqual({});
  });
});

describe('HttpResponseCodeTrait', () => {
  test('should create HTTP response code trait', () => {
    const trait = new HttpResponseCodeTrait(201);
    expect(trait.getCode()).toBe(201);
  });

  test('should identify success codes', () => {
    const success = new HttpResponseCodeTrait(200);
    expect(success.isSuccess()).toBe(true);
    expect(success.isRedirect()).toBe(false);
  });

  test('should identify redirect codes', () => {
    const redirect = new HttpResponseCodeTrait(301);
    expect(redirect.isRedirect()).toBe(true);
    expect(redirect.isSuccess()).toBe(false);
  });

  test('should serialize to number', () => {
    const trait = new HttpResponseCodeTrait(201);
    expect(trait.toJSON()).toBe(201);
  });
});

describe('CorsTrait', () => {
  test('should create CORS trait with default values', () => {
    const trait = new CorsTrait();
    expect(trait.getOrigin()).toBeUndefined();
    expect(trait.getMaxAge()).toBeUndefined();
    expect(trait.getAdditionalAllowedHeaders()).toEqual([]);
    expect(trait.getAdditionalExposedHeaders()).toEqual([]);
  });

  test('should create CORS trait with custom values', () => {
    const trait = new CorsTrait({
      origin: '*',
      maxAge: 3600,
      additionalAllowedHeaders: ['X-Custom-Header'],
      additionalExposedHeaders: ['X-Response-Header'],
    });

    expect(trait.getOrigin()).toBe('*');
    expect(trait.getMaxAge()).toBe(3600);
    expect(trait.getAdditionalAllowedHeaders()).toEqual(['X-Custom-Header']);
    expect(trait.getAdditionalExposedHeaders()).toEqual(['X-Response-Header']);
  });

  test('should serialize to JSON', () => {
    const trait = new CorsTrait({ origin: '*', maxAge: 3600 });
    const json = trait.toJSON();
    expect(json).toEqual({ origin: '*', maxAge: 3600 });
  });
});
