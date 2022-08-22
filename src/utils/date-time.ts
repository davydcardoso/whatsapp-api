export const currentDateFormatted = (): string => {
  const date = new Date(),
    day = date.getDate().toString().padStart(2, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    Year = date.getFullYear();
  return `${day}/${month}/${Year}`;
};

export const currentTimeFormatted = (): string => {
  const time = new Date(),
    hour = time.getHours().toString().padStart(2, "0"),
    minutes = time.getMinutes().toString().padStart(2, "0"),
    seconds = time.getSeconds().toString().padStart(2, "0");

  return `${hour}:${minutes}:${seconds}`;
};
