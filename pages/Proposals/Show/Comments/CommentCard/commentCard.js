/**
 * icon of the user next to the comments he has written
 */
import CardContainer from "@common/Cards/CardContainer";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Zoom,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import NewComment from "../NewComment";
import styles from "./commentCard.css";

const useStyles = makeStyles(styles);

const propTypes = {
  onReply: PropTypes.func,
  comment: PropTypes.object.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

const defaultProps = {
  onReply: () => {},
};

const CommentCard = ({
  onEditComment,
  onDeleteComment,
  comment,
  resolutionAuthorId,
  onReply,
}) => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.currentUser);
  const currentMemberId = currentUser?.member?.id || "";
  const replies = comment.replies?.items || [];
  const isAReply = !!comment.parent;

  const classes = useStyles();
  const { id, member, content, updatedAt, deletedAt } = comment;
  const [isMouseHovering, setMouseHovering] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOptions, setMenuOptions] = React.useState([]);
  const [commentContent, setContent] = React.useState(content);
  const [isEditable, setEditable] = React.useState(false);
  const [showReplyTextArea, setShowReplyTextArea] = useState(false);
  const [isDeleted, setDeleteState] = React.useState(deletedAt ? true : false);

  useEffect(() => {
    setDeleteState(deletedAt ? true : false);
  }, [deletedAt, setDeleteState]);

  const handleCommentChange = (event) => {
    setContent(event.target.value);
  };

  const handleToggleMouseHovering = (value) => {
    setMouseHovering(value);
  };

  const handleOpenMenu = (event) => {
    generateMenuOptions();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    setContent(content);
    setEditable(false);
  };

  const renderDate = (
    <div className={classes.date}>{moment(updatedAt).fromNow()}</div>
  );

  const generateMenuOptions = () => {
    const editComment = () => {
      setEditable(true);
      handleCloseMenu();
    };

    const deleteComment = async () => {
      await onDeleteComment({ id });
      handleCloseMenu();
    };

    let tempMenuOptions = [];
    if (currentMemberId === member.id) {
      tempMenuOptions.push({
        name: t("pages.shareholding.resolutions.editComment"),
        action: editComment,
      });
      tempMenuOptions.push({
        name: t("pages.shareholding.resolutions.deleteComment"),
        action: deleteComment,
      });
    }
    setMenuOptions(tempMenuOptions);
  };

  const renderReplyButton = !isAReply ? (
    <Button
      className={classes.replyButton}
      variant="contained"
      onClick={() => setShowReplyTextArea(!showReplyTextArea)}
    >
      {t("pages.shareholding.resolutions.reply")}
    </Button>
  ) : null;

  const renderAction = (
    <React.Fragment key="CommentCardAction">
      {!isDeleted ? (
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>{renderDate}</Grid>
          <Grid item>{renderReplyButton}</Grid>
          <Grid item>
            <IconButton
              size="small"
              className={
                isMouseHovering && currentMemberId === member.id
                  ? classes.menu
                  : classes.menuHidden
              }
              onClick={handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>{renderDate}</Grid>
        </Grid>
      )}
      <Menu
        id="CommentOptions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {menuOptions.map((option) => (
          <MenuItem onClick={option.action} key={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const renderEditButtons = isEditable && (
    <Grid item>
      <Zoom in={isEditable}>
        <Grid item container direction="column" spacing={0}>
          <Grid item>
            <IconButton
              size="small"
              onClick={() => {
                onEditComment({ id: id, commentContent: commentContent });
                setEditable(false);
              }}
            >
              <CheckCircleIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleCancel} size="small">
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Zoom>
    </Grid>
  );

  const renderReplyTextArea = (
    <div className={classes.replyTextArea}>
      {showReplyTextArea ? (
        <NewComment
          onSave={(content) => {
            onReply(content, comment.id);
            setShowReplyTextArea(false);
          }}
          onCancel={() => {
            setShowReplyTextArea(false);
          }}
        />
      ) : null}
    </div>
  );

  const renderContent = (
    <div>
      {!isDeleted ? (
        <div>
          {isEditable ? (
            <TextField
              fullWidth
              multiline
              variant="outlined"
              onChange={handleCommentChange}
              value={commentContent}
            />
          ) : (
            <p className={classes.comment}>{commentContent}</p>
          )}
        </div>
      ) : (
        <div>{t("pages.shareholding.resolutions.commentDeleted")}</div>
      )}
    </div>
  );

  const renderReplies = replies.map((reply) => {
    return (
      reply.content && (
        <CommentCard
          resolutionAuthorId={resolutionAuthorId}
          key={reply.id}
          onEditComment={onEditComment}
          onDeleteComment={onDeleteComment}
          comment={reply}
        />
      )
    );
  });

  return (
    <div
      onMouseEnter={() => handleToggleMouseHovering(true)}
      onMouseLeave={() => handleToggleMouseHovering(false)}
    >
      <CardContainer
        isAuthor={member.id === resolutionAuthorId}
        isDeleted={isDeleted}
        title={
          member
            ? member.user.displayName
            : t("pages.shareholding.resolutions.anonymous")
        }
        avatar={member.user.pictureThumbUrl}
        action={renderAction}
      >
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item xs>
            <Grid container direction="row">
              <Grid item style={{ width: isEditable ? "95%" : "100%" }}>
                {renderContent}
              </Grid>
              <Grid item style={{ width: isEditable ? "5%" : "0" }}>
                {renderEditButtons}
              </Grid>
            </Grid>
            {isAReply ? null : renderReplyTextArea}
            {renderReplies}
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  );
};

CommentCard.propTypes = propTypes;
CommentCard.defaultProps = defaultProps;

export default CommentCard;
