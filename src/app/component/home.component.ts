import { Component } from '@angular/core';

@Component({
  selector: 'start-page',
  templateUrl: '../template/start.component.html',
  styleUrls: ['../app.component.css']
})

export class StartComponent {
  title = 'IMDB client';
  value = "";

  public ifActor(): boolean {
    return this.value === 'Actor';
  }

  public ifMovie(): boolean {
    return this.value === 'Movie';
  }

  public setValue(value: string): void {
    this.value = value;
  }
}
