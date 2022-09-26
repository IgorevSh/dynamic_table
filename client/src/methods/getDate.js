function to2Digits(num) {
  return num.toString().padStart(2, "0");
}

function getDate(date) {
  return [
    to2Digits(date.getDate()),
    to2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(".") /* +
        " " +
        [
          this.to2Digits(date.getHours()),
          this.to2Digits(date.getMinutes()),
          this.to2Digits(date.getSeconds()),
        ].join(":")*/;
}
export default getDate;
