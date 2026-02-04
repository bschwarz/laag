/**
 * HTTP-related trait implementations
 * @module traits/http-traits
 */

import type { HttpTrait as HttpTraitType } from '../types.js';
import { SMITHY_TRAITS } from '../types.js';
import { MarkerTrait, NumberTrait, ObjectTrait, StringTrait } from './base-trait.js';

/**
 * HTTP trait - defines HTTP binding for operations
 * @see https://smithy.io/2.0/spec/http-bindings.html#http-trait
 */
export class HttpTrait extends ObjectTrait<HttpTraitType> {
  constructor(value: HttpTraitType) {
    super(SMITHY_TRAITS.HTTP, value);
  }

  /**
   * Get the HTTP method
   */
  getMethod(): string {
    return this.value.method;
  }

  /**
   * Get the URI pattern
   */
  getUri(): string {
    return this.value.uri;
  }

  /**
   * Get the HTTP status code (if specified)
   */
  getCode(): number | undefined {
    return this.value.code;
  }

  /**
   * Check if this is a specific HTTP method
   */
  isMethod(method: string): boolean {
    return this.value.method.toUpperCase() === method.toUpperCase();
  }

  /**
   * Check if the URI contains path parameters
   */
  hasPathParameters(): boolean {
    return this.value.uri.includes('{') && this.value.uri.includes('}');
  }

  /**
   * Extract path parameter names from the URI
   */
  getPathParameters(): string[] {
    const matches = this.value.uri.matchAll(/\{([^}]+)\}/g);
    return Array.from(matches, m => m[1]).filter((param): param is string => param !== undefined);
  }
}

/**
 * HTTP error trait - marks an error structure with HTTP status code
 * @see https://smithy.io/2.0/spec/http-bindings.html#httperror-trait
 */
export class HttpErrorTrait extends NumberTrait {
  constructor(code: number) {
    super(SMITHY_TRAITS.HTTP_ERROR, code);
  }

  /**
   * Get the HTTP error code
   */
  getCode(): number {
    return this.value;
  }

  /**
   * Check if this is a client error (4xx)
   */
  isClientError(): boolean {
    return this.value >= 400 && this.value < 500;
  }

  /**
   * Check if this is a server error (5xx)
   */
  isServerError(): boolean {
    return this.value >= 500 && this.value < 600;
  }
}

/**
 * HTTP label trait - binds a member to a URI label
 * @see https://smithy.io/2.0/spec/http-bindings.html#httplabel-trait
 */
export class HttpLabelTrait extends MarkerTrait {
  constructor() {
    super(SMITHY_TRAITS.HTTP_LABEL);
  }
}

/**
 * HTTP query trait - binds a member to a query string parameter
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpquery-trait
 */
export class HttpQueryTrait extends StringTrait {
  constructor(paramName: string) {
    super(SMITHY_TRAITS.HTTP_QUERY, paramName);
  }

  /**
   * Get the query parameter name
   */
  getParameterName(): string {
    return this.value;
  }
}

/**
 * HTTP header trait - binds a member to an HTTP header
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpheader-trait
 */
export class HttpHeaderTrait extends StringTrait {
  constructor(headerName: string) {
    super(SMITHY_TRAITS.HTTP_HEADER, headerName);
  }

  /**
   * Get the header name
   */
  getHeaderName(): string {
    return this.value;
  }

  /**
   * Get the header name in lowercase (canonical form)
   */
  getCanonicalHeaderName(): string {
    return this.value.toLowerCase();
  }
}

/**
 * HTTP payload trait - binds a member to the HTTP payload
 * @see https://smithy.io/2.0/spec/http-bindings.html#httppayload-trait
 */
export class HttpPayloadTrait extends MarkerTrait {
  constructor() {
    super(SMITHY_TRAITS.HTTP_PAYLOAD);
  }
}

/**
 * HTTP response code trait - defines the HTTP status code for a successful response
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpresponsecode-trait
 */
export class HttpResponseCodeTrait extends NumberTrait {
  constructor(code: number) {
    super('smithy.api#httpResponseCode', code);
  }

  /**
   * Get the response code
   */
  getCode(): number {
    return this.value;
  }

  /**
   * Check if this is a success code (2xx)
   */
  isSuccess(): boolean {
    return this.value >= 200 && this.value < 300;
  }

  /**
   * Check if this is a redirect code (3xx)
   */
  isRedirect(): boolean {
    return this.value >= 300 && this.value < 400;
  }
}

/**
 * CORS trait - configures CORS for a service
 * @see https://smithy.io/2.0/spec/http-bindings.html#cors-trait
 */
export class CorsTrait extends ObjectTrait<{
  origin?: string;
  maxAge?: number;
  additionalAllowedHeaders?: string[];
  additionalExposedHeaders?: string[];
}> {
  constructor(
    value: {
      origin?: string;
      maxAge?: number;
      additionalAllowedHeaders?: string[];
      additionalExposedHeaders?: string[];
    } = {}
  ) {
    super('smithy.api#cors', value);
  }

  /**
   * Get the allowed origin
   */
  getOrigin(): string | undefined {
    return this.value.origin;
  }

  /**
   * Get the max age for preflight requests
   */
  getMaxAge(): number | undefined {
    return this.value.maxAge;
  }

  /**
   * Get additional allowed headers
   */
  getAdditionalAllowedHeaders(): string[] {
    return this.value.additionalAllowedHeaders ?? [];
  }

  /**
   * Get additional exposed headers
   */
  getAdditionalExposedHeaders(): string[] {
    return this.value.additionalExposedHeaders ?? [];
  }
}
