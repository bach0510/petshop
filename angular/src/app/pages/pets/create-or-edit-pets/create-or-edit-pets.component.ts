import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import {GetPetsInput } from 'src/app/_models/GetPetsInput';
import { PetAllInfor } from 'src/app/_models/PetInputDTO';
import { petsService } from 'src/app/_services/pets.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-pets',
  templateUrl: './create-or-edit-pets.component.html',
  styleUrls: ['./create-or-edit-pets.component.scss']
})
export class CreateOrEditPetsComponent implements OnInit {
  @ViewChild('modal') modal!: ModalDirective;
  @ViewChild('imgContainer') imgContainer: { nativeElement: { getBoundingClientRect: () => { (): any; new(): any; height: number; width: number; }; }; } | undefined;
  @Output('modalSave') modalSave = new EventEmitter();
  @Output('modalAdd') modalAdd = new EventEmitter();
  url: SafeResourceUrl | any | undefined;
  @Input() areaList = [];
  @Input() petsList = [];

  pets: PetAllInfor = new PetAllInfor();
  MATC;
  DONGIA;
  MAGIONG;
  TENGIONG;
  MOTA;
  MALOAI;
  TENLOAI;

  maLoai = [];
  maGiong = [];

  isNew = false;

  constructor(private _petsService: petsService) { }

  ngOnInit() {
    //this.modalSave.emit(this.pet);
    //his.modal!.hide();
    this.maLoai =[];
    this._petsService.getLoai().subscribe(res => {
      console.log(res)
      res.forEach(e => {
        this.maLoai.push({
          label: e.MaLoai,
          value: e.MaLoai,
          tenLoai: e.TenLoai,
        })
      })
    })
    this.maGiong =[];
    this._petsService.getGiong()
    // .pipe(finalize(()=>{
    //   if(this.pets.MALOAI != undefined || this.pets.MALOAI?.trim() != ""){
    //     this.maGiong = this.maGiong.filter(e => e.maLoai == this.pets.MALOAI );
    //   }
    //   else{
    //     this.maGiong =[];
    //   }

    // }))
    .subscribe(res => {
      res.forEach(e => {
        this.maGiong.push({
          label: e.MaGiong,
          value: e.MaGiong,
          tenGiong: e.TenGiong,
          maLoai: e.Maloai,
          mota: e.Mota,
        })
      })
    })


  }

  hide(){
    this.modal!.hide();
  }


  show(event? ) {
    this.pets = new PetAllInfor
    this.isNew = true;
    if (event.MATC != undefined) {
      this.pets = event;
      this.isNew = false;
    }

    var getPetsInput = new GetPetsInput();
    getPetsInput.Value =  1;
    getPetsInput.Filter =  '';
    this._petsService.GetPets(getPetsInput).subscribe(r => {
      var code = [];
      r.forEach(e => {
        // cắt pets lấy số đằng sau rồi đưa vào mảng
        code.push(parseInt(e.MATC.toString().substr(e.MATC.length - (e.MATC.length-2))))
      })
      // check nếu là add mới thì gen code ko thì thôi
      if(this.isNew == true){
        this.pets.MATC = "TC" + (Math.max(...code) + 1).toString();
      }
    });

    this.modal.show();
  }

  // changeGiong(param){
  //   this.pets.TENGIONG = this.maGiong.find(e => e.value == param)?.tenGiong;
  // }

  changeLoai(param){
    this.pets.TENLOAI = this.maLoai.find(e => e.value == param)?.tenLoai;
    this.pets.MAGIONG = undefined;
    this.pets.TENGIONG = undefined;
    this.pets.MOTA = "";

    this.maGiong = [];
    this._petsService.getGiong()
    // .pipe(finalize(()=>{
    //   this.maGiong = this.maGiong.filter(e => e.maLoai == param);
    // }))
    .subscribe(res => {
      console.log(res)
      res.forEach(e => {
        this.maGiong.push({
          label: e.MaGiong,
          value: e.MaGiong,
          tenGiong: e.TenGiong,
          maLoai: e.Maloai,
          mota: e.Mota,
        })
      })
    })

  }

  createOrEdit() {

    if (!this.checkValidate()) return;

    this.pets.MAGIONG = this.pets.MAGIONG.toUpperCase();
    if (!this.isNew) {
      if(this.maGiong.some(e => e.value == this.pets.MAGIONG)){
        this._petsService.chinhGiong(this.pets).subscribe(()=>{
          this._petsService.updatePet(this.pets).subscribe(res => {
          }, er => console.log(er), () => {
             this.modalSave.emit(this.pets);
          });
          alertify.success('Cập nhật thành công');
        })
      }
      else{
        this._petsService.themGiong(this.pets).subscribe(()=>{
          this._petsService.updatePet(this.pets).subscribe(res => {
          }, er => console.log(er), () => {
             this.modalSave.emit(this.pets);
          });
          alertify.success('Cập nhật thành công');
        })
      }

    } else {
      if(this.maGiong.some(e => e.value == this.pets.MAGIONG)){
        this._petsService.chinhGiong(this.pets).subscribe(()=>{
          this._petsService.registerPet(this.pets).subscribe(res => { }, err => console.log(err), () => { this.modalSave.emit(this.pets);});
      alertify.success('Thêm mới thành công');
        })
      }
      else{
        this._petsService.themGiong(this.pets).subscribe(()=>{
          this._petsService.registerPet(this.pets).subscribe(res => { }, err => console.log(err), () => { this.modalSave.emit(this.pets);});
      alertify.success('Thêm mới thành công');
        })
      }

    }
    this.modalSave.emit();
    this.modal.hide();
  }

  checkValidate() {
    if (!this.pets?.MATC || this.pets?.MATC === '') {
      alertify.error('mã thú cưng không được trống');
      return false;
    }
    if (!this.pets?.MALOAI || this.pets?.MALOAI === "") {
      alertify.error('mã loại không được trống');
      return false;
    }
    if (!this.pets?.MAGIONG || this.pets?.MAGIONG === "") {
      alertify.error('mã giống không được trống');
      return false;
    }
    if (!this.pets?.TENGIONG || this.pets?.TENGIONG === "") {
      alertify.error('tên giống không được trống');
      return false;
    }
    if (!this.pets?.DONGIA || this.pets?.DONGIA === undefined) {
      alertify.error('giá không được bỏ trống');
      return false;
    }




    return true;
  }

  checkMaGiong(param: string ){
    if(this.maGiong.some(e => e.value == param.toUpperCase())){
      // alertify.message('ma giong da ton tai')
      // console.log(this.maGiong.find(e => e.value == param.toUpperCase()))
      this.pets.MAGIONG = this.maGiong.find(e => e.value == param.toUpperCase()).value.toUpperCase();
      // this.pets.MAGIONG = this.pets.MAGIONG.toUpperCase();
      this.pets.TENGIONG = this.maGiong.find(e => e.value == param.toUpperCase()).tenGiong;
      this.pets.MOTA = this.maGiong.find(e => e.value == param.toUpperCase()).mota;
    }

  }

  onFocusOut(){
    this.pets.MAGIONG = this.pets.MAGIONG.toUpperCase();
  }
}
