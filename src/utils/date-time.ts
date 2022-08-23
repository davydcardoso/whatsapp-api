export const currentDateFormatted = (currentDate?: Date): string => {
  const date = currentDate || new Date(),
    day = date.getDate().toString().padStart(2, "0"),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    Year = date.getFullYear();
  return `${day}/${month}/${Year}`;
};

export const currentTimeFormatted = (currentDate?: Date): string => {
  const time = currentDate || new Date(),
    hour = time.getHours().toString().padStart(2, "0"),
    minutes = time.getMinutes().toString().padStart(2, "0"),
    seconds = time.getSeconds().toString().padStart(2, "0");

  return `${hour}:${minutes}:${seconds}`;
};
