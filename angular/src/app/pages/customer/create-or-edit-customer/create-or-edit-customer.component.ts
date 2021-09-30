import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() areaList = [];
  cus: Customer = new Customer();
  CusName;
  CusTel;
  CusAdd;
  BirthDay;
  CusEmail;
  CusCmnd;
  AreaId;
  // EmpTypes = [
  //   {
  //     label: 'Nhân viên trông xe',
  //     value: 2,
  //   },
  //   {
  //     label: 'Nhân viên quản lý',
  //     value: 1,
  //   },
  // ]
  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.AreaId = undefined;
    this.modal.hide();
  }

  show(event?) {
    this.cus = new Customer
    this.areaList = this.areaList.filter(e => e.value != 0);
    this.cus.AreaId = 1;
    this.AreaId = 1;
    if (event.Id != undefined) {
      this.cus = event;
      this.AreaId = this.cus.AreaId;
    }
    this.modal.show();
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    this.cus.AreaId = this.AreaId;
    this.modalSave.emit(this.cus);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.cus?.CusName || this.cus?.CusName === '') {
      alertify.error('Tên khách hàng không được trống');
      return false;
    }
    if (!this.cus?.CusTel || this.cus?.CusTel === '') {
      alertify.error('Số điện thoại khách hàng không được trống');
      return false;
    }
    if (!this.cus?.CusAdd || this.cus?.CusAdd === '') {
      alertify.error('Địa chỉ khách hàng không được trống');
      return false;
    }
    
    return true;
  }
}
