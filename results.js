const roundHeader = document.getElementById('roundHeader') 



window.onload = function() {
    let selectedSeason = localStorage.getItem("selectedSeason")
    let selectedRound = localStorage.getItem("selectedRound")
    let rounds  = JSON.parse(localStorage.getItem("rounds"))
    console.log("Season - " + selectedSeason)
    console.log("SelectedRound - " + selectedRound)
    console.log("Total Rounds - " + rounds.length)
    displayResultsForRound(selectedSeason, selectedRound, rounds) 
}

const displayResultsForRound = async (season, roundId, rounds) => {
    if (season && roundId) {
        //let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${season};round=${roundId};source=1;format=json`)
        //let games = response.data.games;
        rounds[roundId].games.forEach((game, i) => {
            if (i == 0) {
                console.log(game)
                setRoundHeader(season, game.roundname)
            }
            const newResult = document.createElement('li')
            newResult.innerText = game.hteam + " " + game.hscore + " v " + game.ascore + " " + game.ateam
            results.appendChild(newResult)
        })
    }
}

const setRoundHeader = (season, roundName) => {
    roundHeader.innerText = (season + ", " + roundName)
}