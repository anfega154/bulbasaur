const express = require('express');
const cors = require('cors');
const i18n = require('../../src/Utils/helpers/i18n');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Mocks
jest.mock('express');
jest.mock('cors');
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));
jest.mock('../../src/v1/User/Routers/UserRouters', () => jest.fn());
jest.mock('../../src/v1/Auth/Routers/ApiRouters', () => jest.fn());
jest.mock('../../src/v1/Follow/Roters/FollowRouters', () => jest.fn());
jest.mock('../../src/v1/Tweet/Routers/TweetRouters', () => jest.fn());
jest.mock('../../src/Utils/helpers/i18n', () => ({
  init: jest.fn(),
}));
jest.mock('swagger-ui-express', () => ({
  serve: jest.fn(),
  setup: jest.fn(),
}));
jest.mock('swagger-jsdoc', () => jest.fn());

describe('Server.js', () => {
    let app;
    let mockUse;
    let mockListen;

    beforeEach(() => {
        mockUse = jest.fn();
        mockListen = jest.fn();

        express.mockReturnValue({
            use: mockUse,
            listen: mockListen,
        });

        jest.isolateModules(() => {
            app = require('../../src/index');
        });
    });

    describe('with initialize the express', () => {
        test('should initialize the express app and middleware', () => {
            expect(express).toHaveBeenCalled(); // Asegura que express fue llamado
            expect(mockUse).toHaveBeenCalledWith(cors()); // Verifica que se llama cors
            expect(mockUse).toHaveBeenCalledWith(express.urlencoded({ extended: true }));
            expect(mockUse).toHaveBeenCalledWith(express.json());
            expect(mockUse).toHaveBeenCalledWith(i18n.init); // Verifica la inicialización de i18n
            expect(mockUse).toHaveBeenCalledWith('/api-docs', swaggerUi.serve, swaggerUi.setup(expect.anything())); // Verifica swagger
        });
    });

    describe('with listen on the correct port', () => {
        test('should listen on the correct port', () => {
            const PORT = process.env.PORT || 3700;

            expect(mockListen).toHaveBeenCalledWith(PORT, expect.any(Function));
        });
    });
});