
import DialogState from "./DialogState.js";
import InGameState from "./InGameState.js";
import LoadGameState from "./LoadGameState.js";
import MenuState from "./MenuState.js";
import SetupIntroState from "./SetupIntroState.js";
import TextPageState from "./TextPageState.js";
import TransitionState from "./TransitionState.js";


const StateFactory = Object.freeze({

    createDialogState: (properties) => new DialogState(properties),

    createInGameState: (properties) => new InGameState(properties),

    createLoadGameState: (properties) => new LoadGameState(properties),

    createMenuState: (properties) => new MenuState(properties),

    createSetupIntroState: (properties) => new SetupIntroState(properties),

    createTextPageState: (className, properties) => new TextPageState(className, properties),

    createTransitionState: (properties) => new TransitionState(properties)

});


export default StateFactory;
