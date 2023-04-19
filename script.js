"use strict";
const components = selector => document.querySelector(selector);
// Containers
const initialContent = components(".container-two__initial-content");
const submittedTextContainer = components(".container-two__header");
// Textareas
const typeText = components(".header__type-text");
const submittedText = components(".header__submitted-text");
// Buttons
const buttonEncrypt = components(".button-encrypt");
const buttonDecrypt = components(".button-decrypt");
const buttonCopy = components(".button-copy");

// Encrypt && Decript Text
const keys = {
    "a" : "ai",
    "e" : "enter",
    "i" : "imes",
    "o" : "ober",
    "u" : "ufat"
};

const encryptText = text => {
    return text.split("").map(letter => {
        if (keys[letter] !== undefined) return keys[letter];
        else return letter;
    }).join("");
}

const decryptText = text => {
    let decodeText = "";
    for (let indexLetter = 0; indexLetter < text.length; indexLetter++) {
        let letter = text[indexLetter];
        if (keys[letter] !== undefined) {
            let key = keys[letter];
            let hidenText = text.slice(indexLetter, indexLetter + key.length);
            if(hidenText === key){
                indexLetter = indexLetter + (key.length - 1);
            }
        }
        decodeText += letter;
    }
    return decodeText;
};

const encrypt = () => {
    const txt = typeText.value;
    submittedText.innerText = encryptText(txt);
    initialContent.style.display = "none";
    submittedTextContainer.style.display = "flex";
    submittedTextContainer.style.flexFlow = "column";
    buttonCopy.style.display = "block";
}

const decrypt = () => {
    const txt = typeText.value;
    submittedText.innerText = decryptText(txt);
    initialContent.style.display = "none";
    submittedTextContainer.style.display = "flex";
    submittedTextContainer.style.flexFlow = "column";
    buttonCopy.style.display = "block";
}

// Copy submitted text
const copy = () => {
    const copyText = submittedText.value;
    navigator.clipboard.writeText(copyText);
};

// Avoid capital letters and special characters
typeText.addEventListener("keydown", e => {
    if (e.key.toUpperCase() === e.key && e.key !== " ") {
        e.preventDefault();
        alert("Solo se permiten letras minúsculas y sin acentos");
    }
});

// Adjust height of textareas
typeText.addEventListener('input', () => {
    typeText.style.height = 'auto';
    typeText.style.height = `${typeText.scrollHeight}px`;
});

submittedText.addEventListener('input', () => {
    submittedText.style.height = 'auto';
    submittedText.style.height = `${submittedText.scrollHeight}px`;
});

// Remove text
// const removeText = () => {
//     typeText.value = "";
// };

// Enable fuctions
buttonEncrypt.addEventListener("click", encrypt);
buttonDecrypt.addEventListener("click", decrypt);
buttonCopy.addEventListener("click", copy);
// button---.addEventListener("click", removeText);