import { Component } from '@angular/core';

export interface Item {
  id: number,
  icon: string;
  text1: string;
  text2: string;
  text3: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: Item[] = [];

  addItem(icon: string, text1: string, text2: string, text3: string): void {
    this.items.push({
      id: this.items.length,
      icon,
      text1,
      text2,
      text3
    });
  }

  remove(item: Item): void {
    this.items = this.items.filter(i => i !== item);
  }

  trackBy(index: number, item: Item): string {
    return item.id + '';
  }

}
