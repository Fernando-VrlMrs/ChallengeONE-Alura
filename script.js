"use strict";
const components = (selector) => document.querySelector(selector);

const notContent = components(".et-container.notMsg");
const content = components(".et-container.msg");
const typeText = components(".et-text.type");
const showText = components(".et-text.show");
const buttonEncrypt = components(".et-button.encrypt");
const buttonDecrypt = components(".et-button.decrypt");
const buttonCopy = components(".et-copy");

// Encrypt && Decript Text
const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const encryptText = (text) => {
  return text
    .split("")
    .map((letter) => {
      if (keys[letter] !== undefined) return keys[letter];
      return letter;
    })
    .join("");
};

const decryptText = (text) => {
  let decodeText = "";
  for (let indexLetter = 0; indexLetter < text.length; indexLetter++) {
    let letter = text[indexLetter];
    if (keys[letter] !== undefined) {
      let key = keys[letter];
      let hidenText = text.slice(indexLetter, indexLetter + key.length);
      if (hidenText === key) {
        indexLetter = indexLetter + (key.length - 1);
      }
    }
    decodeText += letter;
  }
  return decodeText;
};

const encrypt = () => {
  const txt = typeText.value;
  showText.innerText = encryptText(txt);
  notContent.style.display = "none";
  content.style.display = "flex";
};

const decrypt = () => {
  const txt = typeText.value;
  showText.innerText = decryptText(txt);
  notContent.style.display = "none";
  content.style.display = "flex";
};

// Copy submitted text
const copy = () => {
  const copyText = showText.value;
  navigator.clipboard.writeText(copyText);
};

// Avoid capital letters and special characters
typeText.addEventListener("keydown", (e) => {
  if (e.key.toUpperCase() === e.key && e.key !== " ") {
    e.preventDefault();
    alert("Solo se permiten letras minúsculas y sin acentos");
  }
});

// Adjust height of textareas
typeText.addEventListener("input", () => {
  typeText.style.height = "auto";
  typeText.style.height = `${typeText.scrollHeight}px`;
});

showText.addEventListener("input", () => {
  showText.style.height = "auto";
  showText.style.height = `${showText.scrollHeight}px`;
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
