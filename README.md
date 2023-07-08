# GPT-3 Token Count

A TypeScript package for counting the number of tokens in a given text using the GPT-3 language model.

## Installation

You can install the `gpt-3-token-count` package via npm:

```bash
npm install gpt-3-token-count
```

## Usage

```typescript
import { count } from "gpt-3-token-count";

const text = "This is a sample text.";
const tokenCount = count(text);

console.log(`Token count: ${tokenCount}`);
```

The `count` function accepts a string as input and returns the number of tokens present in the text.
