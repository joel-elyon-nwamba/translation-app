// Understand => A user is typing inside the text any word from english to have it translated. Once the word is written in text th user must select eigther French, Spanish, or English then click the button "Translate" And AI should be able to translate the word.
// What is the input => The input is a string, arrays, DATA input from AI
// What is the output => The output is to have AI provide a response back with a specific number of tokens.
 const textareaInput = document.createElement("textarea");
 const translator = document.getElementById("translator");
const userInput = document.getElementById("user-input")


async function tanslationHandler(e) {
    e.preventDefault();
    // Grab the users input 
    userInput.value.trim();
    if(!userInput) return

    // Grab the Api
    try{

        const response = await fetch("/api/translator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userInput })
        });

        // grab the data
        const data = await response.json();
        const suggestedTranslator = data.suggestedTranslator

        const html = marked.parse(suggestedTranslator);
        const safeHTML = DOMPurify.sanitize(html);
        textareaInput.classList.add("translate-output");
        textareaInput.innerHTML = safeHTML;
        translator.appendChild(textareaInput);


    } catch(errror){

    } finally {

    }

}

