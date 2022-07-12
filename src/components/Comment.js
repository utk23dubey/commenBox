import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { isEmpty } from "lodash";
import "./Comment.css";
import Comments from "./Comments";

const Comment = (props) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [replyname, setreplyName] = useState("");
  const [replytext, setreplyText] = useState("");
  const [validated, setValidated] = useState(false);
  const [editComment, setEdit] = useState(false);
  const [editReply, setEditReply] = useState(false);
  const [commentIndex, setCommentIndex] = useState(0);
  const [replyIndex, setReplyIndex] = useState(0);

  const setCommentName = (e) => {
    setName(e.target.value);
  };

  const setCommentText = (e) => {
    setText(e.target.value);
  };

  const replyNameSet = (e) => {
    setreplyName(e.target.value);
  };

  const replyTextSet = (e) => {
    setreplyText(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      if (editComment) {
        const comment = {
          name: name,
          text: text,
          date: new Date(),
          onReply: false,
          onEditComment: true,
          onEditReply: false,
        };
        props.onEditComment(comment, commentIndex);
        setEdit(false);
      } else {
        const comment = {
          name: name,
          id: Math.random(1),
          text: text,
          replies: [],
          date: new Date(),
          onReply: false,
          onEditComment: false,
          onEditReply: false,
        };
        props.addComment(comment);
      }
      setName("");
      setText("");
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const onRepliesAdd = (e, index) => {
    if (!isEmpty(replyname) && !isEmpty(replytext)) {
      const reply = {
        name: replyname,
        text: replytext,
        date: new Date(),
        onEditReply: false,
        id: Math.random(1),
      };
      if (editReply) {
        reply.onEditReply = true;
        props.onReplyEdit(reply, commentIndex, replyIndex);
      } else {
        props.addReply(reply, index);
      }
      setreplyName("");
      setreplyText("");
      setEditReply(false);
    } else {
      alert("Please fill Name or Text before Submit");
    }
  };

  const onEditComment = (comment, index) => {
    setName(comment.name);
    setText(comment.text);
    setEdit(true);
    setCommentIndex(comment.id);
  };

  const onReply = (index) => {
    props.onReply(index);
  };

  const onReplyEdit = (reply, index, i) => {
    setreplyName(reply.name);
    setreplyText(reply.text);
    setEditReply(true);
    setCommentIndex(index);
    setReplyIndex(i);
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="form"
      >
        <Form.Label>Comment</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            size="sm"
            type="Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setCommentName(e)}
            disabled={editComment}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <textarea
            size="sm"
            type="textarea"
            placeholder="Text"
            className="width-100"
            value={text}
            onChange={(e) => setCommentText(e)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a text.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="right">
          <Button variant="primary" type="submit">
            POST
          </Button>
        </div>
      </Form>
      {/* List of Comments  */}
      <Comments
        replyname={replyname}
        replytext={replytext}
        editReply={editReply}
        comments={props.comments}
        deleteComment={props.deleteComment}
        onEditComment={onEditComment}
        onReply={onReply}
        replyNameSet={replyNameSet}
        replyTextSet={replyTextSet}
        onRepliesAdd={onRepliesAdd}
        deleteReply={props.deleteReply}
        onReplyEdit={onReplyEdit}
        sortComments={props.sortComments}
        sortCommentsDate={props.sortCommentsDate}
        sortReplies={props.sortReplies}
        sortRepliesDate={props.sortRepliesDate}
      />
    </>
  );
};

export default Comment;
