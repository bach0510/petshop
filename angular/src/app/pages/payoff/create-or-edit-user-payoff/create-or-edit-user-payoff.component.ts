import { PayoffDto } from '../../../_models/payoffDto';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-user-payoff',
  templateUrl: './create-or-edit-user-payoff.component.html',
  styleUrls: ['./create-or-edit-user-payoff.component.scss']
})
export class CreateOrEditUserPayoffComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() type ;
  @Input() userList = [] ;
  @Input() payoffList = [] ;
  payoff: PayoffDto = new PayoffDto();
  PayoffName;
  PayoffId;
  UserId;
  PayoffTime;
  Price;

  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  show(event?) {
    this.payoff = new PayoffDto
    this.payoff.PayoffTime = moment();
    this.payoff.PayoffId = this.payoffList.find((e,i)=> i == 0).value;
    // if (event !== undefined) {
    //   this.payoff = event;
    // }
    this.modal.show();
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.payoff);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.payoff?.PayoffTime ) {
      alertify.error('Thời gian không được trống');
      return false;
    }
    if (!this.payoff?.UserId ) {
      alertify.error('Shipper không được trống');
      return false;
    }
    if (!this.payoff?.PayoffId || this.payoff?.PayoffId == 0) {
      alertify.error('Lý do không được trống');
      return false;
    }

    return true;
  }
}
