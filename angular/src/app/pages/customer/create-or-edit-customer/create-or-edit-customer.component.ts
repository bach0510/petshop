import { khachHang } from './../../../_models/khachHang';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-customer',
  templateUrl: './create-or-edit-customer.component.html',
  styleUrls: ['./create-or-edit-customer.component.scss']
})
export class CreateOrEditCustomerComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() areaList = [];
  @Input() empList = [];

  cus: khachHang = new khachHang();
  MAKH;
  HoTen;
  gioiTinh =[{label:"Nam",value:"Nam"},{label:"Nữ",value:"Nữ"}];
  diaChi;
  ngaySinh;
  CMND;
  sdt;

  constructor() { }

  ngOnInit() {
    //this.modalSave.emit(this.cus);
    this.modal.hide();
  }

  hide() {
    this.modal.hide();
  }

  show(event?) {
    this.cus = new khachHang
    if (event.MAKH != undefined) {
      this.cus = event;
    }
    this.modal.show();
  }

  createOrEdit() {
    // if (!this.checkValidate()) return;
    // this.cus.AreaId = this.AreaId;
    this.modalSave.emit(this.cus);
    this.modal.hide();
  }

  checkValidate() {
    // if (!this.cus?.CusName || this.cus?.CusName === '') {
    //   alertify.error('Tên khách hàng không được trống');
    //   return false;
    // }
    // if (!this.cus?.CusTel || this.cus?.CusTel === '') {
    //   alertify.error('Số điện thoại khách hàng không được trống');
    //   return false;
    // }
    // if (!this.cus?.CusAdd || this.cus?.CusAdd === '') {
    //   alertify.error('Địa chỉ khách hàng không được trống');
    //   return false;
    // }

    return true;
  }
}
