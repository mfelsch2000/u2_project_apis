const seasonNavigationButtons = document.querySelectorAll('.seasonNavBtn')
const seasonHeader = document.getElementById('seasonHeader') 
const roundsLinks = document.getElementById('roundsLinks')
const regularSeasonLinks = document.getElementById('regularSeasonLinks')
const finalsLinks = document.getElementById('finalsLinks')

const currentSeason = 2022
const firstSeason = 2000

let rounds
let selectedSeason 

window.onload = function() {
 //   console.log("Loading")
   selectedSeason = localStorage.getItem("selectedSeason")
   if (!selectedSeason) {
       selectedSeason = currentSeason
       
   }
  // console.log("season " & selectedSeason)
   displaySeason()
}

seasonNavigationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let seasonChanged = false
       // console.log(season)
        if (event.target.id == 'previousSeasonBtn') {
            if (selectedSeason > firstSeason) {
                selectedSeason--
                seasonChanged = true
            } 
            else {
                console.log("First season reached")
            }
        }
        else {
            if (selectedSeason < currentSeason) {
                selectedSeason++
                seasonChanged = true
            }
            else {
                console.log("Max season reached")
            }
        }
        if (seasonChanged) {
            displaySeason()
        }
    })  
});

const displaySeason = async () => {
    seasonHeader.innerText = selectedSeason.toString()
    localStorage.setItem("selectedSeason", selectedSeason)
    let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${selectedSeason};source=1;format=json`)
    let seasonGames = response.data.games;
    // console.log(seasonGames);
    clearRounds()
    sortGamesIntoRounds(seasonGames)
    displayRounds()
}


const sortGamesIntoRounds = (games) => {
    rounds = []
    games.forEach (game => {        
        if (game.round > rounds.length - 1) {
            rounds[parseInt(game.round)] = {roundName: game.roundname, games: []}
        }   
        let round = rounds[parseInt(game.round)]
        round.games.push(game)
    })
}

const displayRounds = () => {

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

        newRound.innerHTML = `<a href="#" class="roundName" id="${index}">${roundName}</a>`

        if (isFinal) {
            finalsLinks.appendChild(newRound)
        }
        else {
            regularSeasonLinks.appendChild(newRound)
        }
    })
}

roundsLinks.addEventListener('click', (event) => {
    let selectedRoundId = event.target.id
    gotoResults(selectedRoundId)
});

roundsLinks.addEventListener('focus', (event) => {
    console.log("here")
    console.log(event.target.classList)
    event.target.classList.add("focus")
});

roundsLinks.addEventListener('blur', (event) => {
    console.log("here 2")
    console.log(event.target.classList)
    event.target.classList.remove("focus")
});

const gotoResults = (roundId) => {
    localStorage.setItem("selectedRound", roundId)
    localStorage.setItem("rounds", JSON.stringify(rounds))
    window.location.href = "results.html"
}

const clearRounds = () => {
    rounds = []
    regularSeasonLinks.innerHTML = ""
    finalsLinks.innerHTML = ""
}