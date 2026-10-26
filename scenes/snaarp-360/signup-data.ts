/** Password rules in column order: column 1 first, then column 2. */
export const PASSWORD_RULES = [
  { id: "len", text: "At least 8 characters" },
  { id: "lower", text: "One lowercase letter" },
  { id: "special", text: "One special character" },
  { id: "upper", text: "One uppercase letter" },
  { id: "number", text: "One number" },
];

/** Country box and phone code on the sign-up form, and the sample number typed into it (Ofcom drama range). */
export const PHONE_360 = {
  country: "United Kingdom",
  dialCode: "+44",
  sample: "7700 900123",
};
