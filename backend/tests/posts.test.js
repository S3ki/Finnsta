const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Assuming this is your Express app
const api = supertest(app);
const User = require("../models/userSchema"); // Assuming this is your User model
const Post = require("../models/postSchema");
const posts = [
  {
    "title": "First Sample Post",
    "text": "This is the text for the first sample post."
  },
  {
    "title": "Second Sample Post",
    "text": "This is the text for the second sample post."
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({
        email: 'fifi@gotit.com',
        password: 'Z#!fifi123456!'
    });
  token = result.body.token;
});

describe("Post API endpoint tests", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
    for (const post of posts) {
      await api
        .post("/api/posts")
        .set("Authorization", "bearer " + token)
        .send(post);
    }
  });
  it("should return all posts as JSON when GET /api/posts is called", async () => {
    await api
      .get("/api/posts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one post when POST /api/posts is called", async () => {
    const newPost = {
      title: "New Test Post",
      text: "This is the text for the new test post."
    };
    await api
      .post("/api/posts")
      .set("Authorization", "bearer " + token)
      .send(newPost)
      .expect(201);
  });

  it("should return one post by ID when GET /api/posts/:id is called", async () => {
    const post = await Post.findOne();
    await api
      .get("/api/posts/" + post._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one post by ID when PUT /api/posts/:id is called", async () => {
    const post = await Post.findOne();
    const updatedPost = {
        title: "Updated Test Post",
        text: "This is the updated text for the test post."
      };
   
    await api
      .put("/api/posts/" + post._id)
      .set("Authorization", "bearer " + token)
      .send(updatedPost)
      .expect(200);
    const updatedPostCheck = await Post.findById(post._id);
    expect(updatedPostCheck.toJSON()).toEqual(expect.objectContaining(updatedPost));
  });

  it("should delete one post by ID when DELETE /api/posts/:id is called", async () => {
    const post = await Post.findOne();
    await api
      .delete("/api/posts/" + post._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const postCheck = await Post.findById(post._id);
    expect(postCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();

});