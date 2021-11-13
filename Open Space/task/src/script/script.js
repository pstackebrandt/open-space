function checkControlPanelPosition() {
    const controlDeck = document.body.getElementsByClassName("control-panel");
    const space = document.body.getElementsByClassName("space");

    const controlDeckTop = parseInt(window.getComputedStyle(controlDeck[0]).top);
    const spaceHeight = space[0].scrollHeight;

    let controlPanelTooLow = controlDeckTop < spaceHeight / 3;

    alert(`controlDeckTop: ${controlDeckTop}, spaceHeight: ${spaceHeight}, controlPanelTooLow: ${controlPanelTooLow}`);
}