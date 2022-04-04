import React from "react";
import AvatarDemo from "../asset/159236.svg";
import GifDemo from "../asset/gif.png";
import CalenderDemo from "../asset/calender.png";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const CardComponent = ({ setShow, setMsg, msg, postList, setPostList }) => {
  const handlePost = () => {
    let _postList = postList;
    _postList.push(msg);
    setPostList([..._postList]);
    setMsg({ text: "", img: "" });
  };

  return (
    <Card style={{ marginTop: 60, width: "40%" }}>
      <Card.Header>Post</Card.Header>
      <Card.Body>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              width: 100,
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              width={50}
              height={50}
              src={AvatarDemo}
              alt={"Avatar"}
            />
          </div>
          <textarea
            placeholder="Write something"
            rows="4"
            cols="50"
            style={{
              border: "none",
              outline: "none",
              resize: "none",
              "&:active, &:focus, &:selected": {
                border: "none",
              },
            }}
            value={msg.text}
            onChange={(e) => setMsg({ text: e.target.value, img: msg.img })}
          />
        </div>
        <div style={{ marginLeft: 90, marginBottom: 20 }}>
          {msg.img !== "" && (
            <img width={250} height={250} src={msg.img} alt={""} />
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 20,
              background: "#F5F5F5",
              borderRadius: 30,
              width: "45%",
              cursor: "pointer",
            }}
            onClick={() => setShow(true)}
          >
            <div>
              <img src={GifDemo} alt={"gif"} />
            </div>
            <div style={{ marginLeft: 10 }}>GIF</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 20,
              background: "#F5F5F5",
              borderRadius: 30,
              width: "45%",
            }}
          >
            <div>
              <img width={20} height={20} src={CalenderDemo} alt={"Calender"} />
            </div>
            <div style={{ marginLeft: 10 }}>Calender</div>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <Button onClick={() => handlePost()}>POST</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
