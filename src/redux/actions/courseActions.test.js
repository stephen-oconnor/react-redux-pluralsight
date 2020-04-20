import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action.
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  // Initialise fetchMock for each test.
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      // Configure fetchMock. Mimic fetch call.
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      });

      // Configure actions to be fired from thunk.
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      // Create a mock redux store.
      const store = mockStore({ courses: [] });

      // Dispatch loadCourses action.
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // Arrange.
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course: course,
    };

    // Act.
    const action = courseActions.createCourseSuccess(course);

    // Assert.
    expect(action).toEqual(expectedAction);
  });
});
