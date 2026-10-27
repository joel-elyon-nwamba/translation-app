// Grab DOM
const userInput = document.getElementById("user-input");
const btnTranslate = document.getElementById("btn-translate");

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
    const response = await fetch("http://localhost:3000/api/translator", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( translationData )
    })
    const data = await response.json();
    console.log(data.translation);

}


// Add an event listener to see that it's working before we move on database
btnTranslate.addEventListener("click", translateHandler);
