import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FplService } from '../fpl/fpl.service';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private _teamService: TeamService,
    private router: Router,
    private _fplService: FplService) {
    }

  bootstrap: any;
  team: any;
  events: any;
  gameweek: number = 19;

  async ngOnInit() {

    (await this._fplService.getFplBootstrap())
    .subscribe(response => {
      this.bootstrap = response;
      console.log("BOOTSTRAP", response);
      this.events = this.bootstrap.events;
      console.log("EVENTS", this.events);
    });

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    (await this._teamService.getTeamPicks(+entry, this.gameweek))
    .subscribe(response => {
      this.team = response;
      console.log("TEAMPICKS", response);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  // async updateGameweek() {

  //   (await this._fplService.getFplBootstrap())
  //   .subscribe(response => {
  //     this.bootstrap = response;
  //     console.log("BOOTSTRAP", response);
  //   });

  //   let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

  //   (await this._teamService.getTeamPicks(+entry, this.events[18].id))
  //   .subscribe(response => {
  //     this.events = response;
  //     console.log("UPDATEGAMEWEEK", response);
  //   });
  // }
}
