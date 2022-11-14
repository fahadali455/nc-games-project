const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");

beforeEach(() => seed(data));

afterAll(() => {
    if (db.end) db.end();
});

describe('Get /api/categories', () => {
    test("200: response with array of all categories with slug and description properties", () => {
        return request(app)
            .get("/api/categories")
            .expect(200)
            .then( res => {
                const { categories } = res.body;
                expect(categories).toBeInstanceOf(Array);
                categories.forEach((category) => {
                    expect(category).toEqual(
                        expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String),
                        })
                    );
                });
            });
    });
});
