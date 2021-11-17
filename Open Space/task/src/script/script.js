const isDebug = false; // suppress requirement of password

/* Authorize access to control panel.
* Starts password check and (de-)activation of panel controls.  */
function authorizeControlAccess() {
    console.log("authorizeControlAccess()")
    let controlAuthorised = getAuthorizationState();

    if (controlAuthorised === true) {
        disableAuthorizers();
        switchSecuredElements(controlAuthorised);
    }
}

/* Tells whether use of control panel is authorised. */
function getAuthorizationState() {
    const passwordElement = document.getElementById("password");

    let controlAuthorised = false;
    if (passwordElement.value === "TrustNo1" || passwordElement.value === "hannah") {
        controlAuthorised = true;
        console.log("control is authorised");
    }

    if (isDebug) {
        controlAuthorised = true;
        console.info("authorized control access for debug")
    }

    return controlAuthorised;
}

/* Disable input elements required for password input. */
function disableAuthorizers() {
    let authorizerElements = document.getElementsByClassName("authorizer");

    for (let i in authorizerElements) {
        authorizerElements[i].disabled = true;
        console.log(`disable authorizer of type ${authorizerElements[i].type}`);
    }
}

/* Does (de-)activation of panel controls depending on authorization state. */
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

function resetPanelAfterLaunch() {
    // enable authorizers
    // deactivate secured elements
    // reset secured elements
    // deactivate start button
}

/* Tries to launch rocket. */
function launch() {
    const readyForLaunch = checkReadyForLaunch();
    if (readyForLaunch) {
        console.log("tries to launch rocket");
        const isReady = checkReadyForLaunch()
        if (isReady) {
            console.log("Launches rocket");
            const rocket = document.getElementsByClassName("rocket");
            rocket[0].classList.add("starting");
            resetPanelAfterLaunch()
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

    let isReadyForLaunch = true;

    for (let i in requiredElements) {
        const element = requiredElements[i];
        if (element.type === "checkbox") {
            console.log("checkbox found");
            if (element.checked !== true) {
                console.info("a checkbox is not checked, launch is forbidden")
                isReadyForLaunch = false;
                break;
            }
        } else if (element.type === "range") {
            console.log("range found");
            if (element.value !== "100") {
                console.info("a range is not at maximum, launch is forbidden")
                isReadyForLaunch = false;
                break;
            }
        }
    }

    const launchButton = document.getElementById("launch");
    launchButton.disabled = isReadyForLaunch === false;

    return isReadyForLaunch;
}

function getAllControlElementsRequiredForLaunch() {
    return document.getElementsByClassName("required-for-launch");
}


/* Code for debugging */

/* Show control panel position. Required for manual debugging. Required because of
* over sized unit test by jetbrains academy. */
function checkControlPanelPosition() {
    const controlDeck = document.body.getElementsByClassName("control-panel");
    const space = document.body.getElementsByClassName("space");

    const controlDeckTop = parseInt(window.getComputedStyle(controlDeck[0]).top);
    const spaceHeight = space[0].scrollHeight;

    let controlPanelTooLow = controlDeckTop < spaceHeight / 3;

    alert(`controlDeckTop: ${controlDeckTop}, spaceHeight: ${spaceHeight}, controlPanelTooLow: ${controlPanelTooLow}`);
}

/* Check all checkboxes and maximize all range elements
   of control panel. This is a helper for debugging.
   May be called manually within browser console.*/
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

    checkReadyForLaunch();
}
