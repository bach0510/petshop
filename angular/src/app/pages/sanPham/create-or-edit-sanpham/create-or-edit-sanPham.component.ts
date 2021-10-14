import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { sanPham } from 'src/app/_models/sanPham';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-sanPham',
  templateUrl: './create-or-edit-sanPham.component.html',
  styleUrls: ['./create-or-edit-sanPham.component.scss']
})
export class CreateOrEditSanPhamComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() areaList = [];
  @Input() empList = [];
  
  sanPham: sanPham = new sanPham();
  masp;
  loaiID;
  tenSP;
  gia;
  soLuong;

  constructor() { }

  ngOnInit() {
    this.modalSave.emit(this.sanPham);
    this.modal.hide();
  }


  show(event?) {
    this.sanPham = new sanPham
    if (event.Id != undefined) {
      this.sanPham = event;
    }
    this.modal.show();
  }


  createOrEdit() {
    if (!this.checkValidate()) return;
    this.modalSave.emit(this.sanPham);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.sanPham?.tenSP || this.sanPham?.tenSP === '') {
      alertify.error('Tên sản phẩm không được trống');
      return false;
    }
    if (!this.sanPham?.loaiID || this.sanPham?.loaiID === '') {
      alertify.error('sản phẩm này cho laoi thú cưng nào?');
      return false;
    }
    if (!this.sanPham?.gia || this.sanPham?.gia === undefined) {
      alertify.error('giá sản phẩm không được trống');
      return false;
    }
    if (!this.sanPham?.soLuong || this.sanPham?.soLuong === undefined) {
      alertify.error('số lượng sản phẩm không được trống');
      return false;
    }
    
    return true;
  }
}
