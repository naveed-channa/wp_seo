/**
 * Creates a loading animation
 * @example
 * createLoader(yourPromise, "Success!", "Failed!");
 * @example
 * // Using your own keyframes (This should show a dot going left -> right -> left)
 * const frames = [".   ", " .  ", "  . ", "   .", "  . ", " .  "];
 * createLoader(yourPromise, "Success!", "Failed!", frames);
 */
declare function createLoader<T>(promise: Promise<T>, resolve: string, reject: string, animFrames?: string[]): void;

export default createLoader;
