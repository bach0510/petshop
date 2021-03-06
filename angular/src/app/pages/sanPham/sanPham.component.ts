import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';
import { CreateOrEditSanPhamComponent } from './create-or-edit-sanpham/create-or-edit-sanPham.component';
import { sanPham } from 'src/app/_models/sanPham';
import { CacheService } from 'src/app/_services/cache.service';
import { sanPhamService } from 'src/app/_services/sanPham.service';
import { GetOptionInput } from 'src/app/_models/getOptionInput';
declare let alertify: any;

@Component({
  selector: 'app-sanPham',
  templateUrl: './sanPham.component.html',
  styleUrls: ['./sanPham.component.scss'],
})
export class CustomerComponent implements OnInit {
  @ViewChild('createOrEditSanPham', { static: true }) CreateOrEditSanPham: CreateOrEditSanPhamComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;


  selectedData;
  masp: string;
  loaiID: string;
  tenSP: string;
  gia: string;
  soLuong: number;

  searchType= [
    {value:1,label:"sản phẩm theo loại thú cưng"},
    {value:2,label:"sản phẩm theo tên "},
    {value:3,label:"tất cả"},
  ];
  type : number = 1;
  filter = "";

  constructor(private _sanPhamService: sanPhamService,private _cacheService: CacheService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize +
          params.rowIndex +
          1,
      },
      {
        headerName: 'mã sản phẩm',
        field: 'masp',
      },
      {
        headerName: 'tên sản phẩm',
        field: 'tenSP',
      },
      {
        headerName: 'cho loại thú cưng',
        field: 'loaiID',
      },
      {
        headerName: 'giá',
        field: 'gia',
      },
      {
        headerName: 'số lượng',
        field: 'soLuong',
      },
    ];

    this.defaultColDef = {
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
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  onSearch() {
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var sanPham = new GetOptionInput();
    sanPham.Value = this.type ?? 1;
    sanPham.Filter = this.filter ?? '';

    this._sanPhamService.getSanPham(sanPham).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData =
        this.rowData.length > 0
          ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.rowData.length;
      this.paginationParams.totalPage = ceil(
        this.rowData.length / this.paginationParams.pageSize
      );
      this.paginationParams.pageNum = 1;
    });
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;

    var sanPham = new GetOptionInput();
    sanPham.Value = this.type ?? 1;
    sanPham.Filter = this.filter ?? '';

    this._sanPhamService.getSanPham(sanPham).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData = this.rowData
        ? this.rowData.slice(
          this.paginationParams.skipCount,
          this.paginationParams.pageNum * this.paginationParams.pageSize
        )
        : [];
    });
    this.params.api?.setRowData(this.pagedRowData);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  getVehicleCard() {
    this.callBackEvent(this.params);
  }

  add() {
    this.selectedData = new sanPham();
    this.CreateOrEditSanPham.show(this.selectedData);
  }

  edit() {
    this.CreateOrEditSanPham.show(this.selectedData);
  }

  delete() {
    
    this._sanPhamService
      .deleteSanPham(this.selectedData)
      .subscribe(
        (res) => {
          alertify.success('Xóa sản phẩm thành công');
          this.callBackEvent(this.params);
        },
        (err) => console.log(err)
      );
  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }


  modalSave(event) {
    console.log(event);

    if (event.masp) {
      this._sanPhamService.updateSanPham(event).subscribe(res => {
      }, er => console.log(er), () => {
        this.callBackEvent(this.params);
      });
      alertify.success('Cập nhật thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    } else {
      this._sanPhamService.registerSanPham(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
      alertify.success('Thêm mới thành công');
      this.callBackEvent(this.params);
      this.selectedData = undefined;
    }
  }

  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
