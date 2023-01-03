import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  gameweek: number = 19;

  async getTeamPicks(entry: number) {
    return this.httpClient.get(environment.team.picks + entry + '/event/' + this.gameweek + '/picks/');
  }
}
