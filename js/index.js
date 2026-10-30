// Grab DOM
const userInput = document.getElementById("user-input");
const btnTranslate = document.getElementById("btn-translate");
const translator = document.getElementById("translator");
const titleTransform = document.getElementById("title-transform");
const titleLanguage = document.getElementById("title-language");
const textareaTranslator = document.createElement("textarea");
const startOverBtn = document.createElement("button");
const radioOption = document.querySelectorAll(".radio-option");

async function translateHandler(e) {
    e.preventDefault();
    const radioLanguage = document.querySelector("input[name=language]:checked");
    let seletctedValue = ""
    const usersText = userInput.value.trim();
    if(usersText === "") return;
    if(radioLanguage) {
        seletctedValue = radioLanguage.value
    } else {
        return;
    }
    console.log("click")
    console.log({
        firstPop: usersText,
        secondProp: seletctedValue
    })
    const translationData = {
        text: usersText,
        language: seletctedValue
    }
    console.log(translationData)
    try {
        const response = await fetch("http://localhost:3000/api/translator", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( translationData )
    })
    const data = await response.json();
    console.log(data.translation);
    textareaTranslator.classList.add("translate-one");
    startOverBtn.classList.add("start-over");
    startOverBtn.textContent = "Start Over";
    textareaTranslator.style.display = "block";
    startOverBtn.style.display = "block";
    translator.appendChild(textareaTranslator);
    translator.appendChild(startOverBtn);
    textareaTranslator.value = data.translation;
    titleTransform.textContent = "Original Text 👇🏾";
    titleLanguage.textContent = "Your Translation 👇🏾"
    radioOption.forEach((option) => {
    option.style.display = "none";
    
})

btnTranslate.style.display = "none";
    } catch(error) {
        console.error("Translation failed:", error);
    }
}


function startOverHandler(e) {
    e.preventDefault();
    userInput.value = "";
    textareaTranslator.value = "";
    textareaTranslator.style.display = "none";
    const selectedLanguage = document.querySelector("input[name=language]:checked");

if (selectedLanguage) {
    selectedLanguage.checked = false;
}
    startOverBtn.style.display = "none";
    radioOption.forEach((option) => {
        option.style.display = "block";
    });
    titleTransform.textContent = "Text Translation👇🏾";
    titleLanguage.textContent = "Select Language👇🏾";
    btnTranslate.style.display = "block";
}


// Add an event listener to see that it's working before we move on database
btnTranslate.addEventListener("click", translateHandler);
startOverBtn.addEventListener("click", startOverHandler);
