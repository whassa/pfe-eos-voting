import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import NewProAndCon from "./NewProAndCon";

// TODO: Fix the test
describe("Resolutions.Show.ProsAndCons.NewProAndCon", () => {
  it.skip("Test", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <NewProAndCon />
      </ThemeProvider>
    );
    const newProAndCon = component.find("NewProAndCon");

    expect(component).toMatchSnapshot();
    const text = newProAndCon.find("WithStyles(ForwardRef(TextField))");
    const radios = newProAndCon.find("ForwardRef(FormControlLabel)");

    const labels = [];

    radios.map((radio) => {
      if (radio.prop("label") != null) labels.push(radio.prop("label"));
    });

    expect(text.prop("label")).toEqual(
      "pages.shareholding.resolutions.newProAndCon"
    );
    expect(radios.length).toEqual(2);
    expect(labels[0]).toEqual("pages.shareholding.resolutions.pro");
    expect(labels[1]).toEqual("pages.shareholding.resolutions.con");
  });
});
