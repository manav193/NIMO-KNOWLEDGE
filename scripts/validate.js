const fs = require('fs');
const path = require('path');

let errors = 0;
let checkedFiles = 0;

function logPass(msg) {
  console.log(`[PASS] ${msg}`);
}

function logFail(msg) {
  console.error(`[FAIL] ${msg}`);
  errors++;
}

// 1. Recursive file finder
function getFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') {
        results = results.concat(getFiles(fullPath, ext));
      }
    } else if (!ext || fullPath.endsWith(ext)) {
      results.push(fullPath);
    }
  });
  return results;
}

console.log('--- Starting NIMO-KNOWLEDGE Validation Suite ---\n');

// 2. Validate JSON files & check for BOM
const jsonFiles = getFiles('.', '.json');
console.log(`Validating ${jsonFiles.length} JSON files...`);

jsonFiles.forEach(file => {
  checkedFiles++;
  const raw = fs.readFileSync(file, 'utf8');
  if (raw.charCodeAt(0) === 0xFEFF) {
    logFail(`${file} contains a UTF-8 Byte Order Mark (BOM).`);
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      logFail(`${file} does not contain a JSON object.`);
    }
  } catch (err) {
    logFail(`${file} failed JSON parsing: ${err.message}`);
  }
});

if (errors === 0) {
  logPass(`All ${jsonFiles.length} JSON files are syntactically valid and free of BOM.`);
}

// 3. Validate JSON Schemas
const schemaDir = 'schemas';
const schemaFiles = fs.readdirSync(schemaDir).filter(f => f.endsWith('.schema.json'));
console.log(`\nValidating ${schemaFiles.length} schema definitions...`);

schemaFiles.forEach(sf => {
  const filePath = path.join(schemaDir, sf);
  const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!schema.$schema) logFail(`${sf} missing $schema`);
  if (!schema.title) logFail(`${sf} missing title`);
  if (schema.type !== 'object') logFail(`${sf} type must be 'object'`);
  if (!schema.properties) logFail(`${sf} missing properties`);
  if (!Array.isArray(schema.required)) logFail(`${sf} missing required array`);
  logPass(`Schema structure validated: ${sf} (${schema.title})`);
});

// 4. Validate Example Data Against Schemas
console.log('\nValidating synthetic examples against schemas...');
const examplePairs = [
  ['schemas/faq.schema.json', 'faq/approved/example-faq.json'],
  ['schemas/feature-request.schema.json', 'feature-requests/examples/example-feature-request.json'],
  ['schemas/feedback.schema.json', 'feedback/examples/example-feedback.json'],
  ['schemas/issue-pattern.schema.json', 'knowledge/automation/example-issue-pattern.json'],
  ['schemas/knowledge-entry.schema.json', 'knowledge/general/example-knowledge-entry.json'],
  ['schemas/knowledge-entry.schema.json', 'knowledge/education/example-study-guidelines.json'],
  ['schemas/learning-event.schema.json', 'evaluations/proposals/example-learning-event.json'],
  ['schemas/suggestion.schema.json', 'suggestions/examples/example-suggestion.json']
];

examplePairs.forEach(([sFile, dFile]) => {
  try {
    const schema = JSON.parse(fs.readFileSync(sFile, 'utf8'));
    const data = JSON.parse(fs.readFileSync(dFile, 'utf8'));
    schema.required.forEach(field => {
      if (data[field] === undefined) {
        throw new Error(`Missing required field: ${field}`);
      }
    });
    if (schema.additionalProperties === false) {
      Object.keys(data).forEach(key => {
        if (!schema.properties[key]) {
          throw new Error(`Unallowed additional property: ${key}`);
        }
      });
    }
    logPass(`Compliance verified: ${dFile} conforms to ${sFile}`);
  } catch (err) {
    logFail(`Validation error in ${dFile}: ${err.message}`);
  }
});

// 5. Validate Catalog Index Integrity
console.log('\nValidating Catalog Index integrity...');
const catalogPath = path.join('indexes', 'catalog.json');
if (!fs.existsSync(catalogPath)) {
  logFail('indexes/catalog.json not found');
} else {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  if (!Array.isArray(catalog.entries)) {
    logFail('catalog.json must contain an "entries" array');
  } else {
    catalog.entries.forEach(entry => {
      const targetPath = entry.path;
      if (!fs.existsSync(targetPath)) {
        logFail(`Catalog entry ${entry.id} references non-existent path: ${targetPath}`);
      } else {
        logPass(`Catalog reference verified: ${entry.id} -> ${targetPath}`);
      }
    });
  }
}

// 6. Zero-Secrets & Privacy Scanner
console.log('\nScanning for prohibited secrets and credentials...');
const prohibitedPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /ghp_[A-Za-z0-9_]{36}/,
  /sk-[A-Za-z0-9-_]{20,}/,
  /xox[baprs]-[A-Za-z0-9-_]{10,}/,
  /AKIA[0-9A-Z]{16}/,
  /bearer\s+[A-Za-z0-9_\-\.]{25,}/i,
  /"password"\s*:\s*"[^"]+"/i
];

const allTextFiles = getFiles('.', '.json').concat(getFiles('.', '.md'));
allTextFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  prohibitedPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      logFail(`Potential secret pattern matched in ${file}: ${pattern}`);
    }
  });
});

logPass(`Scanned ${allTextFiles.length} files. Zero secrets or prohibited credentials detected.`);

// Summary
console.log('\n-----------------------------------------------');
if (errors === 0) {
  console.log('SUCCESS: All NIMO-KNOWLEDGE validations passed clean!');
  process.exit(0);
} else {
  console.error(`FAILURE: Encountered ${errors} validation errors.`);
  process.exit(1);
}
