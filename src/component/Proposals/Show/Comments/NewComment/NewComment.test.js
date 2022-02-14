import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import NewComment from "./NewComment";

const saveNewComment = (_newComment) => {
  return {};
};

const props = {
  onSave: (newComment) => saveNewComment(newComment),
};

describe("Resolutions.Show.ProsAndCons.ProsAndConsList", () => {
  it("Test in 'debug' mode", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <NewComment {...props} />
      </ThemeProvider>
    );

    expect(component).toMatchSnapshot();
    const newComment = component.find("NewComment");
    expect(newComment.prop("onSave")).toEqual(props.onSave);
  });
});
