import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import Cards from "./Cards";

const props = {
  resolution: resolutions[0],
  id: resolutions[0].id,
};

describe("Resolutions.Indexes.ListView.Cards", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // TODO You need to change the way your render your shnapshot
  xit("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <Cards {...props} />
      </ThemeProvider>
    ).children();

    expect(component).toMatchSnapshot();
    const cards = component.find("Cards");
    expect(cards.prop("resolution")).toEqual(props.resolution);
    expect(cards.prop("id")).toEqual(props.id);
  });
});
