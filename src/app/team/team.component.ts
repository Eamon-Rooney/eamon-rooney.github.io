import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FplService } from '../fpl/fpl.service';
import { TeamService } from './team.service';
import { EventList, Event, Bootstrap } from 'app/interfaces/bootstrap';
import { Team } from 'app/interfaces/entry';

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

  bootstrap!: Bootstrap | any;
  events!: Event | any;
  team: Team | any;
  players: any;
  gameweek!: EventList;
  gameweekID!: number;
  eventID!: number;

  async ngOnInit() {

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      console.log(this.bootstrap);

      this.events = this.bootstrap.events;
      this.events = this.events.filter((a: { id: number; }) => a.id <= this.gameweekID);

      this.players = this.bootstrap.elements;
    });

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    const sessionGameWeekID = sessionStorage.getItem('GameWeekID');
    this.gameweekID = sessionGameWeekID !== null ? JSON.parse(sessionGameWeekID) : '';
    this.eventID = this.gameweekID;

    (await this._teamService.getTeamPicks(+entry, this.gameweekID))
    .subscribe(response =>
      this.team = response
    );

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  async updateGameweek() {

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    (await this._teamService.getTeamPicks(+entry, this.eventID))
    .subscribe(response =>
      this.team = response
    );
  }
}
