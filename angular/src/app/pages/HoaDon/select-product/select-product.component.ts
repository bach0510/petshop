import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/_services/customer.service';
import { khuyenMai } from '../../../_models/khuyenMai';
import { NhanVien } from 'src/app/_models/nhan-vien';
import { HoaDonService } from '../../../_services/HoaDon.service';
import { HoaDon } from '../../../_models/HoaDon';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { GetHoaDonInput } from 'src/app/_models/GetHoaDonInput';
import * as moment from 'moment';
import { GetKhachHangInput } from 'src/app/_models/GetKhachHangInput';
import { RowNode } from 'ag-grid-community';
import { pipe } from 'rxjs';
import { sanPhamService } from 'src/app/_services/sanPham.service';
import { petsService } from 'src/app/_services/pets.service';
import { GetPetsInput } from 'src/app/_models/GetPetsInput';
import { GetSanPhamInput } from 'src/app/_models/GetSanPhamInput';
declare let alertify: any;

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {
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

  params;

  selectedData;

  customers=[];

  selectedNode: RowNode = new RowNode();
  rowDataDetail=[];

  defaultColDef = {
    flex: 1,
    resizable: true,
    suppressMenu: true,
    menuTabs: [],
    tooltipValueGetter: (t: any) => t.value,
    textFormatter: function (r) {
      if (r == null) return null;
      return r.toLowerCase();
    },

  };

  tenKh: string="";

  constructor(private _sanPhamService: sanPhamService,private _petsService: petsService) {
    this.detailColDef = [
      {
        headerName: 'Mã',
        field: 'ma',
      },
      {
        headerName: 'Tên SP',
        field: 'ten',
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

  callBackGrid(params){
    this.params = params;
  }

  show() {
    this.rowDataDetail = [];
    var pets = new GetPetsInput();
    pets.Value = 1;
    pets.Filter = '';

    var sanPhamInput = new GetSanPhamInput();
    sanPhamInput.Value = 1;
    sanPhamInput.Filter = '';

    this._sanPhamService.getSanPham(sanPhamInput)
    .pipe(finalize(()=>{
      this._petsService.GetPets(pets)
      .pipe(finalize(()=>{
        console.log(this.rowDataDetail)
        this.params.api.setRowData(this.rowDataDetail);
        this.modal.show();
      }))
      .subscribe(res => {
        res.forEach(e => {
          this.rowDataDetail.push({
            ten: e.TENGIONG,
            gia: e.DONGIA,
            ma: e.MATC,
            soLuong: 1,
          });
        })
      })
    }))
    .subscribe(res => {
      res.forEach(e => {
        this.rowDataDetail.push({
          ten: e.tenSP,
          gia: e.gia,
          ma: e.masp,
          soLuong: 1,
        });
      })
    })


  }

  confirm() {
    this.modalSave.emit(this.selectedData);
    this.modal.hide();
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }
}
