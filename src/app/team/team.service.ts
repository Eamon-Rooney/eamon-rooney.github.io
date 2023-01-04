import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  async getTeamPicks(entry: number, gameweek: number) {
    return this.httpClient.get(environment.team.picks + entry + '/event/' + gameweek + '/picks/');
  }
}
