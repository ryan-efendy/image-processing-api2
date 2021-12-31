import request from 'supertest';
import app from '../../src/app';

describe('GET /api/health', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/images', () => {
    describe('given a filename, width and height ', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/api/images').query({
                filename: 'encenadaport',
                width: 200,
                height: 200
            });
            expect(response.statusCode).toBe(200);
        });
    });
});
