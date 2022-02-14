import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import moment from "moment";
import React from "react";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import ProposalDetails from "./ProposalDetails";

const getDetailsFromProposal = ({
  createdAt,
  expireAt,
  customThreshold,
  category,
}) => {
  const createdDate = moment(createdAt).format("YYYY-MM-DD");
  const expiredDate = moment(expireAt).format("YYYY-MM-DD");

  return [
    { name: "Created On", value: createdDate },
    { name: "Expiration Date", value: expiredDate },
    { name: "Threshold", value: customThreshold || category.threshold.value },
  ];
};

const props = {
  details: getDetailsFromProposal(resolutions[0]),
};

describe("Resolutions.Show.Overview.ProposalDetails", () => {
  it("Test with props", () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <ProposalDetails {...props} />
      </ThemeProvider>
    ).children();
    expect(component).toMatchSnapshot();
    const proposalDetails = component.find("ProposalDetails");

    expect(proposalDetails.prop("details")).toEqual(props.details);
  });
});
