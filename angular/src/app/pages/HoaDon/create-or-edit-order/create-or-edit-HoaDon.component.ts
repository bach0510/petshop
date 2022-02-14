import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/_services/customer.service';
import { khuyenMai } from './../../../_models/khuyenMai';
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

  constructor(private _HoaDonService: HoaDonService,private _customerService : CustomerService) {
    this.detailColDef = [
      {
        headerName: 'Tên SP',
        field: 'ten',
        editable: true,
      },
      {
        headerName: 'Số lượng',
        field: 'soLuong',
        editable: true,
      },
      {
        headerName: 'Đơn giá',
        field: 'gia',
        editable: true,
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
    this.customers = [];
    this._customerService.getCustomers(new GetKhachHangInput).subscribe(res => {
      res.forEach(p => {
        this.customers.push({
          label:p.HoTen,
          value:p.MAKH
        })
      })
    })
    this.HoaDon = new HoaDon()
    this.giaKhuyenMai = 0;
    this.isNew = true;
    if (event.MAHD != undefined) {
      this.HoaDon = event;
      let input = new GetHoaDonInput();
      input.MaHd = this.HoaDon.MAKM; // thay mã hóa đơn bằng mã khuyến mại để không phải tạo nhiều dto
      if(this.HoaDon.MAKM || this.HoaDon.MAKM != "") this._HoaDonService.getKhuyenMai(input).subscribe((res: khuyenMai[]) => this.giaKhuyenMai = res[0].GiaKhuyenMai)
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
    // search chi tiết hóa đơn
    var HoaDonDetail = new GetHoaDonInput();
    HoaDonDetail.MaHd = event?.MAHD ?? 0;
    this._HoaDonService.getChiTietHoaDon(HoaDonDetail).subscribe(res => {
        this.rowDataDetail = res;
    })


    this.modal.show();
  }

  changeDispriceCode(params){
    let input = new GetHoaDonInput();
    input.MaHd = params; // thay mã hóa đơn bằng mã khuyến mại để không phải tạo nhiều dto
    console.log(params)
    this._HoaDonService.getKhuyenMai(input).subscribe((res: khuyenMai[]) =>{
       if(res.length == 1){
         this.giaKhuyenMai = res[0].GiaKhuyenMai ?? 0;
        }
        else this.giaKhuyenMai = 0;
      })
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    if(!this.isNew){
      this._HoaDonService.updateHoaDon(this.HoaDon)
      .subscribe(res => {
        alertify.success("cập nhật thành công");
        this.modalSave.emit(null);
      })
    }
    else{
      this._HoaDonService.addHoaDon(this.HoaDon)
      .pipe(finalize(()=>{
        let dataDetail =[];
        this.params.api.forEachNode(node => {
          dataDetail.push(node?.data);
        })
        console.log(dataDetail);
      }))
      .subscribe(res => {
        alertify.success("thêm mới hóa đơn thành công")
        this.modalSave.emit(null);
      })
    }
    this.modal.hide();
  }

  checkValidate() {


    return true;
  }

  addrow(){
    this.params.api.applyTransaction({ add: [{soLuong: 1}] });
    this.HoaDon.tong = 0 ;
    console.log(this.rowDataDetail.length);
  }

  deleterow(){

  }

  callBackEvent(event) {
    this.params = event;
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

}
