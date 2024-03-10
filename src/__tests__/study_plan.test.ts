import request from "supertest";
import app from "../app"; // Assuming your Express app is exported from 'app.ts'
import StudyService from "../app/services/study.service"; // Import StudyService
import SessionModel from "../app/schema/study.schema"; // Import the SessionModel
import jwt from "jsonwebtoken";
// Mock the StudyService
jest.mock("../app/services/study.service", () => ({
  createStudyPlan: jest.fn(),
}));

// Mock the SessionModel
jest.mock("../app/schema/study.schema", () => ({
  create: jest.fn(),
}));
// Mock the JWT token verification function
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(), // Mock the verify function
}));
describe("Study Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it("should create a new study session", async () => {
    // Mock the data sent in the request body
    const studySessionData = {
      user: "user_id",
      subject: "Mathematics",
      duration: 4,
      priority: 1,
    };

    // Mock the data returned by StudyService.createStudyPlan
    const createdStudySession = {
      _id: "study_session_id",
      ...studySessionData,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    // Mock the JWT token verification function
    (jwt.verify as jest.Mock).mockReturnValue({ _id: "study_session_id" });
    // Mock StudyService.createStudyPlan to return the created study session data
    (StudyService.createStudyPlan as jest.Mock).mockResolvedValue(
      createdStudySession
    );

    // Mock SessionModel.create to return the created study session data
    (SessionModel.create as jest.Mock).mockResolvedValue(createdStudySession);

    // Make a POST request to the endpoint
    const res = await request(app)
      .post("/api/v1/study")
      .send(studySessionData)
      .set("Authorization", "Bearer your_access_token_here");

    // Expect the response status code to be 201
    expect(res.status).toBe(201);

    // Expect the response data to contain the created study session data
    expect(res.body).toEqual({
      statusCode: 201,
      success: true,
      message: "Study session created successfully",
      data: createdStudySession,
    });
  });
});
