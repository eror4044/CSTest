import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from '../OwnerEntity';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let owners = [{
      id:0,
      firstName: 'ivan',
      middleName: 'ivanov',
      lastName: 'ivanovich',
      cars: [{
          id: 'AA1234ZE',
          brand: 'Nissan',
          model: 'Nissan Sentra',
          productionYear: 2018
        },
        {
          id: 'AA1294TW',
          brand: 'Opel',
          model: 'Opel Astra K',
          productionYear: 2016
        },
      ]
    }, ];
    return {
      owners
    };
  }
}
