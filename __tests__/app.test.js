const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
require("jest-sorted");

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
                        comment_count: 1
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
                expect(reviews).toBeSortedBy("created_at", {descending: true,});
            });
    });
});

describe('Get /api/reviews/:review_id', () => {
    test("200: response with correct review object", () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then( res => {
                const { review } = res.body;
                expect(review).toBeInstanceOf(Object);
                expect(review).toEqual(
                    expect.objectContaining({
                        review_id: 1,
                        title: "Agricola",
                        review_body: "Farmyard fun!",
                        designer: "Uwe Rosenberg",
                        review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                        votes: 1,
                        category: "euro game",
                        owner: "mallionaire",
                        created_at: "2021-01-18T10:00:20.514Z",
                    })
               );
            });
    });

    test("400: response with 400 bad request error", () => {
        return request(app)
            .get("/api/reviews/test")
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toBe("Bad Request!");
                
            });
    });

    test("400: response with 404 resource not found error", () => {
        return request(app)
            .get("/api/reviews/99")
            .expect(404)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toBe("Resource not found.");
                
            });
    });
});