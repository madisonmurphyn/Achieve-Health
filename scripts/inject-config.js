#!/usr/bin/env node
/**
 * Reads .env and generates config.js for the browser.
 * Run before serving: node scripts/inject-config.js
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const configPath = path.join(rootDir, 'public', 'config.js');

if (!fs.existsSync(envPath)) {
  console.error('.env file not found. Copy .env.example to .env and add your agent ID.');
  process.exit(1);
}

const env = fs.readFileSync(envPath, 'utf8');
const getEnv = (key) => {
  const m = env.match(new RegExp(key + '=(.+)'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
};

const agentId = getEnv('ELEVENLABS_AGENT_ID');
const zapierUrl = getEnv('ZAPIER_INTAKE_EMAIL_HOOK_URL');
const clinicName = getEnv('CLINIC_NAME') || 'Clinic';
const clinicAddress = getEnv('CLINIC_ADDRESS') || '';
const clinicPhone = getEnv('CLINIC_PHONE') || '';

if (!agentId) {
  console.error('ELEVENLABS_AGENT_ID not set in .env');
  process.exit(1);
}

const config = `// Auto-generated from .env - do not edit
window.ELEVENLABS_AGENT_ID = '${agentId}';
window.ZAPIER_INTAKE_EMAIL_HOOK_URL = ${zapierUrl ? `'${zapierUrl}'` : '""'};
window.CLINIC_NAME = '${clinicName.replace(/'/g, "\\'")}';
window.CLINIC_ADDRESS = '${clinicAddress.replace(/'/g, "\\'")}';
window.CLINIC_PHONE = '${clinicPhone.replace(/'/g, "\\'")}';
`;

const publicDir = path.dirname(configPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(configPath, config);
console.log('config.js generated in public/');
