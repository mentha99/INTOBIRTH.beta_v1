// Speed for typewriter, the smaller the delay, the faster to type in
const typeInDelay = 20;
const deleteDelay = 2;
const textDuration = 3500;
const lastTextDuration = 100;
const blankDuration = 400;

// Set up text typewriter
const app = document.getElementById('khj3'); // font
const instructionText = new Typewriter(app, { loop: false, delay: typeInDelay, cursor: '' }); // disable cursor
let textID = "";

// Print initial text
instructionText
    .typeString("[Press ENTER to start]")
    .start()

function displayTextSequence(sequence, index = 0, onComplete = null) {
    // Check if the current text is the last string in the sequence
    const isLastString = index === sequence.length - 1;

    // Use a separate duration for the last string
    const duration = isLastString ? lastTextDuration : textDuration;

    if (index >= sequence.length) {
        if (onComplete) onComplete(); // Call the callback when the sequence finishes
        return;
    }

    const { text } = sequence[index];
    instructionText
        .deleteAll(deleteDelay) // Clear existing text
        .typeString(text) // Type the current text
        .start()
        .callFunction(() => {
            // Wait for the specified duration before displaying the next text
            setTimeout(() => {
                displayTextSequence(sequence, index + 1, onComplete); // Move to the next text in the sequence
            }, duration);
        });
}

/*
function displayTextSequence(sequence, index = 0, onComplete = null) {
    const duration = textDuration;
    if (index >= sequence.length) {
        if (onComplete) onComplete(); // Call the callback when sequence finishes
        return;
    }
    const { text } = sequence[index];
    instructionText
        .deleteAll(deleteDelay) // Clear existing text
        .typeString(text) // Type the current text
        .start()
        .callFunction(() => {
            // Wait for the specified duration before displaying the next text
            setTimeout(() => {
                displayTextSequence(sequence, index + 1, onComplete); // Move to the next text in the sequence
            }, duration);
        });
}
        */