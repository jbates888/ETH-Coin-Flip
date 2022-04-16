import React from "react";

import '../index.css'

export function LoserMessage({ dismiss }) {
  return (
    <div className="alert alert-danger" role="alert">
      <h3>Better luck next time </h3>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
