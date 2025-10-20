#!/usr/bin/env bun

/**
 * Script to validate GitHub Actions workflow files
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const workflowsDir = join(process.cwd(), '.github/workflows');

try {
  const files = readdirSync(workflowsDir).filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
  
  console.log('🔍 Validating GitHub Actions workflows...\n');
  
  let allValid = true;
  
  for (const file of files) {
    const filePath = join(workflowsDir, file);
    const content = readFileSync(filePath, 'utf-8');
    
    try {
      const workflow = parse(content);
      
      // Basic validation
      if (!workflow.name) {
        console.log(`❌ ${file}: Missing 'name' field`);
        allValid = false;
        continue;
      }
      
      if (!workflow.on) {
        console.log(`❌ ${file}: Missing 'on' field`);
        allValid = false;
        continue;
      }
      
      if (!workflow.jobs || Object.keys(workflow.jobs).length === 0) {
        console.log(`❌ ${file}: Missing or empty 'jobs' field`);
        allValid = false;
        continue;
      }
      
      // Check each job has required fields
      for (const [jobName, job] of Object.entries(workflow.jobs)) {
        if (typeof job !== 'object' || !job) continue;
        
        const jobObj = job as any;
        if (!jobObj['runs-on']) {
          console.log(`❌ ${file}: Job '${jobName}' missing 'runs-on' field`);
          allValid = false;
        }
        
        if (!jobObj.steps || !Array.isArray(jobObj.steps) || jobObj.steps.length === 0) {
          console.log(`❌ ${file}: Job '${jobName}' missing or empty 'steps' field`);
          allValid = false;
        }
      }
      
      console.log(`✅ ${file}: Valid workflow`);
      
    } catch (error) {
      console.log(`❌ ${file}: YAML parsing error - ${error}`);
      allValid = false;
    }
  }
  
  console.log(`\n${allValid ? '🎉' : '💥'} Workflow validation ${allValid ? 'passed' : 'failed'}`);
  
  if (!allValid) {
    process.exit(1);
  }
  
} catch (error) {
  console.error('Error validating workflows:', error);
  process.exit(1);
}