const VALID = "validValues";
const INVALID = "invalidValues";

module.exports = {
  trackingNumber: {
    [VALID]: [
      "9876543210", // length 10
      "0000000001", // length 10
    ],
    [INVALID]: [
      null,
      "1", // length 1
      "987654321", // length 9
      "98765432109", // length 11
      "ABCabc1230", // length 10
      "ABCDEFGHIJ", // length 10
    ],
  },

  weightKg: {
    [VALID]: [2, 46, 80],
    [INVALID]: [null, 1, 81],
  },

  sender: {
    [VALID]: ["Anonymous", "Jane Doe", "l33t", null],
    [INVALID]: [],
  },

  recipient: {
    [VALID]: ["Jane Doe", "john smith", "l33t c0de"],
    [INVALID]: [null, "Anonymous", "Jane", "l33t"],
  },

  isDelivered: {
    [VALID]: [true, false],
    [INVALID]: [null],
  },

  VALID,
  INVALID,
};
