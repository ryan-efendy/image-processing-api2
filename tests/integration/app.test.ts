import request from 'supertest';
import app from '../../src/app';

describe('GET /api/health', () => {
    // describe('given a username ', () => {

    // });

    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
    });
});
