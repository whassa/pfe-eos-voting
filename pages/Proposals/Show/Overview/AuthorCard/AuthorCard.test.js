import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import AuthorCard from "./AuthorCard";

const props = {
  author: resolutions[0].author,
};

describe("Resolutions.Show.Overview.AuthorCard", () => {
  it("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <AuthorCard {...props} />
      </ThemeProvider>
    ).children();
    expect(component).toMatchSnapshot();
    const authorCard = component.find("AuthorCard");

    expect(authorCard.prop("author")).toEqual(props.author);
  });
});
