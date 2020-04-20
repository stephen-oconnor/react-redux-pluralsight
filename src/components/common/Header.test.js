import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// With shallow you can search for the React component tag.
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;

  expect(numLinks).toEqual(3);
});

// With mount you search for the final rendered HTML.
// We also need to pull in React Router's memoryRouter since the Header is a child of React Router and receive React Router's props.
it("constains 3 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
});
