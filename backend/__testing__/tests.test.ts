import request from "supertest";
import app from "../server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const findFirstOrThrowSpy = jest.fn();

jest.mock("../config/db.ts", () => ({
  poll: {
    findFirstOrThrow: () => findFirstOrThrowSpy(),
  },
}));

describe("pollController", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  describe("getActivePoll", () => {
    it("should get the active poll correctly", async () => {
      findFirstOrThrowSpy.mockReturnValue({
        id: "id",
        question: "question",
        options: [],
      });
      const response = await request(app).get("/api/poll/active");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", "id");
      expect(response.body).toHaveProperty("question", "question");
      expect(response.body).toHaveProperty("options", []);
    });
    it("should return 404 when it can't find a poll", async () => {
      findFirstOrThrowSpy.mockRejectedValue(
        new PrismaClientKnownRequestError("message", {
          code: "P2025",
          clientVersion: "",
        }),
      );
      const response = await request(app).get("/api/poll/active");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "No active poll found.");
    });
    it("should return 500 when it encounters an unknown error", async () => {
      findFirstOrThrowSpy.mockRejectedValue({});
      const response = await request(app).get("/api/poll/active");
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "Unexpected error.");
    });
  });
});
