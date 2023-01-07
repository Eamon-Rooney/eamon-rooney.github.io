import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FplService } from '../fpl/fpl.service';
import { TeamService } from './team.service';
import { EventList } from 'app/interfaces/events';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {


  constructor(
    private _teamService: TeamService,
    private router: Router,
    private _fplService: FplService) {}

  bootstrap: any;
  team: any;
  events: any;
  gameweek!: EventList;
  gameweekID!: number;

  async ngOnInit() {

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      console.log("BOOTSTRAP", response);
      this.events = this.bootstrap.events;
      console.log("EVENTS", this.events);

      this.gameweek = this.events.filter((a: { [x: string]: boolean; }) => a['is_current'] === true);
      console.log("CURRENTGAMEWEEK", this.gameweek);
      this.gameweekID = this.gameweek[0].id;
      console.log("CURRENTGAMEWEEKID", this.gameweekID);
      sessionStorage.setItem('GameWeekID', JSON.stringify(this.gameweekID));
    });

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    const sessionGameWeekID = sessionStorage.getItem('GameWeekID');
    this.gameweekID = sessionGameWeekID !== null ? JSON.parse(sessionGameWeekID) : '';

    (await this._teamService.getTeamPicks(+entry, this.gameweekID))
    .subscribe(response => {
      this.team = response;
      console.log("TEAMPICKS", this.team);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  async updateGameweek() {

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    (await this._teamService.getTeamPicks(+entry, this.gameweekID))
    .subscribe(response => {
      this.team = response;
      console.log("UPDATEGAMEWEEK", this.team);
    });
  }
}
