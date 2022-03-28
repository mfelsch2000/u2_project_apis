const seasonNavigationButtons = document.querySelectorAll('.seasonNavBtn')
const seasonHeader = document.getElementById('seasonHeader') 
const roundsHeader = document.getElementById('rounds')
const roundsLinks = document.getElementById('roundsLinks')
const resultsHeader = document.getElementById("resultHeader")
const results = document.getElementById("results")

let rounds

seasonNavigationButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        let season = parseInt(seasonHeader.innerText)
        console.log(season)
        season = season + (event.target.id == 'previousSeasonBtn' ? -1 : +1)
        seasonHeader.innerText = season.toString();
        let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${season};source=1;format=json`)
        let seasonGames = response.data.games;
        console.log(seasonGames);
        rounds = sortGamesIntoRounds(seasonGames)
        clearResults()
        displayRounds(rounds)

    })  
});

const sortGamesIntoRounds = (games) => {
    const rounds = []
    games.forEach (game => {        
        if (game.round > rounds.length - 1) {
            rounds[parseInt(game.round)] = {roundName: game.roundname, games: []}
        }   
        let round = rounds[parseInt(game.round)]
        round.games.push(game)
    })
    return rounds
}

const displayRounds = (rounds) => {
    roundsLinks.innerHTML = ""
    rounds.forEach((round, index) => {
        const newRound = document.createElement('li')
        let roundName 
        if (round.roundName.indexOf("Round") > - 1) {
            roundName = round.roundName.substr(6)
        }
        else {
            switch (round.roundName) {
            case "Grand Final":
                    roundName = "GF"
                    break
            case "Qualifying Final":
                roundName = "QF"
                break
            case "Semi-Final":
                roundName = "SF"
                break
            case "Preliminary Final":
                roundName = "PF"
                break
            case "Elimination Final":
                roundName = "EF"
                break
            default:
                console.log(round.roundName)
                roundName = "Unkn"
            }

        }
        newRound.innerHTML = `<a id="${index} "href="#">${roundName}</a>`
        roundsLinks.appendChild(newRound)
    })
}


roundsLinks.addEventListener('click', (event) => {
    displayResultsForRound(parseInt(event.target.id))
});


const displayResultsForRound = (roundId) => {
    clearResults()
    console.log(roundId)
    round = rounds[roundId]
    round.games.forEach((game) => {
        const newResult = document.createElement('li')
        newResult.innerText = game.hteam + " " + game.hscore + " v " + game.ascore + " " + game.ateam
        results.appendChild(newResult)
    })
}

const clearResults = () => {
    results.innerHTML = ""
}