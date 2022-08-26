
import Cache from "../../lib/JST/resource/Cache.js";


const GameCache = new Cache();

/** @type {Hero} */
let activeHero = null;

const getActiveHero = () => activeHero;

const setActiveHero = (id) => {
    if (GameCache.hasItem(id)) {
        activeHero = GameCache.getItem(id);
    }
};


export default GameCache;
export { getActiveHero, setActiveHero };
