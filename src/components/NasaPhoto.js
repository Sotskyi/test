import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DatePiker from "./Calendar";

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const parseDate = function () {
    return `${calendarDate.getUTCFullYear()}-${
      calendarDate.getUTCMonth() + 1
    }-${calendarDate.getUTCDate()}`;
  };

  const nextDay = function () {
    const dateFormatTotime = new Date(parseDate());
    const increasedDate = new Date(dateFormatTotime.getTime() + 86400000);

    return setCalendarDate(increasedDate);
  };

  const previousDay = function () {
    const dateFormatTotime = new Date(parseDate());
    const decreesedDate = new Date(dateFormatTotime.getTime() - 86400000);
    return setCalendarDate(decreesedDate);
  };

  useEffect(() => {
    if (calendarDate > new Date()) {
      return;
    }
    fetchPhoto();
    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${parseDate()}&api_key=${apiKey}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
  }, [calendarDate]);

  if (!photoData) return <div />;

  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        {photoData.media_type === "image" ? (
          <img src={photoData.url} alt={photoData.title} className="photo" />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div>
          <h1>{photoData.title}</h1>
          <p className="date">{photoData.date}</p>
          <p className="explanation">{photoData.explanation}</p>
          {calendarDate > new Date() && (
            <p className="error">
              Date must be between Jun 16, 1995 and May 14, 2021.
            </p>
          )}
          <div className="calendar">
            <DatePiker onChange={setCalendarDate} value={calendarDate} />
          </div>
          <div className="button-wrapper">
            <button onClick={nextDay}>next day</button>
            <button onClick={previousDay}>previous day</button>
          </div>
        </div>
      </div>
    </>
  );
}
