/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/', 'utils'],
    setupFiles: ['dotenv/config'],
    testPathIgnorePatterns: ['utils', '.d.ts', '.js'],
};
