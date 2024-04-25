const getTimePassed = (date) => {
  // Get the current date in the local time zone
  const currentDate = new Date();
  // Get the current timestamp in milliseconds
  const currentTimestamp = currentDate.getTime();
  // Get the timestamp of the provided date
  const timestamp = new Date(date).getTime();
  // Calculate the difference in milliseconds
  let timePassed = currentTimestamp - timestamp;
  // Convert milliseconds to seconds, minutes, hours, etc.
  const secondsPassed = Math.floor(timePassed / 1000);
  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);
  const daysPassed = Math.floor(hoursPassed / 24);
  const weeksPassed = Math.floor(daysPassed / 7);
  const monthsPassed = Math.floor(daysPassed / 30);
  const yearsPassed = Math.floor(daysPassed / 365);
  let time = "";
  // Display the time passed conditionally
  if (yearsPassed > 0) {
    time = `${yearsPassed} years`;
  } else if (monthsPassed > 0) {
    time = `${monthsPassed} months`;
  } else if (weeksPassed > 0) {
    time = `${weeksPassed} weeks`;
  } else if (daysPassed > 0) {
    time = `${daysPassed} days`;
  } else if (hoursPassed > 0) {
    time = `${hoursPassed} hours`;
  } else if (minutesPassed > 0) {
    time = `${minutesPassed} minutes`;
  } else {
    time = `${secondsPassed} seconds`;
  }
  return `${time} ago`;
};
return { getTimePassed };
