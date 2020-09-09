export const calculateExpiresIn = (timestamp) =>
  (timestamp - Math.floor(Date.now() / 1000)) / (3600 * 24)
