import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import ProsAndConsList from "./ProsAndConsList";

const updateProsAndConsScores = (index, value) => 1;

const props = {
  resolutionAuthorId: resolutions[0].author.id,
  pros: resolutions[0].arguments.items.filter((el) => el.pro === true),
  cons: resolutions[0].arguments.items.filter((el) => el.pro === false),
  scores: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  },
  onVoteUpdate: updateProsAndConsScores,
};

describe("Resolutions.Show.ProsAndCons.ProsAndConsList", () => {
  // TODO You need to fix this
  xit("Test in 'debug' mode", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <ProsAndConsList debug {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
    const prosAndCons = component.find("WithStyles(ForwardRef(ListItemText))");
    expect(prosAndCons.length).toEqual(1);
  });
});
