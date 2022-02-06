import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetAllInfor } from '../_models/PetInputDTO';
import { GetPetsInput } from '../_models/GetPetsInput';

@Injectable({ providedIn: 'root' })

export class petsService {
  readonly APIUrl = 'http://localhost:60276';
  constructor(private http: HttpClient) {}



  GetPets(val: GetPetsInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-pets', val);
  }

  updatePet(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/update-Pet', val);
  }
  chinhGiong(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/edit-giong', val);
  }
  themGiong(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/add-giong', val);
  }

  deletePet(val: PetAllInfor): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-Pet', val);
  }

  registerPet(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/add-Pet', val);
  }

  getLoai(): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-loai', undefined);
  }
  getGiong(): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-giong', undefined);
  }
}
