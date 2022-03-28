const seasonNavigationButtons = document.querySelectorAll('.seasonNavBtn')
const seasonHeader = document.getElementById('seasonHeader') 
const roundsHeader = document.getElementById('rounds')

//const gamesByTeamName = 

seasonNavigationButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        let season = parseInt(seasonHeader.innerText)
        console.log(season)
        season = season + (event.target.id == 'previousSeasonBtn' ? -1 : +1)
        seasonHeader.innerText = season.toString();
        let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${season};source=1;format=json`)
        let seasonGames = response.data.games;
        console.log(seasonGames);
        let rounds = sortGamesIntoRounds(seasonGames)
        displayRounds(rounds)

    })  
});

const sortGamesIntoRounds = (games) => {
    const rounds = []
    games.forEach (game => {        
        if (game.round > rounds.length - 1) {
            rounds[parseInt(game.round)] = []
        }   
        let round = rounds[parseInt(game.round)]
        round.push(game)
    })
    return rounds
}

const displayRounds = (rounds) => {
    roundsHeader.innerHTML = ""
    rounds.forEach((round, index) => {
        const newRound = document.createElement('li')
        newRound.innerHTML = `<a href="#">${index}</a>`
        roundsHeader.appendChild(newRound)
    })
}



