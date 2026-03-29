/**
 * HTTP-related trait implementations
 * @module traits/http-traits
 */
import type { HttpTrait as HttpTraitType } from '../types.js';
import { MarkerTrait, NumberTrait, ObjectTrait, StringTrait } from './base-trait.js';
/**
 * HTTP trait - defines HTTP binding for operations
 * @see https://smithy.io/2.0/spec/http-bindings.html#http-trait
 */
export declare class HttpTrait extends ObjectTrait<HttpTraitType> {
  constructor(value: HttpTraitType);
  /**
   * Get the HTTP method
   */
  getMethod(): string;
  /**
   * Get the URI pattern
   */
  getUri(): string;
  /**
   * Get the HTTP status code (if specified)
   */
  getCode(): number | undefined;
  /**
   * Check if this is a specific HTTP method
   */
  isMethod(method: string): boolean;
  /**
   * Check if the URI contains path parameters
   */
  hasPathParameters(): boolean;
  /**
   * Extract path parameter names from the URI
   */
  getPathParameters(): string[];
}
/**
 * HTTP error trait - marks an error structure with HTTP status code
 * @see https://smithy.io/2.0/spec/http-bindings.html#httperror-trait
 */
export declare class HttpErrorTrait extends NumberTrait {
  constructor(code: number);
  /**
   * Get the HTTP error code
   */
  getCode(): number;
  /**
   * Check if this is a client error (4xx)
   */
  isClientError(): boolean;
  /**
   * Check if this is a server error (5xx)
   */
  isServerError(): boolean;
}
/**
 * HTTP label trait - binds a member to a URI label
 * @see https://smithy.io/2.0/spec/http-bindings.html#httplabel-trait
 */
export declare class HttpLabelTrait extends MarkerTrait {
  constructor();
}
/**
 * HTTP query trait - binds a member to a query string parameter
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpquery-trait
 */
export declare class HttpQueryTrait extends StringTrait {
  constructor(paramName: string);
  /**
   * Get the query parameter name
   */
  getParameterName(): string;
}
/**
 * HTTP header trait - binds a member to an HTTP header
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpheader-trait
 */
export declare class HttpHeaderTrait extends StringTrait {
  constructor(headerName: string);
  /**
   * Get the header name
   */
  getHeaderName(): string;
  /**
   * Get the header name in lowercase (canonical form)
   */
  getCanonicalHeaderName(): string;
}
/**
 * HTTP payload trait - binds a member to the HTTP payload
 * @see https://smithy.io/2.0/spec/http-bindings.html#httppayload-trait
 */
export declare class HttpPayloadTrait extends MarkerTrait {
  constructor();
}
/**
 * HTTP response code trait - defines the HTTP status code for a successful response
 * @see https://smithy.io/2.0/spec/http-bindings.html#httpresponsecode-trait
 */
export declare class HttpResponseCodeTrait extends NumberTrait {
  constructor(code: number);
  /**
   * Get the response code
   */
  getCode(): number;
  /**
   * Check if this is a success code (2xx)
   */
  isSuccess(): boolean;
  /**
   * Check if this is a redirect code (3xx)
   */
  isRedirect(): boolean;
}
/**
 * CORS trait - configures CORS for a service
 * @see https://smithy.io/2.0/spec/http-bindings.html#cors-trait
 */
export declare class CorsTrait extends ObjectTrait<{
  origin?: string;
  maxAge?: number;
  additionalAllowedHeaders?: string[];
  additionalExposedHeaders?: string[];
}> {
  constructor(value?: {
    origin?: string;
    maxAge?: number;
    additionalAllowedHeaders?: string[];
    additionalExposedHeaders?: string[];
  });
  /**
   * Get the allowed origin
   */
  getOrigin(): string | undefined;
  /**
   * Get the max age for preflight requests
   */
  getMaxAge(): number | undefined;
  /**
   * Get additional allowed headers
   */
  getAdditionalAllowedHeaders(): string[];
  /**
   * Get additional exposed headers
   */
  getAdditionalExposedHeaders(): string[];
}
//# sourceMappingURL=http-traits.d.ts.map
