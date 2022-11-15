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

describe('Get /api/reviews', () => {
    test("200: response with array of all reviews containing all the correct properties", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then( res => {
                const { reviews } = res.body;
                expect(reviews).toBeInstanceOf(Array);
                reviews.forEach((review) => {
                    expect(review).toEqual(
                        expect.objectContaining({
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            designer: expect.any(String),
                            comment_count: expect.any(Number)
                        })
                    );
                });
            });
    });

    test("200: response with array of all reviews containing correct comment_count", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then( res => {
                const { reviews } = res.body;
                expect(reviews).toBeInstanceOf(Array);

                let reviewId1 = reviews.find(item => item.review_id === 1);
                
                expect(reviewId1).toEqual(
                    expect.objectContaining({
                        comment_count: 0
                    })
                );

                let reviewId2 = reviews.find(item => item.review_id === 2);
                
                expect(reviewId2).toEqual(
                    expect.objectContaining({
                        comment_count: 3
                    })
                );
            });
    });

    test("200: response with array of all reviews sorted by date in descending order", () => {
        return request(app)
            .get("/api/reviews")
            .expect(200)
            .then( res => {
                const { reviews } = res.body;
                let prevDate = new Date();
                let currentDate;
                reviews.forEach((review) => {
                    currentDate = new Date(review.created_at);
                    expect(prevDate>=currentDate).toBeTruthy();
                    prevDate = currentDate;
                });
            });
    });
});
