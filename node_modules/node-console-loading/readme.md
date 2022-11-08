# [node-console-loading](https://www.npmjs.com/package/node-console-loading)

An util function to show a simple loading animation on a terminal.

### Tested Platforms

- Windows

## Installation

```bash
yarn add node-console-loading
```

or

```bash
npm install node-console-loading
```

## Usage

```typescript
import createLoader from "node-console-loading";

//Creating a loading animation
createLoader(yourPromise, "Resolved! :)", "Rejected! :(");

//Use case using axios
import axios from "axios";

const requestPromise = axios.get("https://example.com/");
createLoader(requestPromise, "Resolved! :)", "Rejected! :(");

//Using your own custom animation
const frames = [
    ".   ",
    " .  ",
    "  . ",
    "   .",
    "  . ",
    " .  ",
]

createLoader(yourPromise, "Resolved! :)", "Rejected! :(", frames);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)