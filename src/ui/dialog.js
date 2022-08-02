
const Dialogue = class extends Wrapper {

    /** @type {Container} */
    let container = null;
    /** @type {Container} */
    let dialogue = null;
    /** @type {Container} */
    let topics = null;

    const core = {};

    core.init = () => {

        container = new Container("Dialogue");
        dialogue = new Container("Box");
        topics = new Container("Topics");

        container.append(
            dialogue,
            topics
        );

        core.hide();
    };

    core.TYPE = Object.freeze({
        SPEECH: 0,
        SOUND: 1,
        THOUGHT: 2
    });

    core.addMessage = (name, text, type) => {

    };

    core.show = () => {
        if (container instanceof Container) {
            container.show();
        }
    };

    core.hide = () => {
        if (container instanceof Container) {
            container.hide();
        }
    };

    core.getContainer = () => container;

    core.clear = () => {

        if (dialogue instanceof Container) {
            dialogue.clear();
        }

        core.hide();

    };

    return Object.freeze(core);
};


export default Dialogue;
