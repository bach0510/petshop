import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { CreateOrEditPetsComponent } from './create-or-edit-pets/create-or-edit-pets.component';
import { petsService } from 'src/app/_services/pets.service';
import { PetAllInfor } from 'src/app/_models/PetInputDTO';
import { GetPetsInput } from 'src/app/_models/GetPetsInput';

declare let alertify: any;

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  @ViewChild('createOrEditPets', { static: true }) createOrEditPets: CreateOrEditPetsComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;


  selectedData;
  MATC: string;
  TENGIONG: string;
  MOTA: string;
  DONGIA: number;
  TENLOAI: string;

  searchType= [
    {value:1,label:"lấy danh sách thú cưng theo giống"},
    {value:2,label:"lấy danh sách thú cưng theo loại "},
    {value:3,label:"lấy danh sách giống thú cưng"},
    {value:4,label:"lấy thú cưng theo mã"},
  ];
  type : number = 1;
  filter = "";

  constructor(private _petsService: petsService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize +
          params.rowIndex + 1,
          flex: 1,
      },
      {
        headerName: 'mã thú cưng',
          flex: 2,
          field: 'MATC',
      },
      {
        headerName: 'tên giống',
          flex: 1,
          field: 'TENGIONG',
      },
      {
        headerName: 'tên loại',
        field: 'TENLOAI',
        flex: 1,

      },
      {
        headerName: 'mô tả',
        field: 'MOTA',
        flex: 4,

      },
      {
        headerName: 'giá',
        field: 'DONGIA',

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
    var pets = new GetPetsInput();
    pets.Value = this.type ?? 1;
    pets.Filter = this.filter ?? '';

    this._petsService.GetPets(pets).subscribe((res) => {
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

    var pets = new GetPetsInput();
    pets.Value = this.type ?? 1;
    pets.Filter = this.filter ?? '';

    this._petsService.GetPets(pets).subscribe((res) => {
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
    // this.selectedData = new PetAllInfor();
    this.createOrEditPets.show(new PetAllInfor());
  }

  edit() {
    this.createOrEditPets.show(this.selectedData);
  }

  delete() {

    this._petsService
      .deletePet(this.selectedData)
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

  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
