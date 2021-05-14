import React from "react";
import Calendar from "react-calendar";

export default function DatePiker({ onChange, value }) {
  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
