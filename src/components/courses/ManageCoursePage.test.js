import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
  // All props should be passed into test.
  const defaultProps = {
    authors,
    courses,
    history: {}, // React Router. Stubbing out but could pull in MemoryRouter (Header).
    match: {}, // React Router. Stubbing out but could pull in MemoryRouter (Header).
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
  };

  const props = { ...defaultProps, ...args };

  // DOM rendered.
  return mount(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  // Simulate form submit.
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();

  expect(error.text()).toBe("Title is required.");
});
