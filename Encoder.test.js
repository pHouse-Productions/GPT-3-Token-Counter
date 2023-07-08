const { count } = require("./Encoder.js");

test("empty string", () => {
  const str = "";
  expect(count(str)).toEqual(0);
});

test("phrase", () => {
  const str = `
The GPT family of models process text using tokens, which are common sequences of characters found in text. The models understand the statistical relationships between these tokens, and excel at producing the next token in a sequence of tokens.
  `.trim();
  expect(count(str)).toEqual(44);
});
