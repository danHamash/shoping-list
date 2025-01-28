
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService{
  saveItem(section: string, itemName: string, quantity: number = 1, value: number = 0) {
    const items = JSON.parse(localStorage.getItem(section) || '[]');
    const existingItemIndex = items.findIndex((item: any) => item.name === itemName);

    const total = quantity * value;

    if (existingItemIndex >= 0) {
      items[existingItemIndex] = { name: itemName, quantity, value, total };
    } else {
      items.push({ name: itemName, quantity, value, total });
    }

    localStorage.setItem(section, JSON.stringify(items));
  }

  getItems(section: string): any[] {
    return JSON.parse(localStorage.getItem(section) || '[]');
  }

  deleteItem(section: string, itemName: string) {
    let items = this.getItems(section);
    items = items.filter((item: any) => item.name !== itemName);
    localStorage.setItem(section, JSON.stringify(items));
  }
}
