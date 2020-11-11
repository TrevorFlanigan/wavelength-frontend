import React from "react";
import target from "../assets/target.svg";
type TargetProps = { goal: number };

const Target = (props: TargetProps) => {
  return (
    <div className="slider">
      <div
        style={{
          backgroundImage: `url(${target})`,
          height: "100%",
          backgroundSize: "100%",
          backgroundRepeat: "repeat-y",
          transform: `translateX(${props.goal - 50}vh)`,
        }}
      >
        {/* <div
          style={{
            width: "20%",
            height: "100%",
            backgroundColor: "#ECAA20",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              backgroundColor: "#EC4A3C",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                minWidth: "33%",
                width: "33%",
                height: "100%",
                backgroundColor: "#52899A",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ visibility: "hidden" }}>i</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Target;
