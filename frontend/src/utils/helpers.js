import _ from "lodash";

/**
 * Format number into PKR currency format.
 * Example:
 * n_f(15000) → "PKR 15,000"
 */
export const n_f = (number) => {
  if (!number || isNaN(number)) return "PKR 0";

  // Format using Pakistan locale
  const formatted = new Intl.NumberFormat("en-PK").format(Number(number));

  return `PKR ${formatted}`;
};

/**
 * Short number formatting:
 * 1500 → "1.50K"
 * 2000000 → "2.00M"
 */
export const short_n_f = (number) => {
  if (isNaN(number)) throw new Error("Input isn't number");

  const isNegative = number < 0;
  const abs = Math.abs(number);

  const units = ["", "K", "M", "B", "T", "Q"];

  if (abs < 1000) return isNegative ? `-${abs}` : `${abs}`;

  const exponent = Math.floor(Math.log10(abs) / 3);
  const reduced = (abs / Math.pow(1000, exponent)).toFixed(2);

  return `${isNegative ? "-" : ""}${reduced}${units[exponent]}`;
};

/**
 * Format datetime into "YYYY-MM-DD HH:mm"
 */
export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Extract username from email
 * "someone@gmail.com" → "someone"
 */
export const getEmailUsername = (email) => {
  if (!email || email === "") return "Anon";
  return _.head(_.split(email, "@"));
};
