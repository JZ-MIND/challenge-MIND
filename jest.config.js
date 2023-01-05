module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
    browsers: ["chrome", "firefox", "safari"],
  },
  setupFiles: ["<rootDir>/jest-shim.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(style.js|css|scss|png|svg|ttf|gif|jpeg|jpg)$":
      "<rootDir>/src/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
  modulePaths: ["<rootDir>/src/"],
  transform: {
    "^.+\\.[j]sx?$": "babel-jest",
  },
};
