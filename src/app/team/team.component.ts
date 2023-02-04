import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FplService } from '../fpl/fpl.service';
import { TeamService } from './team.service';
import { EventList, Event, Bootstrap, ElementType } from 'app/interfaces/bootstrap';
import { PicksList } from 'app/interfaces/picks';
import { TransferList } from 'app/interfaces/transfers';
import { Store } from '@ngrx/store';
import { addTeamPicks, savePlayers } from 'app/State/compareActions';
import { CompareState } from 'app/State/compareReducer';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private _teamService: TeamService,
    private router: Router,
    private _fplService: FplService,
    private store: Store<{ compareState: CompareState }>) {}

  bootstrap!: Bootstrap;
  events!: Event | any;
  team!: PicksList;
  transfers!: TransferList;
  players!: Element | any;
  positions! : ElementType | any;
  gameweek!: EventList;
  gameweekID!: number;
  eventID!: number;

  teamName!: string;
  teamID!: number;

  toogleTransfers: string = "Show";

  toogleCompareMode: string = "Show";

  async ngOnInit() {

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;

      this.events = this.bootstrap.events;
      this.events = this.events.filter((a: { id: number; }) => a.id <= this.gameweekID);

      this.players = this.bootstrap.elements;

      this.store.dispatch(savePlayers(this.players));

      this.positions = this.bootstrap.element_types;
    });

    const sessionGameWeekID = sessionStorage.getItem('GameWeekID');
    this.gameweekID = sessionGameWeekID !== null ? JSON.parse(sessionGameWeekID) : '';
    this.eventID = this.gameweekID;

    (await this._teamService.getTeamPicks(this.teamID, this.gameweekID))
    .subscribe(response => {
      this.team = response,
      this.store.dispatch(addTeamPicks(this.team, this.teamID, this.teamName));
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

  toggleCompareMode() {
    this.toogleCompareMode = this.toogleCompareMode === "Show" ? "Hide" : "Show";
  }
}

