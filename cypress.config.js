const { defineConfig } = require("cypress");
const cypress = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "tests/cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern : "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
      supportFile: "tests/cypress/support/component.js",
    },
  },
  fixturesFolder: "tests/cypress/fixtures",
  screenshotsFolder: "tests/cypress/screenshots",
  videosFolder: "tests/cypress/videos",
  downloadsFolder: "tests/cypress/downloads",
});

