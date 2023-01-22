import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'app/State/compareReducer';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {
  elements!: any;

  constructor(private store: Store<{ players: State }>) {
  }

  ngOnInit() {
    this.store.select('players').subscribe(players => {
      this.elements = players.elements;
      console.log("this.elements", this.elements);
    });
  }

}
