import React from "react";

import "./styles.css";

const Input = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest} />
    </div>
  );
};

export default Input;
