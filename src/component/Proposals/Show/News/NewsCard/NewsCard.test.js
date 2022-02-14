import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import NewsCard from "./NewsCard";

const props = {
  news: resolutions[0].news.items[0],
};

describe("Resolutions.Show.Overview.NewsCard", () => {
  // TODO You need to chang this
  xit("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <NewsCard {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
