import { ThemeProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import theme from "../../../../../../theme";
import resolutions from "./../../../mockDataForTest";
import CommentCard from "./CommentCard";

const comment = resolutions[0].comments.items[0];

const props = {
  resolutionAuthorId: resolutions[0].author.id,
  comment: comment,
  onEditComment: () => {},
  onDeleteComment: () => {},
};

const initialState = {
  currentUser: {
    member: {
      id: "test",
    },
  },
};
const mockStore = configureStore();

describe("Resolutions.Show.ProsAndCons.ProsAndConsList", () => {
  it("Test in 'debug' mode", () => {
    const store = mockStore(initialState);

    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CommentCard {...props} />
        </ThemeProvider>
      </Provider>
    );
    const commentCard = component.find("CommentCard");
    expect(commentCard.prop("comment")).toEqual(props.comment);
  });
});
