/**
 * Integration tests using the test fixtures
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Smithy } from '../src/smithy';

describe('Test Fixtures Integration', () => {
  const fixturesDir = join(__dirname, 'fixtures');

  describe('Valid Models', () => {
    test('should load and validate weather-service.json', () => {
      const modelJson = readFileSync(join(fixturesDir, 'weather-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      expect(smithy.version).toBe('2.0');
      expect(smithy.metadata).toBeDefined();
      expect(smithy.metadata?.authors).toEqual(['weather-team@example.com']);

      // Check services
      const services = smithy.getServices();
      expect(services).toHaveLength(1);
      expect(services[0]?.version).toBe('2006-03-01');

      // Check operations
      const operations = smithy.getOperations('example.weather#Weather');
      expect(operations).toHaveLength(3);

      // Check resources
      const resources = smithy.getResources('example.weather#Weather');
      expect(resources).toHaveLength(1);

      // Check HTTP bindings
      const binding = smithy.getHttpBinding('example.weather#GetCurrentWeather');
      expect(binding).toBeDefined();
      expect(binding?.method).toBe('GET');
      expect(binding?.uri).toBe('/weather/current/{city}');
    });

    test('should load and validate simple-service.json', () => {
      const modelJson = readFileSync(join(fixturesDir, 'simple-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      expect(smithy.version).toBe('2.0');
      expect(smithy.metadata).toBeUndefined();

      const services = smithy.getServices();
      expect(services).toHaveLength(1);
      expect(services[0]?.version).toBe('1.0.0');

      const operations = smithy.getOperations('example.simple#SimpleService');
      expect(operations).toHaveLength(1);
    });

    test('should load and validate complex-service.json', () => {
      const modelJson = readFileSync(join(fixturesDir, 'complex-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      expect(smithy.version).toBe('2.0');
      expect(smithy.metadata).toBeDefined();
      expect(smithy.metadata?.version).toBe('2.0.0');

      const services = smithy.getServices();
      expect(services).toHaveLength(1);

      const operations = smithy.getOperations('example.complex#ComplexService');
      expect(operations).toHaveLength(4); // Only 4 operations are directly bound to the service

      const resources = smithy.getResources('example.complex#ComplexService');
      expect(resources).toHaveLength(2);

      // Test pagination trait
      const listUsersOp = smithy.getShape('example.complex#ListUsers');
      expect(smithy.hasTrait('example.complex#ListUsers', 'smithy.api#paginated')).toBe(true);
    });
  });

  describe('Invalid Models', () => {
    test('should reject model with missing version', () => {
      const modelJson = readFileSync(join(fixturesDir, 'invalid-missing-version.json'), 'utf-8');
      expect(() => new Smithy(modelJson)).toThrow();
    });

    test('should reject model with missing shapes', () => {
      const modelJson = readFileSync(join(fixturesDir, 'invalid-missing-shapes.json'), 'utf-8');
      expect(() => new Smithy(modelJson)).toThrow();
    });

    test('should detect invalid shape references', () => {
      const modelJson = readFileSync(join(fixturesDir, 'invalid-shape-references.json'), 'utf-8');
      const smithy = new Smithy(modelJson);
      const result = smithy.validate();

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      // Should have errors for non-existent references
      const errorMessages = result.errors.map(e => e.message).join(' ');
      expect(errorMessages).toContain('NonExistent');
    });

    test('should detect invalid traits', () => {
      const modelJson = readFileSync(join(fixturesDir, 'invalid-traits.json'), 'utf-8');
      const smithy = new Smithy(modelJson);
      const result = smithy.validate();

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should reject invalid JSON', () => {
      const invalidJson = readFileSync(join(fixturesDir, 'invalid-json.txt'), 'utf-8');
      expect(() => new Smithy(invalidJson)).toThrow();
    });
  });

  describe('Code Generation with Fixtures', () => {
    test('should generate TypeScript from weather service', () => {
      const modelJson = readFileSync(join(fixturesDir, 'weather-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      const tsCode = smithy.generateTypeScript({ includeComments: true });
      expect(tsCode).toContain('export interface GetCurrentWeatherInput');
      expect(tsCode).toContain('export interface GetCurrentWeatherOutput');
      expect(tsCode).toContain('export class WeatherClient');
      expect(tsCode).toContain('getCurrentWeather');
    });

    test('should generate JavaScript from simple service', () => {
      const modelJson = readFileSync(join(fixturesDir, 'simple-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      const jsCode = smithy.generateJavaScript({ includeComments: false });
      expect(jsCode).toContain('export class GetItemInput');
      expect(jsCode).toContain('export class SimpleServiceClient');
      expect(jsCode).toContain('getItem');
    });

    test('should generate Python from complex service', () => {
      const modelJson = readFileSync(join(fixturesDir, 'complex-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      const pyCode = smithy.generatePython({ includeComments: true });
      expect(pyCode).toContain('@dataclass');
      expect(pyCode).toContain('class CreateUserInput:');
      expect(pyCode).toContain('class ComplexServiceClient:');
      expect(pyCode).toContain('def create_user');
    });
  });

  describe('Selector Tests with Fixtures', () => {
    test('should select shapes using selectors on weather service', () => {
      const modelJson = readFileSync(join(fixturesDir, 'weather-service.json'), 'utf-8');
      const smithy = new Smithy(modelJson);

      // Select all structures
      const structures = smithy.select('structure');
      expect(structures.length).toBeGreaterThan(0);

      // Select shapes with readonly trait (operations have this)
      const readonly = smithy.select('[trait|readonly]');
      expect(readonly.length).toBeGreaterThan(0);

      // Select operations
      const operations = smithy.select('operation');
      expect(operations).toHaveLength(4); // 3 main operations + 1 station operation
    });
  });
});
