const isDebug = true;

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

    if (isDebug) {
        controlAuthorised = true;
        console.info("authorized control access for debug")
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

function launch() {
    const readyForLaunch = checkReadyForLaunch();
    if (readyForLaunch) {
        console.log("tries to launch rocket");
        const isReady = checkReadyForLaunch()
        if (isReady) {
            console.log("Launches rocket");
            const rocket = document.getElementsByClassName("rocket");
            rocket[0].classList.add("starting");
        }
    } else {
        alert("Rocket isn't ready for launch. Activate all switches and set range controls to maximum.");
    }
}

/* Checks whether rocket is ready to launch.
* return bool: true: yes, false: no */
function checkReadyForLaunch() {
    // check checkboxes, range elements
    // get all checkboxes
    const requiredElements = getAllControlElementsRequiredForLaunch();
    console.log("count of required elements: " + requiredElements.length);

    let isReady = true;

    for (let i in requiredElements) {
        const element = requiredElements[i];
        if (element.type === "checkbox") {
            console.log("checkbox found");
            if (element.checked !== true) {
                console.info("a checkbox is not checked, launch is forbidden")
                isReady = false;
                break;
            }
        } else if (element.type === "range") {
            console.log("range found");
            if (element.value !== "100") {
                console.info("a range is not at maximum, launch is forbidden")
                isReady = false;
                break;
            }
        }
    }

    const launchButton = document.getElementById("launch");
    if (isReady === true) {
        launchButton.disabled = false;
    } else {
        launchButton.disabled = true;
    }

    return isReady;
}

function getAllControlElementsRequiredForLaunch() {
    return document.getElementsByClassName("required-for-launch");
}

/* Check all checkboxes and maximize all range elements
   of control panel. This is a helper for debugging. */
function setAllControlsToMaxValue() {
    console.log("checkAndMaxControls()");
    const requiredElements = getAllControlElementsRequiredForLaunch();
    console.log("count of elements to check or max: " + requiredElements.length);

    for (let i in requiredElements) {
        const element = requiredElements[i];
        if (element.type === "checkbox") {
            element.checked = true;
        } else if (element.type === "range") {
            element.value = "100";// element.max.toString();
        }
    }
}
