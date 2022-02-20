import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import ProposalTransactionId from "./ProposalTransactionId";

const props = {
  transactionId: resolutions[0].transactionId,
};

describe("Resolutions.Show.Overview.ProposalDetails", () => {
  it("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <ProposalTransactionId debug {...props} />
      </ThemeProvider>
    ).children();

    expect(component).toMatchSnapshot();
    const proposalTransactionId = component.find("ProposalTransactionId");

    expect(proposalTransactionId.prop("transactionId")).toEqual(
      props.transactionId
    );
  });
});
