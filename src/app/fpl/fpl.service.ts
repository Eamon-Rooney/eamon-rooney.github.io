
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FixturesList } from 'app/interfaces/fixtures';
import { Bootstrap } from 'app/interfaces/bootstrap';
import { LeagueStandings } from 'app/interfaces/standings';

@Injectable({providedIn: 'root'})
export class FplService {
  constructor(private httpClient: HttpClient) { }

  // defaultLeague: number = 1051448;

  async getFplBootstrap() {
    return this.httpClient.get<Bootstrap>(environment.fpl.bootstrap);
  }

  async getFplLeague() {
    return this.httpClient.get<LeagueStandings>(environment.fpl.league);
  }

  async updateFplLeague(newleague: number) {
    return this.httpClient.get<LeagueStandings>('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/leagues-classic/' + newleague +'/standings/');
  }

  async getFixtures(fixtureEventID: number) {
    return this.httpClient.get<FixturesList>(environment.fpl.fixtures + fixtureEventID);
  }

}
