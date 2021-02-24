import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) {}

  async createLocalStorage(keyIdentifier: string, keys: Array<string>, values: Array<any>) {
    const data = await this.storage.get(keyIdentifier);
    const items = JSON.parse(data || '[]');
    const localStorageObject: any = {};
    localStorageObject.id = new Date().getTime();

    keys.map((key, index) => {
      localStorageObject[key] = values[index];
    });
    items.push(localStorageObject);

    await this.storage.set(keyIdentifier, JSON.stringify(items));
    return {
      ...localStorageObject,
      id: localStorageObject.id
    };
  }

  async updateLocalStorage(keyIdentifier: string, id: number, keys: Array<string>, values: Array<any>) {
    const data = await this.storage.get(keyIdentifier);
    const items = JSON.parse(data || []);
    const itemIndex = items.findIndex((item) => {
      return item.id === id;
    });

    keys.map((key, ind) => {
      items[itemIndex][key] = values[ind];
    });
    this.storage.set(keyIdentifier, JSON.stringify(items));
    return items[itemIndex];

  }

  async getAll(keyIdentifier: string): Promise<any> {
    const data = await this.storage.get(keyIdentifier);
    const items = JSON.parse(data || '[]');
    return items;
  }

  async getById(keyIdentifier: string, id: number) {
    const data = await this.storage.get(keyIdentifier);
    const items = JSON.parse(data || '[]');
    const item = items.find((itemStorage) => {
      return itemStorage.id === id;
    });
    return item;
  }
}
