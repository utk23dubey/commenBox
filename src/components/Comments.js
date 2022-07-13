import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import moment from "moment";
import "./Comment.css";
import { isEmpty } from "lodash";
function Comments(props) {
  const commentsSort = () => {
    props.sortComments();
  };
  return (
    <div>
      {!isEmpty(props.comments) && props.comments.length > 0 && (
        <div className="sortDate" onClick={commentsSort}>
          Sort by Date{" "}
          <i
            className={
              props.sortCommentsDate ? "bi bi-arrow-down" : "bi bi-arrow-up"
            }
          ></i>{" "}
        </div>
      )}

      {!isEmpty(props.comments) &&
        props.comments.map((comment, index) => (
          <>
            <div className="comment-box" key={comment.id}>
              <div className="container-between">
                <div style={{ fontWeight: "bold" }}>{comment.name}</div>
                <div>{moment(comment.date).format("Do MMMM YYYY")}</div>
              </div>
              <div className="container-between">
                <div>
                  {comment.onEditComment
                    ? `${comment.text} (Edited)`
                    : comment.text}
                </div>
                <div>
                  {" "}
                  <button
                    className="deleteBtn"
                    onClick={(e) => {
                      props.deleteComment(comment.id);
                    }}
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
              <div className="container">
                <button
                  className="btnBox"
                  onClick={(e) => {
                    props.onEditComment(comment, index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btnBox"
                  onClick={(e) => {
                    props.onReply(comment.id);
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
            {comment.onReply && (
              <>
                <Form className="form-2">
                  <Form.Label>Reply</Form.Label>
                  <Form.Group className="mb-3">
                    <Form.Control
                      size="sm"
                      type="Name"
                      placeholder="Enter Name"
                      value={props.replyname}
                      disabled={props.editReply}
                      onChange={(e) => props.replyNameSet(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <textarea
                      size="sm"
                      type="textarea"
                      placeholder="Text"
                      className="width-100"
                      value={props.replytext}
                      onChange={(e) => {
                        props.replyTextSet(e);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a text.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="right">
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        props.onRepliesAdd(e, comment.id);
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                </Form>
                <div
                  className="sortDate"
                  onClick={(e) => props.sortReplies(index)}
                >
                  Sort by Date{" "}
                  <i
                    className={
                      props.sortRepliesDate
                        ? "bi bi-arrow-up"
                        : "bi bi-arrow-down"
                    }
                  ></i>{" "}
                </div>
                {comment.replies.map((reply, i) => (
                  <div key={reply.id}>
                    <div className="comment-box reply-form">
                      <div className="container-between">
                        <div style={{ fontWeight: "bold" }}>{reply.name}</div>
                        <div>{moment(reply.date).format("Do MMMM YYYY")}</div>
                      </div>
                      <div className="container-between">
                        <div>
                          {reply.onEditReply
                            ? `${reply.text} (Edited)`
                            : reply.text}
                        </div>
                        <div>
                          {" "}
                          <button
                            className="deleteBtn"
                            onClick={(e) => {
                              props.deleteReply(comment.id, reply.id);
                            }}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                      <div className="container">
                        <button
                          className="btnBox"
                          onClick={(e) =>
                            props.onReplyEdit(reply, comment.id, reply.id)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        ))}
    </div>
  );
}

export default Comments;
