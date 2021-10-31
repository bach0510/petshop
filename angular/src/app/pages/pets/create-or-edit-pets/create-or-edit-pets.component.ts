import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PetAllInfor } from 'src/app/_models/PetInputDTO';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-pets',
  templateUrl: './create-or-edit-pets.component.html',
  styleUrls: ['./create-or-edit-pets.component.scss']
})
export class CreateOrEditPetsComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() areaList = [];
  @Input() petsList = [];

  pet: PetAllInfor = new PetAllInfor();
  MATC;
  DONGIA;
  MAGIONG;
  TENGIONG;
  MOTA;
  MALOAI;
  TENLOAI;

  constructor() { }

  ngOnInit() {
    this.modalSave.emit(this.pet);
    this.modal.hide();
  }


  show(event) {
    this.pet = new PetAllInfor()
    if (event.Id != undefined) {
      this.pet = event;
    }
    this.modal.show();
  }


  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.pet);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.pet?.MATC || this.pet?.MATC === '') {
      alertify.error('mã thú cưng không được trống');
      return false;
    }
    if (!this.pet?.DONGIA || this.pet?.DONGIA === undefined) {
      alertify.error('giá thú cưng này bao nhiêu?');
      return false;
    }
    if (!this.pet?.MAGIONG || this.pet?.MAGIONG === "") {
      alertify.error('mã giống không được trống');
      return false;
    }
  
    if (!this.pet?.MALOAI || this.pet?.MALOAI === "") {
      alertify.error('mã loại không được trống');
      return false;
    }
    
    return true;
  }
}
