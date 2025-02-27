#!/usr/bin/env node

const { PORTAL_PACKAGES } = require('../constants');
const { runNpmScripts } = require('./commands');

runNpmScripts({
  data: [
    {
      packageName: PORTAL_PACKAGES.tenant.packageName,
      npmScriptName: 'build:development',
    },
  ],
});
