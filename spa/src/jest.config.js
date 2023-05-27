module.exports = {
    preset: 'ts-jest',
    
    testEnvironment: 'node',
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.svg$": "jest-transformer-svg",
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).js?(x)'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
        babelConfig: true,
        diagnostics: false,
      },
    },
    // configuração para suportar ESM
    esm: {
      node: true,
      jest: true,
    },
  };