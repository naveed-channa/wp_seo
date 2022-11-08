const process = require("process");

const defaultFrames = [
    "[<->---------]",
    "[-<->--------]",
    "[--<->-------]",
    "[---<->------]",
    "[----<->-----]",
    "[-----<->----]",
    "[------<->---]",
    "[-------<->--]",
    "[--------<->-]",
    "[---------<->]",
    "[--------<->-]",
    "[-------<->--]",
    "[------<->---]",
    "[-----<->----]",
    "[----<->-----]",
    "[---<->------]",
    "[--<->-------]",
    "[-<->--------]"
];

/**
 * Creates a loading animation
 * @example
 * createLoader(yourPromise, "Success!", "Failed!");
 * @example
 * // Using your own keyframes (This should show a dot going left -> right -> left)
 * const frames = [".   ", " .  ", "  . ", "   .", "  . ", " .  "];
 * createLoader(yourPromise, "Success!", "Failed!", frames);
 * @param {Promise} promise
 * @param {string} resolve
 * @param {string} reject
 * @param {string[]} [animFrames = defaultFrames]
 * @returns {void}
 */
function createLoader(promise, resolve, reject, animFrames) {
    if (!animFrames) animFrames = defaultFrames;
    let index = 0;

    const write = (value, clear = false, interval = null) => {
        interval && clearInterval(interval);
        clear && process.stdout.clearLine(0);
        process.stdout.write(`\r${value}`);
    }

    const animLoop = setInterval(() => {
        write(animFrames[index])
        index = ((index + 1) % animFrames.length);
    }, 64);

    promise.then(() => {
        write(`${resolve}\r\n`, true, animLoop);
    }).catch(() => {
        write(`${reject}\r\n`, true, animLoop);
    });
}

module.exports = createLoader;
