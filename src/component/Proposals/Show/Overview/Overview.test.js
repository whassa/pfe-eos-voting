import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import theme from "../../../../../theme";
import Overview from "./Overview";

const initialState = {
  currentUser: {
    member: {
      id: "1",
      organization: {
        id: "2",
      },
    },
  },
};
const mockStore = configureStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

describe("Resolutions.Show.Overview", () => {
  const store = mockStore(initialState);

  it("Test", () => {
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Overview />
        </ThemeProvider>
      </Provider>
    ).children();

    expect(component).toMatchSnapshot();
  });
});
