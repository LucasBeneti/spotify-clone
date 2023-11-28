export const getCookieExpDate = (date: Date, daysToExpire: number) => {
  date.setDate(date.getDate() + daysToExpire);

  return date;
};
