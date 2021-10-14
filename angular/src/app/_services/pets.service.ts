import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetAllInfor } from '../_models/PetInputDTO';
import { GetOptionInput } from '../_models/getOptionInput';

@Injectable({ providedIn: 'root' })

export class petsService {
  readonly APIUrl = 'http://localhost:60276';
  constructor(private http: HttpClient) {}



  GetPets(val: GetOptionInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/get-pets', val);
  }

  updatePet(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/update-Pet', val);
  }

  deletePet(val: PetAllInfor): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-Pet', val);
  }

  registerPet(val: PetAllInfor) {
    return this.http.post(this.APIUrl + '/add-Pet', val);
  }
}
