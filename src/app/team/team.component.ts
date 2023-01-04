import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private _teamService: TeamService,
    private router: Router) { }

  team: any;

  async ngOnInit() {

    let entry = this.router.routerState.snapshot.root.children[0].url[1].path;

    (await this._teamService.getTeamPicks(+entry))
    .subscribe(response => {
      this.team = response;
      console.log("TEAMPICKS", response);
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }
}
