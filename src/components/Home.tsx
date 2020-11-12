import { WinState } from "./RoomHandler";
import React, { CSSProperties, useState } from "react";
import { useHistory } from "react-router-dom";
import RoomData from "../types/RoomData";
import socket from "./Socket";
import bg from "../assets/wavelength.gif";

const Home = () => {
  let [value, setValue] = useState("");
  let history = useHistory();
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginTop: 0,
          paddingTop: 20,
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        WAVELENGTH
      </h1>
      <div style={{ display: "flex", flexDirection: "row", margin: "20px" }}>
        <div
          style={{
            display: "flex",
            flex: "1 1 40%",
            textAlign: "center",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={() => history.push(`/${value}`)}
          >
            <input
              placeholder="Room Name"
              type="text"
              name="roomname"
              style={{ textAlign: "center" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="roomname" style={{ margin: 20, color: "white" }}>
              Create or Join a Room
            </label>
            <button onClick={() => history.push(`/${value}`)}> Start </button>
          </form>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: "1 1 300px",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      ></div>
    </div>
  );
};

export default Home;
