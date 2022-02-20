import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import DescriptionCard from "./DescriptionCard";

const props = {
  description: resolutions[0].content,
};

describe("Resolutions.Show.Overview.DescriptionCard", () => {
  it("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <DescriptionCard {...props} />
      </ThemeProvider>
    ).children();
    expect(component).toMatchSnapshot();
    const descriptionCard = component.find("DescriptionCard");

    expect(descriptionCard.prop("description")).toEqual(props.description);
  });
});
