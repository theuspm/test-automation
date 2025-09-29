const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://test-automation-practice.com.br',
    setupNodeEvents(on, config) {

    },
  },
  env: {
    baseUrl: 'https://test-automation-practice.com.br'
  }
});