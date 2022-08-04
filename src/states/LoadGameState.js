
const LoadGameState = class {

    constructor() {
        // create load game menu
        // load all save game information
        // add listeners
        // loadScript("...")
        //     .then(() => loadSavedGame("..."))
        //     .then(() => {
        //         GameStates.pop(); // close this menu
        //         GameStates.pop(); // close main menu
        //         GameStates.push(InGameState); // start game
        //     })
        //     .catch((error) => console.error(error));
    }

    enter() {
        return this;
    }

    exit() {
        // remove menu
        return this;
    }

    render() {
        // add menu to screen
        return this;
    }

    update() {
        // animations
        return this;
    }

};


export default LoadGameState;
