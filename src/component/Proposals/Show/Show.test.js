import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import theme from "../../../../theme";
import Show from "./Show";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

describe("Resolutions.Show", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  let component;
  let mockStore;
  let store;
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

  beforeEach(() => {
    mockStore = configureStore();
    store = mockStore(initialState);
  });

  it("Test before timeout", () => {
    component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Show />
        </ThemeProvider>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
