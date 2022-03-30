const roundHeader = document.getElementById('roundHeader') 
const classWinner = "winner"
const classDraw = "draw"
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

let rounds, selectedSeason, selectedRound, summaryDate

window.onload = function() {
    selectedSeason = localStorage.getItem("selectedSeason")
    selectedRound = localStorage.getItem("selectedRound")
    rounds = JSON.parse(localStorage.getItem("rounds"))
    console.log("Season - " + selectedSeason)
    console.log("SelectedRound - " + selectedRound)
    console.log("Total games - " + rounds.length)
    sortRoundsByDate()
    displayResultsForRound(selectedSeason, selectedRound) 
}

const displayResultsForRound = (season, roundId) => {
    if (season && roundId) {
        
        rounds[roundId].games.forEach((game, i) => {
            if (i == 0) {
                setRoundHeader(season, game.roundname)
            }
            insertMatchDate(game)
            insertResult(game)
        })
    }
}

const setRoundHeader = (season, roundName) => {
    roundHeader.innerText = (season + " " + roundName)
}

const sortRoundsByDate = () => {
  rounds[selectedRound].games.sort( function( a , b) {
    const aDate = Date.parse(a.date.slice(0, 10))
    const bDate = Date.parse(b.date.slice(0, 10))
    if(aDate > bDate) return 1;
    if(aDate < bDate) return -1;
    return 0;
  })
}

const insertMatchDate = (game) => {
    let gameDate = Date.parse(game.date.slice(0, 10))
    if (!summaryDate || gameDate > summaryDate) {
        const newDate = document.createElement('li')
        newDate.classList.add("matchDate")
        summaryDate = gameDate
        let formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(summaryDate);
        newDate.innerHTML = `<span class="matchDate">${formattedDate}</span>`
        results.appendChild(newDate)
    }
}

const insertResult = (game) => {
    const newResult = document.createElement('li')  
    newResult.classList.add("result")
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

    result = `<div>`
    result += `<span class=" team homeTeam ${hteamClass}">${hteam}</span>`
    result += score
    result += `<span class="team awayTeam ${ateamClass}">${ateam}</span>`
    result += `</div>`

    // result += '<span class="minorDetails">${game.venue} </span>`
    newResult.innerHTML = result
    results.appendChild(newResult)
}