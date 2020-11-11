import React, { CSSProperties } from "react";
import toTitleCase from "../utils/toTitleCase";
type PolarCardsProps = {
  leftWord: string;
  rightWord: string;
};

const PolarCards = (props: PolarCardsProps) => {
  const wordContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 50%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Catamaran",
  };
  const wordStyle: CSSProperties = {
    textAlign: "center",
  };
  return (
    <div
      style={{
        display: "flex",
        minWidth: "300px",
        minHeight: "200px",
        width: "60%",
        margin: "20px",
        // border: "1px solid black",
        borderRadius: "5px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "#fff",
      }}
    >
      <div
        style={{
          ...wordContainerStyle,
          backgroundColor: "#7ed6ff",
          borderRadius: "5px 0px 0px 5px",
        }}
      >
        <h2 style={wordStyle}>{toTitleCase(props.leftWord)}</h2>
        <h3 style={{ fontSize: "3em", margin: 0 }}>←</h3>
      </div>

      <div
        style={{
          ...wordContainerStyle,
          backgroundColor: "#ffa97e",
          borderLeft: "1px solid black",
          borderRadius: "0px 5px 5px 0px",
        }}
      >
        <h2 style={wordStyle}>{toTitleCase(props.rightWord)}</h2>
        <h3 style={{ fontSize: "3em", margin: 0 }}>→</h3>
      </div>
    </div>
  );
};

export default PolarCards;
