var biggestIndex = 1;

function updateTime() {
                var currentTime = new Date().toLocaleString();
                var timeText = document.querySelector("#timeElement");
                timeText.innerHTML = currentTime;
            }
            setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
        // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
        // This allows you to drag the window around by its header.
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
        // This allows you to drag the window by holding down anywhere on the window.
        element.onmousedown = startDragging;
    }

    // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 7: Get the mouse cursor position at startup.
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        // Step 10: Calculate the new cursor position.
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
}
welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});
function handleWindowTap(element) {
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
}
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}
function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName)
    addWindowTapHandling(screen)
    dragElement(screen)
}

document.addEventListener("DOMContentLoaded", function () {
    var calculatorScreen = document.querySelector("#calculator");
    var calculatorScreenClose = document.querySelector("#calculatorclose");
    var calculatorScreenOpen = document.querySelector("#calculatoropen");
    var calcDisplay = document.querySelector("#calcDisplay");
    var calcButtons = document.querySelectorAll(".calc-btn");
    var calcExpression = "";

    if (calculatorScreen) {
        initializeWindow("calculator");
    }

    if (calculatorScreenClose && calculatorScreen) {
        calculatorScreenClose.addEventListener("click", function () {
            closeWindow(calculatorScreen);
        });
    }

    if (calculatorScreenOpen && calculatorScreen) {
        calculatorScreenOpen.addEventListener("click", function () {
            openWindow(calculatorScreen);
        });
    }

    function updateCalcDisplay(value) {
        if (calcDisplay) {
            calcDisplay.value = value || "0";
        }
    }

    function clearCalculator() {
        calcExpression = "";
        updateCalcDisplay("0");
    }

    function calculateResult() {
        try {
            var result = eval(calcExpression);
            calcExpression = String(result);
            updateCalcDisplay(calcExpression);
        } catch (error) {
            updateCalcDisplay("Error");
            calcExpression = "";
        }
    }

    calcButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var value = button.getAttribute("data-value");

            if (value === "C") {
                clearCalculator();
                return;
            }

            if (value === "=") {
                calculateResult();
                return;
            }

            if (calcDisplay && (calcDisplay.value === "0" || calcDisplay.value === "Error")) {
                calcExpression = "";
            }

            calcExpression += value;
            updateCalcDisplay(calcExpression);
        });
    });

    clearCalculator();
});

var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#notesclose");
var notesScreenOpen = document.querySelector("#notesopen");
var notesArea = document.querySelector("#notesArea");

if (notesScreen) {
    initializeWindow("notes");
}

if (notesScreenClose && notesScreen) {
    notesScreenClose.addEventListener("click", function () {
        closeWindow(notesScreen);
    });
}

if (notesScreenOpen && notesScreen) {
    notesScreenOpen.addEventListener("click", function () {
        openWindow(notesScreen);
    });
}
if (notesArea) {
    notesArea.value = localStorage.getItem("netraos-notes") || "";

    notesArea.addEventListener("input", function () {
        localStorage.setItem("netraos-notes", notesArea.value);
    });
}