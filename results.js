const roundHeader = document.getElementById('roundHeader') 
const classWinner = "winner"
const classDraw = "draw"



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
            if (i == 5) {
                console.log(game)
                setRoundHeader(season, game.roundname)
            }
            const newResult = document.createElement('li')
            let hteamClass, ateamClass, result, score
            if (parseInt(game.complete) > 0 ) {
               if (game.hteam == game.winner) {
                    hteamClass = classWinner
                }
                else if (game.ateam == game.winner) {
                    ateamClass = classWinner
                } 
                else {
                    hteamClass = classDraw
                    ateamClass = classDraw
                }
                score = `<span class="goals">${game.hgoals}.${game.hbehinds}.</span>`
                score += `<span class="score">${game.hscore}</span>`
                score += `<span class="divider">v</span>`
                score += `<span class="goals">${game.agoals}.${game.abehinds}.</span>`
                score += `<span class="score">${game.ascore}</span>`            }
            else {
                score = `<span class="score"></span>`
                score += `<span class="divider">v</span>`
                score += `<span class="score"></span>`
            }
            let hteam = game.hteam ? game.hteam : '---'
            let ateam = game.ateam ? game.ateam : '---'

            result = `<div class="result">`
            result += `<span class=" team homeTeam ${hteamClass}">${hteam}</span>`
            result += score
            result += `<span class="team awayTeam ${ateamClass}">${ateam}</span>`
            result += `</div>`

            
            // result += '<span class="minorDetails">${game.venue} </span>`
            newResult.innerHTML = result

            results.appendChild(newResult)
        })
    }
}

const setRoundHeader = (season, roundName) => {
    roundHeader.innerText = (season + " " + roundName)
}