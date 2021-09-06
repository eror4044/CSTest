import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarEntity } from 'src/interfaces/CarEntity';
import { OwnerEntity } from 'src/OwnerEntity';
import { tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ICarOwnersService } from 'src/interfaces/ICarOwnerService';

@Injectable({
  providedIn: 'root'
})
export class WebApiService implements ICarOwnersService {

  constructor(private http: HttpClient) {}
  buferOwner:OwnerEntity|undefined
  private ownersUrl = 'api/owners';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getOwners(): Observable < OwnerEntity[] > {
    return this.http.get < OwnerEntity[] > (this.ownersUrl)
  }

  getOwnerById(aId: number): Observable < OwnerEntity > {
    const url = `${this.ownersUrl}/${aId}`;
    return this.http.delete<OwnerEntity>(url).pipe(
      tap(_ => console.log(`fetched hero id=${aId}`)),
    );
  }

  createOwner(aFirstName: string,aMiddleName: string, aLastName: string, aCars: CarEntity[]): Observable < OwnerEntity > {
    const owner = {
      id:Math.random(),
      firstName: aFirstName,
      middleName: aMiddleName,
      lastName: aLastName,
      cars: aCars
    }
    return this.http.post < any > (this.ownersUrl, owner, this.httpOptions).pipe(
      tap((newOwner) => console.log((`added Owner ${newOwner.id}`)))
    );
  }
  editOwner(aOwner: OwnerEntity): Observable < any > {
    return this.http.put(this.ownersUrl, aOwner, this.httpOptions)
  }

  deleteOwner(aOwnerId: number): Observable < OwnerEntity> {
    const url = `${this.ownersUrl}/${aOwnerId}`;
    return this.http.delete<OwnerEntity>(url).pipe(
      tap(() => console.log(`deleted owner id=${aOwnerId}`)),
    );
  }

}
