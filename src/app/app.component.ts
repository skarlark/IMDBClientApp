import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'IMDB client';
  value = "";

  public ifActor(): boolean {
    return this.value == 'Actor';
  }

  public setValue(value: string): void {
    this.value = value;
  }
}
