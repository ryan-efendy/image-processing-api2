import request from 'supertest';
import app from '../../src/app';

describe('GET /api/health', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/images', () => {
    describe('given a filename, width and height', () => {
        test.each`
            filename          | width        | height       | expected
            ${'encenadaport'} | ${undefined} | ${undefined} | ${400}
            ${undefined}      | ${200}       | ${undefined} | ${400}
            ${undefined}      | ${undefined} | ${200}       | ${400}
            ${undefined}      | ${200}       | ${200}       | ${400}
            ${'encenadaport'} | ${undefined} | ${200}       | ${400}
            ${'encenadaport'} | ${200}       | ${200}       | ${200}
        `(
            'returns $expected when filename: $filename, width: $width, heigth: $height',
            async ({ filename, width, height, expected }) => {
                const response = await request(app).get('/api/images').query({
                    filename,
                    width,
                    height
                });
                expect(response.statusCode).toBe(expected);
            }
        );
    });
    describe('given a format', () => {
        test.each`
            filename          | width  | height | format       | blur     | grayscale | expected
            ${'encenadaport'} | ${200} | ${200} | ${undefined} | ${false} | ${false}  | ${200}
            ${'encenadaport'} | ${200} | ${200} | ${'jpg'}     | ${false} | ${false}  | ${200}
            ${'encenadaport'} | ${200} | ${200} | ${'png'}     | ${false} | ${false}  | ${404}
        `(
            'returns $expected when filename: $filename, width: $width, heigth: $height, format: $format, blur: $blur, grayscale: $grayscale',
            async ({ filename, width, height, format, blur, grayscale, expected }) => {
                const response = await request(app).get('/api/images').query({
                    filename,
                    width,
                    height,
                    format,
                    blur,
                    grayscale
                });
                expect(response.statusCode).toBe(expected);
            }
        );
    });

    describe('given a blur, grayscale', () => {
        test.each`
            filename          | width  | height | format   | blur     | grayscale | expected
            ${'encenadaport'} | ${200} | ${200} | ${'jpg'} | ${true}  | ${false}  | ${200}
            ${'encenadaport'} | ${200} | ${200} | ${'jpg'} | ${false} | ${true}   | ${200}
            ${'encenadaport'} | ${200} | ${200} | ${'jpg'} | ${true}  | ${true}   | ${200}
            ${'encenadaport'} | ${200} | ${200} | ${'jpg'} | ${false} | ${false}  | ${200}
        `(
            'returns $expected when filename: $filename, width: $width, heigth: $height, format: $format, blur: $blur, grayscale: $grayscale',
            async ({ filename, width, height, format, blur, grayscale, expected }) => {
                const response = await request(app).get('/api/images').query({
                    filename,
                    width,
                    height,
                    format,
                    blur,
                    grayscale
                });
                expect(response.statusCode).toBe(expected);
            }
        );
    });
});
