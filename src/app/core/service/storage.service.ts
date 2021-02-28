import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorage: LocalStorageService) {}

  create(table: string, keys: Array<string>, values: Array<any>) {
    return this.localStorage.createLocalStorage(table, keys, values);
  }

  update(table: string, id: number, keys: Array<string>, values: Array<any>) {
    return this.localStorage.updateLocalStorage(table, id, keys, values);
  }

  delete(table: string, id: number) {
    return this.localStorage.deleteLocalStorage(table, id);
  }

  getById(table: string, id: number) {
    return this.localStorage.getById(table, id);
  }

  getAll(table: string) {
    return this.localStorage.getAll(table);
  }
}
