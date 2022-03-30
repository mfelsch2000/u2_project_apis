# u2_project_apis

# Who plays best at home and who plays best away?

#### Aussie Rules, not the oldest game in the world.  The Australia Football League (the AFL), the oldest sporting league in the world.

### . 
### The goal of this project was to analyse the AFL match results returned by squiggle.com.au as follows: 

### Like most leagues, AFL teams play half of their season games at their home ground and the other half away.  This page analyses the current and previous seasons to determine which teams have the best performance at home and which teams have best performance when on the road.  


### However, ended up with a view of the rounds for each seasson (index.html) and a view of games results for a selected round (results.html)

### The Squiggle API is called to retrieve an array of all the games for a given season. The array is sorted into rounds and these are listed on the main page. Arrow keys are available to move back n forth through the seasons. The listed rounds are hyperlinked to a results page. Parameters are passed between the 2 pages using localStorage (Tags: "selectedSeason", "selectedRound", "rounds")


