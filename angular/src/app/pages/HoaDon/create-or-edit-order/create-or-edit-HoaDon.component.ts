import { CustomerService } from '../../../_services/customer.service';
import { HoaDon } from '../../../_models/HoaDon';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-HoaDon',
  templateUrl: './create-or-edit-HoaDon.component.html',
  styleUrls: ['./create-or-edit-HoaDon.component.scss']
})
export class CreateOrEditHoaDonComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() areaList = [];
  @Input() currentUser = new Employee;
  @Input() disableInput = false;
  @Input() HoaDonList = [];

  HoaDon: HoaDon = new HoaDon();

  MAHD: string;
  NGUOILAPHD: string;
  NGAYLAP: Date;
  MAKH: string;
  MAKM: string;
  giaKhuyenMai: number;
  tong: number;


  constructor() { }


  ngOnInit() {
    this.modal.hide();

  }

  hide(){
    this.modal.hide();
  }

  show(event) {
    this.HoaDon = new HoaDon()
    if (event.Id != undefined) {
      this.HoaDon = event;
    }
    this.modal.show();
  }



  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.HoaDon);
    this.modal.hide();
  }

  checkValidate() {


    return true;
  }
}
