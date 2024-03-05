import Form from "react-bootstrap/Form";
import BtnsCo from "./Btns";
import renderStars from "../stars/stars";
import "./reviews.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rev(props) {
  const [reviews, setReviews] = useState([]);
  const [revs, setRevs] = useState("");
  const [sessionLogin, setSessionLogin] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState("");

  const onChangeH = (e) => {
    setRevs(e.target.value);
  };

  const createRev = async () => {
    try {
      await axios.post("https://retoolapi.dev/4XjVdq/data", {
        rate: 5,
        fName: sessionLogin[0].fullname,
        reviews: revs,
        name: sessionLogin[0].name,
      });

      loadData();
      console.log("Post successful");
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const loadData = async () => {
    try {
      const res = await axios.get("https://retoolapi.dev/4XjVdq/data");
      setReviews(res.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
    setSessionLogin(sessionLogin);
    console.log(sessionLogin);
  }, []);

  function renderStars(rating) {
    const maxStars = 5;
    const roundedRating = Math.round(rating * 2) / 2;

    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= roundedRating) {
        stars.push(<span key={i}>&#9733;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }

    return stars;
  }

  const test = () => {
    if (sessionLogin.length > 0) {
      console.log(true);
    } else {
      console.log(false);
    }
  };
  test();
  useEffect(() => {
    loadData();
  }, [sessionLogin]);

  const deleteRev = async (id) => {
    try {
      await axios.delete(`https://retoolapi.dev/4XjVdq/data/${id}`);

      loadData();
      console.log("Delete successful");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const editRev = async (id) => {
    try {
      await axios.patch(`https://retoolapi.dev/4XjVdq/data/${id}`, {
        reviews: editedReviewText,
      });

      loadData();
      console.log("Edit successful");
      setEditingReviewId(null);
      setEditedReviewText("");
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  return (
    <div className="rev-card-container">
      {reviews.map((rev) => (
        <div className="rev-item" key={rev.id}>
          <div className="d-flex gap-1">
            <div>
              <p className="rev-username">{rev.name}</p>
              {editingReviewId === rev.id ? (
                <input
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Edit Review"
                />
              ) : (
                <div className="rev-text-container">{rev.reviews}</div>
              )}
            </div>
          </div>
          <div className="your-store-rating">
            <p className="m-0">{renderStars(rev.rate)}</p>
          </div>
          {sessionLogin &&
            sessionLogin.length > 0 &&
            sessionLogin[0].name === rev.name && (
              <div className="rev-btns-container">
                  <button onClick={() => deleteRev(rev.id)} className="delete-review-btn">
                      Delete
                  </button>
              </div>
            )}
          {sessionLogin &&
            sessionLogin.length > 0 &&
            sessionLogin[0].name === rev.name && (
              <>
                {editingReviewId === rev.id ? (
                  <button onClick={() => editRev(rev.id)} className="edit-save-btn">
                    Save
                  </button>
                  // <BtnsCo
                  //   btnAct={() => editRev(rev.id)}
                  //   btnType="submit"
                  //   btnCo="primary"
                  //   btnText="save"
                  // />
                ) : (
                  <div className="rev-btns-container">
                    <button onClick={() => setEditingReviewId(rev.id)} className="edit-review-btn">
                        Edit
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      ))}
      {/* {sessionLogin && sessionLogin.length > 0 ? (
        <div className="d-flex gap-2 pt-3 align-items-end">
          <div className="d-flex flex-column gap-1">
            {sessionLogin && sessionLogin.length > 0 && (
              <p className="m-0">{sessionLogin[0].name}</p>
            )}
            <input
              onChange={onChangeH}
              value={revs}
              type="text"
              className="form-control"
              placeholder="Please Add Review"
            />
          </div>
          <div className="d-flex">
            <div className="rev-btns-container">
              <button onClick={createRev} className="add-review-btn">
                Write a customer review
              </button>
            </div>
            {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
          </div>
        </div>
      ) : (
        <p>Please Login To add Review</p>
      )} */}
    </div>
  );
}