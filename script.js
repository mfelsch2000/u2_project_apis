const seasonNavigationButtons = document.querySelectorAll('.seasonNavBtn')
const seasonHeader = document.getElementById('seasonHeader') 

seasonNavigationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let season = parseInt(seasonHeader.innerText)
        console.log(season)
        season = season + (event.target.id == 'previousSeasonBtn' ? -1 : +1)
        seasonHeader.innerText = season.toString();
    })  
});

/*
button.addEventListener('click', async () => {
   // let breed = breedInput.value
    let response = await axios.get('https://api.squiggle.com.au/?q=games;year=2022;round=1source=1;format=json')
    console.log(response)

})
*/


// On page load, set default date to 2021.

