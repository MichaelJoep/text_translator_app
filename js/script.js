const selectTag = document.querySelectorAll("select");
const translatBtn = document.querySelector("button");
const textIn  =  document.querySelector(".text_in");
const textOut = document.querySelector(".text_out");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".rows i");



 Array.from(selectTag).forEach((item, id) => {
    for(let country_code in countries) {
        //selecting English by default as  IN language and Hindi as OUT language
        let selected;

        if(id  === 0 && country_code === "en-GB") {
            selected = "selected";
        } else if(id  === 1 && country_code === "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        item.insertAdjacentHTML("beforeend", option); // Adding option tag in the select tag

    }
});
// exchanging language textarea and selected tag
exchangeIcon.addEventListener("click", () => {
    let tempText = textIn.value;
    let temLang = selectTag[0].value;
    textIn.value = textOut.value;
    selectTag[0].value = selectTag[1].value;
    textOut.value = tempText;
    selectTag[1].value = temLang;
});

translatBtn.addEventListener("click", () => {
    let text = textIn?.value;
    translateTextIn = selectTag[0].value, // getting from selected Text In value
    translateTextOut = selectTag[1].value; // getting from selected Text out value
    if(!text) return;
    textOut.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateTextIn}|${translateTextOut}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        textOut.value = data.responseData.translatedText;
        console.log(data.responseData.translatedText)
        textOut.setAttribute("placeholder", "Translation");
    })
 
});

icons.forEach((icon) => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            if(target.id === "from") {
                navigator.clipboard.writeText(textIn.value);
            } else {
                navigator.clipboard.writeText(textOut.value);
            }
        } else {
            let utterance;
            if(target.id === "from") {
               utterance = new SpeechSynthesisUtterance(textIn.value);
               utterance.lang = selectTag[0].value; //setting utterance language from textIn
            } else {
                utterance = new SpeechSynthesisUtterance(textOut.value);
                utterance.lang = selectTag[1].value; // setting utterance language from textOut
            }
            speechSynthesis.speak(utterance); // speak passed utterance
        }
    });
})



