
import DialogState from "./DialogState.js";
import InGameState from "./InGameState.js";
import LoadGameState from "./LoadGameState.js";
import MenuState from "./MenuState.js";
import SetupIntroState from "./SetupIntroState.js";
import TextPageState from "./TextPageState.js";
import TransitionState from "./TransitionState.js";
import StateWrapper from "./StateWrapper.js";


const StateFactory = Object.freeze({

    createDialogState: (properties) => new StateWrapper(new DialogState(properties)),

    createInGameState: (properties) => new StateWrapper(new InGameState(properties)),

    createLoadGameState: (properties) => new StateWrapper(new LoadGameState(properties)),

    createMenuState: (properties) => new StateWrapper(new MenuState(properties)),

    createSetupIntroState: (properties) => new StateWrapper(new SetupIntroState(properties)),

    createTextPageState: (properties) => new StateWrapper(new TextPageState(properties)),

    createTransitionState: (properties) => new StateWrapper(new TransitionState(properties))

});


export default StateFactory;
