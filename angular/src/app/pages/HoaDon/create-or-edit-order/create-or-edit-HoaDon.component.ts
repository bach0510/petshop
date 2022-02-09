import { NhanVien } from 'src/app/_models/nhan-vien';
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
  @Input() currentUser = new NhanVien;
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
  detailColDef: any;

  rowDataDetail=[];


  constructor(private _HoaDonService: HoaDonService) {
    this.detailColDef = [
      {
        headerName: 'Tên SP',
        field: 'ten',
      },
      {
        headerName: 'Số lượng',
        field: 'soLuong',
      },
      {
        headerName: 'Đơn giá',
        field: 'gia',
      },

    ]
  }


  ngOnInit() {
    //this.modal.hide();
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
    var getHoaDonInput = new GetHoaDonInput();
    getHoaDonInput.Value = 3;
    getHoaDonInput.FromDate = moment('01/01/1975',"DD/MM/YYYY").format('L').toString()  ?? '';
    getHoaDonInput.ToDate = moment(moment(),"DD/MM/YYYY").format('L').toString()  ?? '';
    this._HoaDonService.getHoaDon(getHoaDonInput).subscribe(r => {
      var code = [];
      r.forEach(e => {
        // cắt hk lấy số đằng sau rồi đưa vào mảng
        code.push(parseInt(e.MAHD))
      })
      if (this.isNew == true) {
        // console.log(this.currentUser)
        this.HoaDon.NGAYLAP = new Date();
        this.HoaDon.NGUOILAPHD = this.currentUser.MaNv;
        let codeString = (Math.max(...code) + 1).toString()
        this.HoaDon.MAHD =  codeString.length == 1 ? '00' + codeString : codeString.length == 2 ? '0' + codeString : codeString ;
      }
    });


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
