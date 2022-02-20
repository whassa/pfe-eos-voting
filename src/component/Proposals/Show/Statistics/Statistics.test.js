import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import theme from "../../../../../theme";
import Statistics from "./Statistics";

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

describe("Resolutions.Show.Statistics", () => {
  xit("Test", () => {
    const store = mockStore(initialState);

    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Statistics />
        </ThemeProvider>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
