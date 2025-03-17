
document.getElementById("faq-btn").addEventListener("click", function () {
    document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("learn-btn").addEventListener("click", function () {
    document.getElementById("Vocab").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('pass');
    const banner = document.getElementById('banner');
    const navbar = document.getElementById('navbar');
    const vocabSection = document.getElementById('Vocab');
    const faqSection = document.getElementById('faq');

    navbar.style.display = "none";
    vocabSection.style.display = "none";
    faqSection.style.display = "none";

    document.getElementById('start-btn').addEventListener("click", function () {
        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!name) {
            alert("Please tell us your name first");
            return;
        }

        if (password !== "123456") {
            alert("Wrong password! Contact admin to get your login code");
            return;
        }

        // Show sections
        navbar.style.display = "block";
        vocabSection.style.display = "block";
        faqSection.style.display = "block";

        // Hide the banner
        banner.style.display = "none";

        Swal.fire({
            title: "অভিনন্দন",
            text: "চলুন আজ নতুন কিছু শেখা যাক",
            icon: "success",
          });
    });
});

document.getElementById('logout-btn').addEventListener("click", function () {
    document.getElementById('navbar').style.display = "none";
    document.getElementById('Vocab').style.display = "none";
    document.getElementById('faq').style.display = "none";
    document.getElementById('banner').style.display = "flex";
});


function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
  }

// const handleClick = () => {
//     console.log('Button clicked!');
//   };

function showloader()
{
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('word-container').classList.add("hidden");
}

function hideloader()
{
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('word-container').classList.remove("hidden");
}

function removeActive(){
    const activebtn=document.getElementsByClassName('active');
    for(let btn of activebtn)
    {
        btn.classList.remove('active')
    }
}

function loadlevels() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(data1 => displaylevels(data1.data))

}
function displaylevels(data) {
    const levelcontainer = document.getElementById('level-container')
    for (let level of data) {
        const div = document.createElement("div");
        div.innerHTML = `
                <button id="btn-${level.level_no}" onclick="loadwords('${level.level_no}')" id="btn-${level.id}" class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png" alt="">Lesson-${level.level_no}</button>
                `

        levelcontainer.appendChild(div)
    }

}
loadlevels()

const loadwords = (level_no) => {
    showloader()
    fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
        .then(response => response.json())
        .then(data => {
            removeActive()
            const clickedbtn=document.getElementById(`btn-${level_no}`)
            clickedbtn.classList.add('active')
            displaywords(data.data)})
}
//loadwords(1)

const displaywords = (words) => {
    //console.log(words)
    
    const wordcontainer = document.getElementById('word-container');
    wordcontainer.innerHTML="";

    if(words.length==0)
        {
            //console.log("nooo")
            wordcontainer.innerHTML=`
            <div class="col-span-full flex flex-col justify-center items-center text-center pt-10 pb-10">
                    <img class="w-[120px]" src="assets/alert-error.png" alt="">
                    <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="text-2xl font-bold">নেক্সট Lesson এ যান</h2>
                </div>`
                hideloader()
                return;
        }

    words.forEach((word) => {
        //console.log(word)
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="hover:bg-blue-50 bg-base-100 h-64 shadow-sm pt-3 pb-5 mt-6 mb-5">
        <div class="text-center">
        <p class="mt-5 text-2xl font-bold">${word.word}</p>
        <p class="mt-5 font-medium">Meaning/Pronounciation</p>
        <p class="mt-5 text-2xl font-bold">"${word.meaning ? word.meaning :'অর্থ নেই'}/${word.pronunciation || ''}"</p>
        <div class="flex justify-around pt-6">
        <button onclick="loadworddetails('${word.id}')" id="" class="bg-[#9ac2e7] w-7 h-7 rounded-lg p-1"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=84013&format=png&color=000000"></button>
        <button onclick="pronounceWord('${word.word}')" class="bg-[#9ac2e7] w-7 h-7 rounded-lg p-1"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=4nJj4Jt11SNK&format=png&color=000000"></button>
        </div>
        </div>
        </div>
        `
        wordcontainer.appendChild(div)
    })
    hideloader()
}



const loadworddetails=(id)=>{
    //console.log(id)
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      displayworddatails(data.data)
    })
  }
  
  const displayworddatails = (word) => {
    console.log(word);
    document.getElementById('word_details').showModal();
    const detailscontainer = document.getElementById('details_container');

    detailscontainer.innerHTML = `
    <div class="border border-blue-100 px-5 pt-2 pb-2">
        <div class="flex items-center gap-1">
            <p class="flex items-center gap-1 font-bold text-xl">
                ${word.word} 
                (<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=9622&format=png&color=000000">: ${word.meaning ? word.meaning :'অর্থ নেই'})
            </p>
        </div>
        <p class="font-bold text-sm pt-2 pb-2">Meaning</p>
        <p>${word.meaning ? word.meaning :'অর্থ নেই'}</p>
        <p class="font-bold text-sm pt-2 pb-2">Example</p>
        <p>${word.sentence}</p>
        <p class="font-semibold text-sm pt-2 pb-2">সমার্থক শব্দ গুলো</p>
        
        ${word.synonyms && word.synonyms.length > 0 ? `
        <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[0] || ''}</button>
        <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[1] || ''}</button>
        <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[2] || ''}</button>
        ` : ''}
    </div>`;
};

  
//   const displayworddatails = (word) => {
//     console.log(word);
//     document.getElementById('word_details').showModal();
//     const detailscontainer = document.getElementById('details_container');

//     // Default values to prevent displaying undefined/null
//     const wordText = word.word || "N/A";
//     const meaning = word.meaning || "No meaning available.";
//     const sentence = word.sentence || "No example available.";
//     const synonyms = Array.isArray(word.synonyms) && word.synonyms.length > 0 
//                      ? word.synonyms 
//                      : ["No synonyms available"];

//     detailscontainer.innerHTML = `
//     <div class="border border-blue-100 px-5 pt-2 pb-2">
//       <div class="flex items-center gap-1">
//         <p class="flex items-center gap-1 font-bold text-xl">${wordText} 
//           <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=9622&format=png&color=000000">
//         </p>
//       </div>
//       <p class="font-bold text-sm pt-2 pb-2">Meaning</p>
//       <p>${meaning}</p>
//       <p class="font-bold text-sm pt-2 pb-2">Example</p>
//       <p>${sentence}</p>
//       <p class="font-semibold text-sm pt-2 pb-2">সমার্থক শব্দ গুলো</p>
//       ${synonyms.map(syn => `<button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${syn}</button>`).join('')}
//     </div>`;
// };

//   document.getElementById('searchinput').addEventListener('keyup',(e)=>{
//       const input=e.target.value;
//       loadvideo(input)
//       console.log(input)
  //})

