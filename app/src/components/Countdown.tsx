
import React from 'react';

interface time { years: number, days: number, hours: number, minutes: number, seconds: number }

type unit = "years" | "days" | "hours" | "minutes" | "seconds"
const Countdown: React.FunctionComponent<{ countDown: time }> = ({ countDown }) => {
  const addLeadingZeros = (value: number) => {
    let valueS = String(value);
    while (valueS.length < 2) {
      valueS = '0' + valueS;
    }
    return valueS;
  }
  const displayTime = (unit: unit) => countDown[unit] > 0 && `${addLeadingZeros(countDown[unit])} ${unit} `

  return (
    <span>
      {displayTime("years")}{displayTime("days")}{displayTime("hours")}{displayTime("minutes")}{displayTime("seconds")}
    </span >
  );
}

export default Countdown;
