import app from "../app"; // Assuming your Express app is exported from 'app.ts'
import { UserService } from "../app/services/user.service"; // Import UserService
import supertest from "supertest";

// Mock the UserService
jest.mock("../app/services/user.service", () => ({
  UserService: {
    createUserService: jest.fn(),
    loginUserService: jest.fn(),
  },
}));

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });
  it("should create a new user", async () => {
    // Mock the data sent in the request body
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    // Mock the data returned by UserService.createUserService
    const createdUser = {
      _id: "user_id",
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock UserService.createUserService to return the created user data
    (UserService.createUserService as jest.Mock).mockResolvedValue(createdUser);

    // Make a POST request to the signup route
    const res = await supertest(app).post("/api/v1/user/signup").send(userData);
    // Expect the response status code to be 201
    expect(res.status).toBe(201);

    // Expect the response data to contain the created user data
    expect(res.body).toEqual({
      statusCode: 201,
      success: true,
      message: "User created successfully",
      data: expect.objectContaining({
        _id: expect.any(String),
        email: userData.email,
        name: userData.name,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        accessToken: expect.any(String),
      }),
    });

    // Expect UserService.createUserService to be called with the provided data
    expect(UserService.createUserService).toHaveBeenCalledWith(userData);
  });

  it("should fail to create a new user", async () => {
    // Mock the data sent in the request body
    const userData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };
    // Mock the UserService.createUserService to throw an error
    (UserService.createUserService as jest.Mock).mockRejectedValue(
      new Error("Failed to create user")
    );
    // Make a POST request to the signup route
    const res = await supertest(app).post("/api/v1/user/signup").send(userData);
    // Expect the response status code to be 500 (Internal Server Error)
    expect(res.status).toBe(500);
    // Expect the response data to contain an error message
    expect(res.body.message).toEqual("Failed to create user");
    expect(res.body.success).toBeFalsy();

    // Ensure that UserService.createUserService was called with the provided data
    expect(UserService.createUserService).toHaveBeenCalledWith(userData);
  });
});
