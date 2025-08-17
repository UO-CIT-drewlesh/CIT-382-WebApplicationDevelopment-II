// Exported at the bottom of module
const textData = ["Sample #1 data", "Sample #2 data", "Sample #3 data"];

// Exported at the bottom of module
function makeUppercase(s) {
  return s.toUpperCase();
}

// Exported in-line
export function makeLowercase(s) {
  return s.toLowerCase();
}

// Export data and function
export { textData, makeUppercase };
