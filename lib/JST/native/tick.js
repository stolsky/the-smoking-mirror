
import { isFunction } from "./type_check.js";


let req = null;
let func = null;
let lastTime = 0;
let running = false;

const now = () => performance.now();

const run = () => {
    if (running) {
        const newTime = now();
        const dt = newTime - lastTime;
        lastTime = newTime;
        func(dt);
        req = requestAnimationFrame(run);
    }
};

/** @param {Function} f */
const start = (f) => {
    if (isFunction(f) && !running) {
        func = f;
        running = true;
        lastTime = now();
        run();
    }
};

const stop = () => {
    cancelAnimationFrame(req);
    req = null;
    running = false;
    lastTime = 0;
};

const isRunning = () => running;


export { isRunning, now, start, stop };
