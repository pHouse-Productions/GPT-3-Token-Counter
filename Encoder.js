const fs = require("fs");
const path = require("path");

const encoder = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./encoder.json"))
);

const range = (x, y) => {
  const res = Array.from(Array(y).keys()).slice(x);
  return res;
};

const ord = (x) => {
  return x.charCodeAt(0);
};

const chr = (x) => {
  return String.fromCharCode(x);
};

const textEncoder = new TextEncoder("utf-8");

function bytes_to_unicode() {
  const bs = range(ord("!"), ord("~") + 1).concat(
    range(ord("¡"), ord("¬") + 1),
    range(ord("®"), ord("ÿ") + 1)
  );

  let cs = bs.slice();
  let n = 0;
  for (let b = 0; b < 2 ** 8; b++) {
    if (!bs.includes(b)) {
      bs.push(b);
      cs.push(2 ** 8 + n);
      n = n + 1;
    }
  }

  cs = cs.map((x) => chr(x));

  const result = {};
  bs.map((_, i) => {
    result[bs[i]] = cs[i];
  });
  return result;
}

const pat =
  /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;

const byte_encoder = bytes_to_unicode();

function count(text) {
  const tokens = Array.from(text.matchAll(pat)).map((x) =>
    Array.from(textEncoder.encode(x[0])).map((y) => byte_encoder[y])
  );

  let count = 0;
  for (const token of tokens) {
    let index = 0;
    while (index < token.length) {
      for (let i = token.length - index; i > 0; i--) {
        const subToken = token.slice(index, index + i).join("");
        if (encoder[subToken]) {
          index += i;
          count++;
          break;
        }
        if (i === 1) {
          console.log("no match for", token);
          index++;
          count++;
        }
      }
    }
  }
  return count;
}

module.exports = { count };
