function checkControlPanelPosition() {
    const controlDeck = document.body.getElementsByClassName("control-panel");
    const space = document.body.getElementsByClassName("space");

    const controlDeckTop = parseInt(window.getComputedStyle(controlDeck[0]).top);
    const spaceHeight = space[0].scrollHeight;

    let controlPanelTooLow = controlDeckTop < spaceHeight / 3;

    alert(`controlDeckTop: ${controlDeckTop}, spaceHeight: ${spaceHeight}, controlPanelTooLow: ${controlPanelTooLow}`);
}

function authorizeControlAccess() {
    console.log("authorizeControlAccess()")

    let controlAuthorised = getAuthorizationState();

    if (controlAuthorised === true) {
        disableAuthorizers();
        switchSecuredElements(controlAuthorised);
    }
}

function getAuthorizationState() {
    const passwordElement = document.getElementById("password");

    let controlAuthorised = false;
    if (passwordElement.value === "TrustNo1") {
        controlAuthorised = true;
        console.log("control is authorised");
    }
    return controlAuthorised;
}

function disableAuthorizers() {
    let authorizerElements = document.getElementsByClassName("authorizer");

    for (let i in authorizerElements) {
        authorizerElements[i].disabled = true;
        console.log(`disable authorizer of type ${authorizerElements[i].type}`);
    }
}

function switchSecuredElements(controlAuthorised) {
    let securedItems = document.getElementsByClassName("secured");
    console.log("count of secured items: " + securedItems.length);

    for (let i in securedItems) {
        if (controlAuthorised === true) {
            securedItems[i].disabled = false;
            console.log(`enable element type ${securedItems[i].type}, disabled? ${securedItems[i].disabled}`);
        } else {
            securedItems[i].disabled = true;
            console.log(`disable element type ${securedItems[i].type} disabled? ${securedItems[i].enabled}`);
        }
    }
}
