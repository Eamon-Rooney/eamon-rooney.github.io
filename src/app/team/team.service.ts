import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PicksList } from 'app/interfaces/picks';
import { TransferList } from 'app/interfaces/transfers';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  async getTeamPicks(teamID: number, gameweek: number) {
    return this.httpClient.get<PicksList>(environment.team.picks + teamID + '/event/' + gameweek + '/picks/');
  }


  async getTeamTransfers(teamID: number) {
    return this.httpClient.get<TransferList>(environment.team.transfers + teamID + '/transfers/');
  }
}
