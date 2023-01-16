import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FplService } from '../fpl/fpl.service';
import { TeamService } from './team.service';
import { EventList, Event, Bootstrap } from 'app/interfaces/bootstrap';
import { PicksList } from 'app/interfaces/picks';
import { TransferList } from 'app/interfaces/transfers';

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

  bootstrap!: Bootstrap;
  events!: Event | any;
  team!: PicksList;
  transfers!: TransferList;
  players!: Element | any;
  gameweek!: EventList;
  gameweekID!: number;
  eventID!: number;

  teamName!: string;
  teamID!: number;

  toogleTransfers: string = "Show";

  async ngOnInit() {

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;

      this.events = this.bootstrap.events;
      this.events = this.events.filter((a: { id: number; }) => a.id <= this.gameweekID);

      console.log("this.bootstrap.element_types", this.bootstrap.element_types);
      this.players = this.bootstrap.elements;
      console.log("this.bootstrap.elements", this.bootstrap.elements);
    });

    const sessionGameWeekID = sessionStorage.getItem('GameWeekID');
    this.gameweekID = sessionGameWeekID !== null ? JSON.parse(sessionGameWeekID) : '';
    this.eventID = this.gameweekID;

    (await this._teamService.getTeamPicks(this.teamID, this.gameweekID))
    .subscribe(response => {
      this.team = response,
      console.log("this.team", this.team);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

  }

  async updateGameweek() {
    (await this._teamService.getTeamPicks(this.teamID, this.eventID))
    .subscribe(response =>
      this.team = response
    );
  }


  async toggleGWTransfers() {
    this.toogleTransfers = this.toogleTransfers === "Show" ? "Hide" : "Show";

    (await this._teamService.getTeamTransfers(this.teamID))
    .subscribe(response =>
      this.transfers = response
    );
  }
}

