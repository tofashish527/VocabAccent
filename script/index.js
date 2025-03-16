

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
        <div class=" bg-base-100 h-64 shadow-sm pt-3 pb-5 mt-6 mb-5">
        <div class="text-center">
        <p class="mt-5 text-2xl font-bold">${word.word}</p>
        <p class="mt-5 font-medium">Meaning/Pronounciation</p>
        <p class="mt-5 text-2xl font-bold">"${word.meaning}/${word.pronunciation}"</p>
        <div class="flex justify-around pt-6">
        <button onclick="loadworddetails('${word.id}')" id="" class="bg-[#9ac2e7] w-7 h-7 rounded-lg p-1"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=84013&format=png&color=000000"></button>
        <button class="bg-[#9ac2e7] w-7 h-7 rounded-lg p-1"><img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=4nJj4Jt11SNK&format=png&color=000000"></button>
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
  
  const displayworddatails=(word)=>{
     console.log(word)
     document.getElementById('word_details').showModal()
     const detailscontainer=document.getElementById('details_container');
     detailscontainer.innerHTML=`
     <div class="border border-blue-100 px-5 pt-2 pb-2">
     <div class="flex items-center gap-1"><p class="flex items-center gap-1 font-bold text-xl">${word.word}(<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=9622&format=png&color=000000">:${word.meaning})</p>
     </div>
     <p class="font-bold text-sm pt-2 pb-2">Meaning</p>
     <p>${word.meaning}</p>
     <p class="font-bold text-sm pt-2 pb-2">Example</p>
     <p>${word.sentence}</p>
     <p class="font-semibold text-sm pt-2 pb-2">সমার্থক শব্দ গুলো</p>
     <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[0]}</button>
      <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[1]}</button>
      <button class="bg-blue-50 p-1 rounded-lg border border-gray-300">${word.synonyms[2]}</button>
     </div>
     
     `
  }
  
//   document.getElementById('searchinput').addEventListener('keyup',(e)=>{
//       const input=e.target.value;
//       loadvideo(input)
//       console.log(input)
  //})

