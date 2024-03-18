import Form from "react-bootstrap/Form";
import BtnsCo from "./Btns";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
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
        fullname: sessionLogin[0].fullname,
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
        Reviews: editedReviewText,
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
    <>
      {reviews.map((rev) => (
        <div
          className="d-flex gap-2 pt-3 align-items-end border-bottom"
          key={rev.id}
        >
          <div className="d-flex gap-1">
            <div>
              <p className="m-0">{rev.fullname}</p>
              {editingReviewId === rev.id ? (
                <Form.Control
                  value={editedReviewText}
                  onChange={(e) => setEditedReviewText(e.target.value)}
                  type="text"
                  placeholder="Edit Review"
                />
              ) : (
                <div>{rev.reviews}</div>
              )}
            </div>
          </div>

          <div>
            <p className="m-0">{rev.rate}</p>
          </div>

          {sessionLogin &&
            sessionLogin.length > 0 &&
            sessionLogin[0].fullname === rev.Fullname && (
              <BtnsCo
                btnAct={() => deleteRev(rev.id)}
                btnType="submit"
                btnCo="danger"
                btnText="remove"
              />
            )}
          {sessionLogin &&
            sessionLogin.length > 0 &&
            sessionLogin[0].fullname === rev.Fullname && (
              <>
                {editingReviewId === rev.id ? (
                  <BtnsCo
                    btnAct={() => editRev(rev.id)}
                    btnType="submit"
                    btnCo="primary"
                    btnText="save"
                  />
                ) : (
                  <BtnsCo
                    btnAct={() => setEditingReviewId(rev.id)}
                    btnCo="primary"
                    btnText="edit"
                  />
                )}
              </>
            )}
        </div>
      ))}

      {sessionLogin && sessionLogin.length > 0 ? (
        <div className="d-flex gap-2 pt-3 align-items-end ">
          <div className="d-flex flex-column gap-1 ">
            {sessionLogin && sessionLogin.length > 0 && (
              <p className="m-0">{sessionLogin[0].fullname}</p>
            )}

            <Form.Control
              onChange={onChangeH}
              value={revs}
              type="text"
              placeholder="Please Add Review"
            />
          </div>

          <div className="d-flex ">
            <BtnsCo
              btnAct={createRev}
              btnType="submit"
              btnCs={{ backgroundColor: "#008f97" }}
              btnCo="primary"
              btnText="Add"
            />

            {reviews.length > 0 && <p className="m-0">{reviews[0].ratings}</p>}
          </div>
        </div>
      ) : (
        <p>Please Login To add Review</p>
      )}
    </>
  );
}
