import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import ProAndCon from "./ProAndCon";

const prosAndConsScores = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

const updateProsAndConsScores = (index, value) => 0;

const props = {
  resolutionAuthorId: resolutions[0].author.id,
  proAndCon: resolutions[0].arguments.items[0],
  voteValue: prosAndConsScores["1"],
  onVoteUpdate: updateProsAndConsScores,
};
const variants = ["h5", "body1", "body1", "body1"];

describe("Resolutions.Show.ProsAndCons.ProAndCon", () => {
  // TODO You need to fix this
  xit("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <ProAndCon {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();

    let refs = component.find("ForwardRef");
    let proAndCon;
    refs.map((ref) => {
      if (ref.prop("proAndCon") != null) proAndCon = ref;
    });

    expect(proAndCon.prop("proAndCon")).toEqual(props.proAndCon);

    refs = component.find("ForwardRef(Typography)");
    refs.map((ref, i) => {
      expect(ref.prop("variant")).toEqual(variants[i]);
    });
    expect(refs.length).toEqual(4);
  });
});
