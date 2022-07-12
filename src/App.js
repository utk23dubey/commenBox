import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Comment from "./components/Comment";
import moment from "moment";
import { isEmpty } from "lodash";

function App() {
  const [comments, setComments] = useState(
    JSON.parse(sessionStorage.getItem("comments"))
  );
  const [json_comments, setJsonComments] = useState([]);
  const [sortComments, setSortComments] = useState(false);
  const [sortReplies, setSortReplies] = useState(false);
  const [sortRepliesIndex, setRepliesIndex] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    if (!sortComments) {
      if (!isEmpty(comments)) {
       setComments(comments.sort(function (a, b) {
          return moment(b.date).format("X") - moment(a.date).format("X");
        }));
      }
    } else {
      setJsonComments(comments.reverse());
      sessionStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [sortComments]);

  useEffect(() => {
    setJsonComments(JSON.parse(sessionStorage.getItem("comments")));
  }, [comments]);

  useEffect(() => {
    if (sortReplies) {
      comments[sortRepliesIndex].replies.sort(function (a, b) {
        return moment(b.date).format("X") - moment(a.date).format("X");
      });
      sessionStorage.setItem("comments", JSON.stringify(comments));
      setJsonComments(comments);
    } else {
      if (!isEmpty(comments)) {
        if (comments.length > 0) {
          comments[sortRepliesIndex].replies.reverse();
          sessionStorage.setItem("comments", JSON.stringify(comments));
        }
      }
    }
  }, [sortReplies]);

  useEffect(() => {
    sessionStorage.setItem("comments", "[]");
  }, []);

  const addComment = (data) => {
    setComments((oldComments) => {
      if (!isEmpty(oldComments)) {
        const newState = [...oldComments, data];
        return newState;
      } else {
        const newState = [];
        newState.push(data);
        return newState;
      }
    });
  };
  const onEditComment = (data, index) => {
    setComments((prevState) => {
      const newState = prevState.map((obj, i) => {
        if (index === obj.id) {
          return { ...obj, ...data };
        }
        return obj;
      });
      return newState;
    });
  };
  const onReplyEdit = (data, indexComment, indexReply) => {
    setComments((prevState) => {
      const newState = prevState.map((obj, i) => {
        if (indexComment === obj.id) {
          const indexRep = obj.replies.findIndex(
            (item) => item.id === indexReply
          );
          const id = obj.replies[indexRep].id;
          obj.replies[indexRep].name = data.name;
          obj.replies[indexRep].text = data.text;
          obj.replies[indexRep].date = data.date;
          obj.replies[indexRep].id = id;
          obj.replies[indexRep].onEditReply = data.onEditReply;
          obj.replies.sort(function (a, b) {
            return moment(b.date).format("X") - moment(a.date).format("X");
          });
        }
        return obj;
      });
      return newState;
    });
  };
  const addReply = (data, index) => {
    setComments((prevState) => {
      const newState = prevState.map((obj, i) => {
        if (index === obj.id) {
          return {
            ...obj,
            replies: [...prevState[comments.indexOf(obj)].replies, data],
          };
        }
        return obj;
      });
      return newState;
    });
  };

  const onReply = (index) => {
    setComments((prevState) => {
      const newState = prevState.map((obj, i) => {
        if (index === obj.id) {
          return { ...obj, onReply: !obj.onReply };
        }
        return obj;
      });
      return newState;
    });
  };

  const deleteComment = (index) => {
    setComments((prevState) => {
      const newState = prevState.filter((item, i) => item.id !== index);
      return newState;
    });
  };

  const deleteReply = (index, index2) => {
    setComments((prevState) => {
      const newState = prevState.map((obj, i) => {
        if (index === i) {
          const replies_new = obj.replies.filter(
            (item, repIndex) => index2 !== repIndex
          );
          return { ...obj, replies: replies_new };
        }
        return obj;
      });
      return newState;
    });
  };

  const sortCommentsData = (data) => {
    setSortComments(c=>{
      return c=!c;
    });
  };

  const sortRepliesData = (index) => {
    setSortReplies(c=>{
      return c=!c;
    });
    setRepliesIndex(index);
  };

  //Comment-Box
  return (
    <div className="main">
      <Comment
        addComment={addComment}
        comments={json_comments}
        addReply={addReply}
        onEditComment={onEditComment}
        onReply={onReply}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
        onReplyEdit={onReplyEdit}
        sortComments={sortCommentsData}
        sortCommentsDate={sortComments}
        sortReplies={sortRepliesData}
        sortRepliesDate={sortReplies}
      />
    </div>
  );
}

export default App;
