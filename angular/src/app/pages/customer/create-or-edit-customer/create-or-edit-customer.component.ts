import { CustomerService } from './../../../_services/customer.service';
import { khachHang } from './../../../_models/khachHang';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetKhachHangInput } from 'src/app/_models/GetKhachHangInput';
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

  isNew : boolean =false;

  constructor(private _customerService : CustomerService) { }

  ngOnInit() {
    //this.modalSave.emit(this.cus);
    this.modal!.hide();
  }

  hide() {
    this.modal.hide();
  }

  show(event?) {
    this.cus = new khachHang;
    this.ngaySinh = undefined;
    this.isNew = true;
    if (event.MAKH != undefined) {
      this.cus = event;
      this.isNew = false;
      this.ngaySinh = event.ngaySinh;
    }
    
    var getKhachHangInput = new GetKhachHangInput();
    getKhachHangInput.Value =  1;
    getKhachHangInput.Filter =  '';
    this._customerService.getCustomers(getKhachHangInput).subscribe(r => {
      var code = [];
      r.forEach(e => {
        // cắt hk lấy số đằng sau rồi đưa vào mảng
        code.push(parseInt(e.MAKH.toString().substr(e.MAKH.length - (e.MAKH.length-2))))
      })
      if(this.isNew == true){
        this.cus.MAKH = "KH" + (Math.max(...code) + 1).toString();
      }
    });

    this.modal.show();
  }

  createOrEdit() {
    this.cus.ngaySinh = this.ngaySinh;
    console.log(this.cus);
    // if (!this.checkValidate()) return;
    // this.cus.AreaId = this.AreaId;
    setTimeout(() => {
      if(this.isNew){
        this._customerService.registerCustomer(this.cus).subscribe(res => { }, err => console.log(err), () => {this.modalSave.emit(undefined);});
        alertify.success('Thêm mới thành công');
      }
      else{
        this._customerService.updateCustomer(this.cus).subscribe(res => {
        }, er => console.log(er), () => {
          this.modalSave.emit(undefined);
        });
        alertify.success('Cập nhật thành công');
      }
    }, 100);

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
