import { renderHook, waitFor } from "@testing-library/react";
import { useApp } from "../useApp";
import * as requests from "../requests/poll";
import { Poll } from "../requests/models";
import { AxiosResponse } from "axios";
import { mockPoll } from "./mocks";

const getPollSpy = jest.spyOn(requests, "getActivePoll");

describe("useApp", () => {
  beforeEach(() => {
    getPollSpy.mockResolvedValue({ data: mockPoll } as AxiosResponse<Poll>);
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should return values correctly", async () => {
    const { result } = renderHook(useApp);
    expect(result.current).toStrictEqual({
      activePoll: undefined,
      error: undefined,
      isLoading: true,
    });
    await waitFor(() => {
      expect(result.current).toStrictEqual({
        activePoll: mockPoll,
        error: undefined,
        isLoading: false,
      });
    });
  });
  it("should return errors correctly", async () => {
    getPollSpy.mockRejectedValue({ status: 404 });
    const { result } = renderHook(useApp);
    expect(result.current).toStrictEqual({
      activePoll: undefined,
      error: undefined,
      isLoading: true,
    });
    await waitFor(() => {
      expect(result.current).toStrictEqual({
        activePoll: undefined,
        error:
          "There are no active polls at the moment. Please check in later.",
        isLoading: false,
      });
    });
  });
});
