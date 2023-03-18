import React from "react";
import { Link } from "react-router-dom";

export default function UserCard(props) {
  return (
    <Link to={`/userPage/${props.userInfo.id}`}>
      <div
        key={props.userInfo.id}
        ref={props.ref}
        // onClick={() => {
        //   props.setter((prev) => [...prev, props.userInfo.name]);
        // }}
      >
        {props.userInfo.name}
      </div>
    </Link>
  );
}
