const whichLeaguesToFetch: string[] = [ // initial array with leagues wanted (you can add/edit/remove...)
    'English Premier League',
    'Spanish La Liga',
    'German Bundesliga',
    'Italian Serie A',
    'Israeli Premier League'
]

interface teamsObject {     // interface to hold each team data
    name: string;
    logo: string;
}

interface leaguesDictionary {       // the data sturture to work with to create new dom elements 
    [key: string]: teamsObject[];
}

const fetchTeams = async (leagueName: string): Promise<void> => {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${leagueName}`); // api call with the league name
    const { teams } = await response.json();
    let leaguesData: leaguesDictionary = {};

    teams.forEach((team: any) => {     // iterare over the teams, and create new 'teamsObject' (and adding it to 'leaguesData')
        const currentTeam: teamsObject = {  // assigning the wanted fields
            name: team.strTeam,
            logo: team.strTeamBadge
        }
        // if key exists, push new item, otherwise create the key and assign 
        leaguesData[leagueName] ? leaguesData[leagueName].push(currentTeam) : leaguesData[leagueName] = [currentTeam];
    })
    // console.log(leaguesData)
    createTabColumn(leaguesData);   // using the new league data structure to create tab column
}

const createTabColumn = (leagues: leaguesDictionary) => {
    const tab = document.getElementById("tab");                     
    const teamsTable = document.getElementById('teams--table');
    for (const key in leagues) {
        const btn = document.createElement("button");               // creating button for each league
        btn.textContent = key;                                      
        tab?.appendChild(btn);                                      // append each button to the 'tab' div
        btn.addEventListener('click', () => {
            teamsTable!.innerHTML = ''                              //clear teams--table before appending current league teams
            for(const team of leagues[key]) {
                const teamRow = document.createElement('div');      // create row for each team and adding imd & name
                const teamLogo = document.createElement('img');     
                const teamName = document.createElement('span');
                teamRow.appendChild(teamLogo);
                teamRow.appendChild(teamName);
                teamsTable?.appendChild(teamRow);
                teamLogo.src = team.logo;
                teamName.textContent = team.name;
            }
        })
    }
}

// run 'fetchTeams' for each league inside the initial array
whichLeaguesToFetch.forEach(league => { 
    fetchTeams(league);
})