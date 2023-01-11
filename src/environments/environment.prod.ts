let corsanywhere: string = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/';


export const environment = {
  production: true,

  fpl: {
    bootstrap: (corsanywhere + 'bootstrap-static/'),
    league: (corsanywhere + 'leagues-classic/1051448/standings/'),
    fixtures: (corsanywhere + 'fixtures/?event='),
  },
  team: {
    picks: (corsanywhere + 'entry/'),
  }
};
