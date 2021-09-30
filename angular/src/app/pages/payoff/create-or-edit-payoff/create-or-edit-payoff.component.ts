import { PayoffDto } from './../../../_models/payoffDto';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-payoff',
  templateUrl: './create-or-edit-payoff.component.html',
  styleUrls: ['./create-or-edit-payoff.component.scss']
})
export class CreateOrEditPayoffComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() type ;
  payoff: PayoffDto = new PayoffDto();
  PayoffName;
  Price;

  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  show(event?) {
    this.payoff = new PayoffDto
    if (event !== undefined) {
      this.payoff = event;
    }
    this.modal.show();
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.payoff);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.payoff?.PayoffName || this.payoff?.PayoffName === '') {
      alertify.error('Nội dung không được trống');
      return false;
    }
    if (!this.payoff?.Price ) {
      alertify.error('Số tiền không được trống');
      return false;
    }

    return true;
  }
}
