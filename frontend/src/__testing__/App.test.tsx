import App from "../App";
import { render } from "../utils/test.utils";

import * as appHook from "../useApp";
import * as questionHook from "../components/Poll/Question/useQuestion";
import { mockPoll } from "./mocks";

const useAppSpy = jest.spyOn(appHook, "useApp");
const useQuestionSpy = jest.spyOn(questionHook, "useQuestion");

describe("App", () => {
  beforeEach(() => {
    useAppSpy.mockReturnValue({
      isLoading: false,
      error: undefined,
      activePoll: mockPoll,
    });
    useQuestionSpy.mockReturnValue({
      isLoading: false,
      error: undefined,
      selectedOption: undefined,
      onSubmit: jest.fn(),
      updateSelectedOption: jest.fn(),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });
});
