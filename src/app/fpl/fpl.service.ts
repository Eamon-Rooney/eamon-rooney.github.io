
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FixturesList } from 'app/interfaces/fixtures';

@Injectable({providedIn: 'root'})
export class FplService {
  constructor(private httpClient: HttpClient) { }

  // defaultLeague: number = 1051448;

  async getFplBootstrap() {
    return this.httpClient.get(environment.fpl.bootstrap);
  }

  async getFplLeague() {
    return this.httpClient.get(environment.fpl.league);
  }

  async updateFplLeague(newleague: number) {
    return this.httpClient.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/leagues-classic/' + newleague +'/standings/');
  }

  async getFixtures(fixtureEventID: number) {
    return this.httpClient.get<FixturesList>(environment.fpl.fixtures + fixtureEventID);
  }

}
