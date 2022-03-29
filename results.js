const roundHeader = document.getElementById('roundHeader') 



window.onload = function() {
    let selectedSeason = localStorage.getItem("selectedSeason")
    let selectedRound = localStorage.getItem("selectedRound")
    console.log("Season - " + selectedSeason)
    console.log("SelectedRound - " + selectedRound)
    displayResultsForRound(selectedSeason, selectedRound) 
}

const displayResultsForRound = async (season, roundId) => {
    if (season && roundId) {
        let response = await axios.get(`https://api.squiggle.com.au/?q=games;year=${season};round=${roundId};source=1;format=json`)
        let games = response.data.games;
        games.forEach((game, i) => {
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