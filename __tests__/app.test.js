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

    test("200: response with correct review object and comment count", () => {
        return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then( res => {
                const { review } = res.body;
                expect(review).toBeInstanceOf(Object);
                expect(review).toMatchObject({
                        review_id: 2,
                        title: 'Jenga',
                        designer: 'Leslie Scott',
                        owner: 'philippaclaire9',
                        review_img_url:
                        'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        review_body: 'Fiddly fun for all the family',
                        category: 'dexterity',
                        created_at: expect.any(String),
                        votes: 5,
                        comment_count: 3
                    })
            });
    });

    test("200: response with correct comment count of 0 when no reviews found", () => {
        return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then( res => {
                const { review } = res.body;
                expect(review).toBeInstanceOf(Object);
                expect(review).toMatchObject({
                        review_id: 1,
                        title: "Agricola",
                        review_body: "Farmyard fun!",
                        designer: "Uwe Rosenberg",
                        review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                        votes: 1,
                        category: "euro game",
                        owner: "mallionaire",
                        created_at: "2021-01-18T10:00:20.514Z",
                        comment_count: 0,
                    })
            });
    });

});

describe('Get /api/reviews/:review_id/comments', () => {
    test("200: response with correct array containing reviews", () => {
        return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then( res => {
                const { comments } = res.body;
                expect(comments).toBeInstanceOf(Array);
                comments.forEach(comment => {
                    expect(comment).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                            review_id: 2,
                        })
                })
            });
    });

    test("400: response with 400 bad request error", () => {
        return request(app)
            .get("/api/reviews/test/comments")
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toBe("Bad Request!");
                
            });
    });

    test("400: response with 404 resource not found error", () => {
        return request(app)
            .get("/api/reviews/99/comments")
            .expect(404)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toBe("Resource not found.");
                
            });
    });

    test("200: response with empty array when review id exists but no corresponding comments", () => {
        return request(app)
            .get("/api/reviews/1/comments")
            .expect(200)
            .then( res => {
                const { comments } = res.body;
                expect(comments).toEqual([]);
                
            });
    });

    test("200: response with comments array sorted by most recent comments first", () => {
        return request(app)
            .get("/api/reviews/3/comments")
            .expect(200)
            .then( res => {
                const { comments } = res.body;
                expect(comments).toBeSortedBy("created_at", {descending: true});
                
            });
    });
    
});

describe('POST /api/reviews/:review_id/comments', () => {
    test("201: response with posted object", () => {
        const newComment = {
            username:"mallionaire",
            body:"test"
        }

        return request(app)
            .post("/api/reviews/1/comments")
            .send(newComment)
            .expect(201)
            .then( res => {
                const { comment } = res.body;
                expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        review_id: 1,
                        author: newComment.username,
                        body: newComment.body,
                        votes: 0,
                        created_at: expect.any(String)  
                })
            });
    });

    test("400: response with bad request error if review id not in correct format", () => {
        const newComment = {
            username:"mallionaire",
            body:"test"
        }
        
        return request(app)
            .post("/api/reviews/test/comments")
            .send(newComment)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });

    test("404: response with bad request error if review id in correct format but does not exist", () => {
        const newComment = {
            username:"mallionaire",
            body:"test"
        }
        
        return request(app)
            .post("/api/reviews/50/comments")
            .send(newComment)
            .expect(404)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Resource not found.")
            });
    });

    test("404: response with bad request error if username does not exist", () => {
        const newComment = {
            username:"test",
            body:"test"
        }
        
        return request(app)
            .post("/api/reviews/5/comments")
            .send(newComment)
            .expect(404)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Resource not found.")
            });
    });

    test("400: response with bad request error if body missing properties", () => {
        const newComment = {
            body:"test"
        }
        
        return request(app)
            .post("/api/reviews/5/comments")
            .send(newComment)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });
});


describe('PATCH /api/reviews/:review_id', () => {
    test("200: response with updated object", () => {
        const votesInc = {
            inc_votes: 5,
        }

        return request(app)
            .patch("/api/reviews/2")
            .send(votesInc)
            .expect(200)
            .then( res => {
                const { review } = res.body;
                expect(review).toMatchObject({
                    review_id: 2,
                    title: 'Jenga',
                    category: 'dexterity',
                    designer: 'Leslie Scott',
                    owner: 'philippaclaire9',
                    review_body: 'Fiddly fun for all the family',
                    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                    created_at: expect.any(String),
                    votes: 10
                })
            });
    });

    test("400: response with bad request error if body missing inc_votes property", () => {
        const votesInc = {
            body:"test"
        }
        
        return request(app)
            .patch("/api/reviews/2/")
            .send(votesInc)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });

    test("400: response with bad request error if inc_votes property invalid format", () => {
        const votesInc = {
            inc_votes:"test"
        }
        
        return request(app)
            .patch("/api/reviews/2/")
            .send(votesInc)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });

    test("404: response with not found error if review id does not exist", () => {
        const votesInc = {
            inc_votes: 5,
        }
        
        return request(app)
            .patch("/api/reviews/99")
            .send(votesInc)
            .expect(404)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Resource not found.")
            });
    });

    test("400: response with bad request error if review id not in corect format", () => {
        const votesInc = {
            inc_votes: 5,
        }
        
        return request(app)
            .patch("/api/reviews/test")
            .send(votesInc)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });

    test("400: response with bad request error if body contains other properties", () => {
        const votesInc = {
            inc_votes: 5,
            test: "test"
        }
        
        return request(app)
            .patch("/api/reviews/2")
            .send(votesInc)
            .expect(400)
            .then( res => {
                const { msg } = res.body;
                expect(msg).toEqual("Bad Request!")
            });
    });

});

describe('Get /api/users', () => {
    test("200: response with array of all the user objects", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then( res => {
                const { users } = res.body;
                expect(users).toBeInstanceOf(Array);
                expect(users.length).toBeGreaterThan(1);
                users.forEach((user) => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String),
                        })
                    );
                });
            });
    });
});
