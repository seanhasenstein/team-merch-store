export function formatToMoney(input) {
  return (input / 100).toFixed(2);
}

export function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
