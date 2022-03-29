const seasonNavigationButtons = document.querySelectorAll('.seasonNavBtn')
const seasonHeader = document.getElementById('seasonHeader') 
const roundsHeader = document.getElementById('rounds')
const regularSeasonLinks = document.getElementById('regularSeasonLinks')
const finalsLinks = document.getElementById('finalsLinks')
const resultsHeader = document.getElementById("resultHeader")
const results = document.getElementById("results")
const currentSeason = 2022
const firstSeason = 1895

let rounds
let selectedSeason 

window.onload = function() {
   selectedSeason = localStorage.getItem("selectedSeason")
   if (!selectedSeason) {
       selectedSeason = currentSeason
   }
   setSeason(selectedSeason)
}

seasonNavigationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let season = selectedSeason
        let changeSeason = false
       // console.log(season)
        if (event.target.id == 'previousSeasonBtn') {
            if (season > firstSeason) {
                season--
                changeSeason = true
            } 
            else {
                console.log("First season reached")
            }
        }
        else {
            if (season < currentSeason) {
                season++
                changeSeason = true
            }
            else {
                console.log("Max season reached")
            }
        }
        if (changeSeason) {
            setSeason(season)
        }
    })  
});

const setSeason = async (season) => {
    selectedSeason = season
    clearRounds()
    seasonHeader.innerText = season.toString()
    localStorage.setItem("selectedSeason", season)
    let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${season};source=1;format=json`)
    let seasonGames = response.data.games;
    // console.log(seasonGames);
    rounds = sortGamesIntoRounds(seasonGames)
    displayRounds(rounds)
}


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

    rounds.forEach((round, index) => {
        const newRound = document.createElement('li')
        let isFinal = false
        let roundName = ""
        if (round.roundName.indexOf("Round") > - 1) {
            roundName = round.roundName.substr(6)
        }
        else {
            isFinal = true
            switch (round.roundName) {
            case "Grand Final":
                    roundName = "Grand Final"
                    break
            case "Qualifying Final":
                roundName = "Qualifying Finals"
                break
            case "Semi-Final":
                roundName = "Semi-Finals"
                break
            case "Preliminary Final":
                roundName = "Preliminary Finals"
                break
            case "Elimination Final":
                roundName = "Elimination Finals"
                break
            default:
                console.log("Unrecognised finals round: " & round.roundName)
                roundName = round.roundName
            }
            
        }
//        newRound.innerHTML = `<a href="results.html" id=${index}>${roundName}</a>`
        newRound.innerHTML = `<a href="#" id="${index}">${roundName}</a>`

        if (isFinal) {
            finalsLinks.appendChild(newRound)
        }
        else {
            regularSeasonLinks.appendChild(newRound)
        }
    })
}

regularSeasonLinks

regularSeasonLinks.addEventListener('click', (event) => {
    localStorage.setItem("selectedRound", event.target.id)
    window.location.href = "results.html"
});

finalsLinks.addEventListener('click', (event) => {
    localStorage.setItem("selectedRound", event.target.id)
    window.location.href = "results.html"
});

const clearRounds = () => {
    rounds = []
    regularSeasonLinks.innerHTML = ""
    finalsLinks.innerHTML = ""
}