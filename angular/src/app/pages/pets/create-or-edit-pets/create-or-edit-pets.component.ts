import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PetAllInfor } from 'src/app/_models/PetInputDTO';
import { petsService } from 'src/app/_services/pets.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-pets',
  templateUrl: './create-or-edit-pets.component.html',
  styleUrls: ['./create-or-edit-pets.component.scss']
})
export class CreateOrEditPetsComponent implements OnInit {
  @ViewChild('modal') modal!: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  @Output('modalAdd') modalAdd = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() areaList = [];
  @Input() petsList = [];

  pets: PetAllInfor = new PetAllInfor();
  MATC;
  DONGIA;
  MAGIONG;
  TENGIONG;
  MOTA;
  MALOAI;
  TENLOAI;

  isNew = false;

  constructor(private _petsService: petsService) { }

  ngOnInit() {
    //this.modalSave.emit(this.pet);
    //his.modal!.hide();
  }

  hide(){
    this.modal!.hide();
  }


  show(event? ) {
    this.isNew = true;
    this.pets = new PetAllInfor()
    if (event.MATC != undefined) {
      this.pets = event;
      this.isNew = false;
    }
    this.modal!.show();
  }


  createOrEdit() {
    if (!this.checkValidate()) return;
    if (this.isNew) this.modalAdd.emit(this.pets);
    else this.modalSave.emit(this.pets);

    if (!this.isNew) {
      this._petsService.updatePet(this.pets).subscribe(res => {
      }, er => console.log(er), () => {
      });
      alertify.success('Cập nhật thành công');
    } else {
      this._petsService.registerPet(this.pets).subscribe(res => { }, err => console.log(err), () => {});
      alertify.success('Thêm mới thành công');
    }
    this.modalSave.emit();
    this.modal.hide();
  }

  checkValidate() {
    if (!this.pets?.MATC || this.pets?.MATC === '') {
      alertify.error('mã thú cưng không được trống');
      return false;
    }
    if (!this.pets?.DONGIA || this.pets?.DONGIA === undefined) {
      alertify.error('giá thú cưng này bao nhiêu?');
      return false;
    }
    if (!this.pets?.MAGIONG || this.pets?.MAGIONG === "") {
      alertify.error('mã giống không được trống');
      return false;
    }

    if (!this.pets?.MALOAI || this.pets?.MALOAI === "") {
      alertify.error('mã loại không được trống');
      return false;
    }

    return true;
  }
}
