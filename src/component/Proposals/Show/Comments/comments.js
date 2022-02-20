import Loading from "@common/Loading";
import SnackBarAlert from "@common/SnackbarAlert";
//import { useMutation, useQuery } from "@services/graphql/resolutions";
//import { loader } from "graphql.macro";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

const COMMENTS_QUERY = loader("./comments.gql");
const CREATE_COMMENT_MUTATION = loader("./createComment.gql");
const UPDATE_COMMENT_MUTATION = loader("./updateComment.gql");
const DELETE_COMMENT_MUTATION = loader("./destroyComment.gql");

const Comments = () => {
  const { t } = useTranslation();
  const params = useParams();
  const currentMember = useSelector((state) => state.currentUser.member);

  const { loading, data, refetch } = useQuery(COMMENTS_QUERY, {
    organizationId: currentMember.organization.id,
    id: params.id,
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION);
  const [destroyComment] = useMutation(DELETE_COMMENT_MUTATION);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resolution = data?.organization?.resolution;
  const comments = resolution?.comments;
  const items = comments?.items || [];

  const handleNew = useCallback(
    async (content, parentId) => {
      await createComment({
        variables: {
          comment: {
            resolutionId: resolution.id,
            memberId: currentMember.id,
            content,
            parentId,
          },
        },
      });

      refetch();
    },
    [resolution, createComment, currentMember, refetch]
  );

  const handleEdit = useCallback(
    async ({ id, content }) => {
      await updateComment({
        variables: {
          comment: {
            id,
            content,
          },
        },
      });

      refetch();
    },
    [updateComment, refetch]
  );

  const handleDelete = useCallback(
    async ({ id }) => {
      const result = await destroyComment({
        variables: {
          id,
        },
      });

      if (result?.data?.destroyComment?.errors) {
        setShowError(true);
        setErrorMessage(t("pages.shareholding.resolutions.errorDeleteComment"));
      } else {
        refetch();
      }
    },
    [destroyComment, refetch, setShowError, setErrorMessage, t]
  );

  return loading && !data ? (
    <Loading />
  ) : (
    <React.Fragment>
      <div>
        <NewComment onSave={handleNew} />
      </div>
      <div>
        {items.map((comment) => {
          return (
            comment.content && (
              <CommentCard
                resolutionAuthorId={resolution.author.id}
                key={comment.id}
                onEditComment={handleEdit}
                onDeleteComment={handleDelete}
                comment={comment}
                onReply={handleNew}
              />
            )
          );
        })}
      </div>
      <SnackBarAlert
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
        severity={SnackBarAlert.severity.error}
      />
    </React.Fragment>
  );
};

export default Comments;
