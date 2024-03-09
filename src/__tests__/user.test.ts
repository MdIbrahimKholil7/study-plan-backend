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
  describe("POST User Controller - Signup", () => {
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
      (UserService.createUserService as jest.Mock).mockResolvedValue(
        createdUser
      );

      // Make a POST request to the signup route
      const res = await supertest(app)
        .post("/api/v1/user/signup")
        .send(userData);
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
      const res = await supertest(app)
        .post("/api/v1/user/signup")
        .send(userData);
      // Expect the response status code to be 500 (Internal Server Error)
      expect(res.status).toBe(500);
      // Expect the response data to contain an error message
      expect(res.body.message).toEqual("Failed to create user");
      expect(res.body.success).toBeFalsy();

      // Ensure that UserService.createUserService was called with the provided data
      expect(UserService.createUserService).toHaveBeenCalledWith(userData);
    });
  });
  describe("POST User Controller - Login", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should successfully login", async () => {
      // Mock the user credentials
      const email = "test@example.com";
      const password = "password123";

      // Mock the data returned by UserService.loginUserService
      const userData = {
        _id: "user_id",
        email,
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock UserService.loginUserService to return the user data
      (UserService.loginUserService as jest.Mock).mockResolvedValue(userData);

      // Make a POST request to the login route
      const res = await supertest(app)
        .post("/api/v1/user/login")
        .send({ email, password });

      // Expect the response status code to be 200
      expect(res.status).toBe(200);

      // Expect the response data to contain the user data and an access token
      expect(res.body).toEqual({
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: {
          _id: expect.any(String),
          email,
          name: "Test User",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          accessToken: expect.any(String),
        },
      });

      // Ensure that UserService.loginUserService was called with the provided credentials
      expect(UserService.loginUserService).toHaveBeenCalledWith(
        email,
        password
      );
    });

    it("should fail to login", async () => {
      // Mock the user credentials
      const email = "test@example.com";
      const password = "password123";

      // Mock UserService.loginUserService to throw an error
      (UserService.loginUserService as jest.Mock).mockRejectedValue(
        new Error("Login failed")
      );

      // Make a POST request to the login route
      const res = await supertest(app)
        .post("/api/v1/user/login")
        .send({ email, password });

      // Expect the response status code to be 401 (Unauthorized)
      expect(res.status).toBe(500);

      // Expect the response data to contain an error message
      expect(res.body).toEqual({
        success: false,
        message: "Login failed",
      });

      // Ensure that UserService.loginUserService was called with the provided credentials
      expect(UserService.loginUserService).toHaveBeenCalledWith(
        email,
        password
      );
    });
  });
});
