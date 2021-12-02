import { HoaDonService } from '../../../_services/HoaDon.service';
import { HoaDon } from '../../../_models/HoaDon';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { GetHoaDonInput } from 'src/app/_models/GetHoaDonInput';
import * as moment from 'moment';
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
  isNew: boolean = false;


  constructor(private _HoaDonService: HoaDonService) { }


  ngOnInit() {
    this.modal.hide();
  }
  hide() {
    this.modal.hide();
  }

  show(event) {
    this.HoaDon = new HoaDon()
    this.isNew = true;
    if (event.MAHD != undefined) {
      this.HoaDon = event;
      this.isNew = false;
    }
    // var getHoaDonInput = new GetHoaDonInput();
    // getHoaDonInput.Value = 3;
    // getHoaDonInput.FromDate = moment(this.fromdate).format("dd/mm/yyyy").toString()  ?? '';
    // getHoaDonInput.ToDate = moment(this.todate).format("dd/mm/yyyy").toString()  ?? '';
    // this._HoaDonService.getHoaDon(getHoaDonInput).subscribe(r => {
    //   var code = [];
    //   r.forEach(e => {
    //     // cắt hk lấy số đằng sau rồi đưa vào mảng
    //     code.push(parseInt(e.MAHD.toString().substr(e.MAHD.length - (e.MAHD.length - 2))))
    //   })
    //   if (this.isNew == true) {
    //     this.HoaDon.MAHD = "HD" + (Math.max(...code) + 1).toString();
    //   }
    // });

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
