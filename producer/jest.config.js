module.exports = {
  verbose: true,
  testTimeout: 90000,
  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/**/*.test.ts"],
      moduleFileExtensions: ["ts", "js", "node"],
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
    },
    {
      displayName: "e2e",
      testMatch: ["<rootDir>/tests/e2e/**/*.test.ts"],
      moduleFileExtensions: ["ts", "js"],
      //globalSetup: '<rootDir>/tests/e2e/setup.ts',
      //globalTeardown: '<rootDir>/tests/e2e/teardown.ts',
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
    },
  ],
};
