import React, { useEffect, useRef, useState } from "react";
import { Toast, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CardComponent from "./components/CardComponent";
import axios from "axios";
import useDebounce from "../src/components/useDebounce";

const UserProfile = () => {
  const [postList, setPostList] = useState([]);
  const [show, setShow] = useState(false);
  const [searchGif, setSearchGif] = useState("");
  const [gifList, setGifList] = useState([]);
  const [msg, setMsg] = useState({ text: "", img: "" });

  const searchQuery = useDebounce(searchGif);

  const divRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        "//api.giphy.com/v1/gifs/search?api_key=OThDOFha5X2sdpeqXSo8fFkyHvCvoFKP" +
          "&limit=" +
          5 +
          "&q=" +
          searchQuery.toLowerCase()
      )
      .then((res) => {
        setGifList(res.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev-widget.konfhub.com/widget.js";
    script.async = true;
    script.setAttribute("button_id", "dev_btn_b517160e1b01");

    if (divRef.current) {
      divRef.current.appendChild(script); // Attach script to that specific div
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeChild(script); // Cleanup
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardComponent
        setShow={setShow}
        setMsg={setMsg}
        msg={msg}
        setPostList={setPostList}
        postList={postList}
      />
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Toast show={show} onClose={() => setShow(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">GIF</strong>
          </Toast.Header>
          <Toast.Body>
            <input
              placeholder="Search gif"
              value={searchGif}
              onChange={(e) => setSearchGif(e.target.value)}
            />
            <div style={{ height: 300, overflowY: "scroll" }}>
              {gifList?.length > 0 ? (
                gifList.map((each) => (
                  <div
                    key={each?.id}
                    style={{ marginTop: 20, cursor: "pointer" }}
                    onClick={() => {
                      setMsg({
                        text: msg.text,
                        img: each?.images?.downsized?.url,
                      });
                      setSearchGif("");
                      setShow(false);
                    }}
                  >
                    <img
                      width={250}
                      height={250}
                      src={each?.images?.downsized?.url}
                      alt={""}
                    />
                  </div>
                ))
              ) : (
                <div style={{ marginTop: 20 }}>{"No Gif Found"}</div>
              )}
            </div>
          </Toast.Body>
        </Toast>
      </div>
      <div ref={divRef}></div>
      <div style={{ marginTop: 20, width: "40%", height: 500 }}>
        {postList.length > 0 ? (
          postList?.map((each, index) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "85%",
                  border: "1px solid black",
                  display: "flex",
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 20,
                }}
              >
                <div style={{ width: "70%" }}>
                  <strong>msg:</strong>
                  <div style={{ marginTop: 20 }}>{each.text}</div>
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img width={100} height={100} src={each.img} alt={""} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "15%",
                }}
                onClick={() => {
                  let _postList = postList;
                  _postList.splice(index, 1);
                  setPostList([..._postList]);
                }}
              >
                <Button color={"secondary"}>Delete</Button>
              </div>
            </div>
          ))
        ) : (
          <div>{""}</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
