import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  async getTeamPicks(teamID: number, gameweek: number) {
    return this.httpClient.get(environment.team.picks + teamID + '/event/' + gameweek + '/picks/');
  }


  async getTeamTransfers(teamID: number) {
    return this.httpClient.get(environment.team.transfers + teamID + '/transfers/');
  }
}
