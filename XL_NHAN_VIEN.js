const FS=require("fs")
const PATH=require("path")
var Thu_muc_Du_lieu= "./Du_lieu"
var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
var Thu_muc_Nhan_vien=PATH.join(Thu_muc_Du_lieu,"Nhan_vien")
class XL_NHAN_VIEN{
// Xử lý Lưu trữ 
static Doc_Khung_HTML(){
    var Chuoi_HTML=""
    var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
    Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
    return Chuoi_HTML
}
static  Doc_Danh_sach_Nhan_vien(){
    var Danh_sach=[]
    var Danh_sach_Ten_Tap_tin=FS.readdirSync(Thu_muc_Nhan_vien)
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin=>{
        var Duong_dan=PATH.join(Thu_muc_Nhan_vien,Ten_Tap_tin)
        var Chuoi_JSON=FS.readFileSync(Duong_dan,"utf-8")
        var Nhan_vien=JSON.parse(Chuoi_JSON)
        var M=Nhan_vien.Ngay_sinh.split("-")
        Nhan_vien.Ngaysinh=new Date(`${M[2]}-${M[1]}-${M[0]}`)
        Danh_sach.push(Nhan_vien)
        })
    return Danh_sach
}
// Xử lý Nghiệp vụ

static Tra_cuu_Nhan_vien(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    var n=parseInt(Chuoi_Tra_cuu)
    if(isNaN(n) )
       Danh_sach_Kq=XL_NHAN_VIEN.Tra_cuu_Nhan_vien_theo_Chuoi(Danh_sach,Chuoi_Tra_cuu)
    else 
       Danh_sach_Kq=XL_NHAN_VIEN.Tra_cuu_Nhan_vien_theo_So(Danh_sach,n)
    return Danh_sach_Kq
}
static Tra_cuu_Nhan_vien_theo_Chuoi(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    Chuoi_Tra_cuu=Chuoi_Tra_cuu.toUpperCase()
    Danh_sach.forEach(Nhan_vien=>{
        var Ho_ten=Nhan_vien.Ho_ten.toUpperCase()
        var Thoa_Dieu_kien=Ho_ten.includes(Chuoi_Tra_cuu) 
            || Nhan_vien.Don_vi.Ma_so.toUpperCase().includes(Chuoi_Tra_cuu)
            || Nhan_vien.Don_vi.Ten.toUpperCase().includes(Chuoi_Tra_cuu)
            || Nhan_vien.Don_vi.Chi_nhanh.Ma_so.toUpperCase().includes(Chuoi_Tra_cuu)
            || Nhan_vien.Don_vi.Chi_nhanh.Ten.toUpperCase().includes(Chuoi_Tra_cuu)
        if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Nhan_vien)
    })
    return Danh_sach_Kq
}
static Tra_cuu_Nhan_vien_theo_So(Danh_sach,n){
    var Danh_sach_Kq=[]
    if (n>=18 && n<=62 )
      Danh_sach.forEach(Nhan_vien=>{
         var Tuoi=new Date().getFullYear()-Nhan_vien.Ngaysinh.getFullYear()
         var Thoa_Dieu_kien=n-2<=Tuoi && Tuoi<=n+2
         if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Nhan_vien)
       })
    return Danh_sach_Kq
}
 
// Xử lý giao diện
static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu="",Chuoi_Bo_sung=""){
    var Chuoi_HTML=` <div style="background-color:gray;margin:10px" >
                   <div class="btn ">
                       <form action='/NHAN_VIEN/Tra_cuu' method='post' >
                            <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                 autocomplete='off' />
                      </form>
                  </div>
                  <div class="btn ">
                       ${Chuoi_Bo_sung}
                  </div>
             </div>
                </div>`
    return Chuoi_HTML
}
static Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach){
    var Chuoi_HTML_Danh_sach ="<div class='row' style='margin:10px' >"
    Danh_sach.forEach(Nhan_vien=>{
        var Chuoi_Hinh=`<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />   `
        var Tuoi=new Date().getFullYear()-Nhan_vien.Ngaysinh.getFullYear()
        var Chuoi_Thuc_don=`<div style="background-color:white;margin:10px" >
                            <form action='/Nhan_vien/Chuc_nang_1' method='post'  class="btn" >
                                <input name="Th_Ma_so" value='${Nhan_vien.Ma_so} ' type="hidden" />
                                <button type="submit" class="btn btn-danger">Chức năng 1</button>
                            </form>
                            <form action='/Nhan_vien/Chuc_nang_2' method='post'  class="btn">
                                <input name="Th_Ma_so" value='${Nhan_vien.Ma_so} ' type="hidden" />
                                <button type="submit" class="btn btn-danger">Chức năng 2</button>
                            </form>
                    </div>`
        var Chuoi_Thong_tin=`<div class='btn' style='text-align:left'>
                            ${Nhan_vien.Ho_ten} 
                            <br />${Tuoi} tuổi
                        </div>`
        var Chuoi_Thong_tin_Mo_rong=`<div class='btn' style='text-align:left'>
                            ${Nhan_vien.Ho_ten} 
                            <br />${Nhan_vien.Don_vi.Ten} ${Nhan_vien.Don_vi.Chi_nhanh.Ten}
                            <br />${Nhan_vien.Dien_thoai} 
                        </div>`
        var Chuoi_Dropdown=XL_NHAN_VIEN.Tao_Chuoi_Dropdown(Chuoi_Thong_tin,Chuoi_Thuc_don)
        var Chuoi_Collapse=XL_NHAN_VIEN.Tao_Chuoi_Collapse(Chuoi_Thong_tin,Chuoi_Thuc_don,Nhan_vien.Ma_so)
        var Chuoi_Modal=XL_NHAN_VIEN.Tao_Chuoi_Modal(Chuoi_Thong_tin,Chuoi_Thong_tin_Mo_rong,Nhan_vien.Ma_so)
        var Chuoi_HTML=`<div class='col-md-4' >
                           ${Chuoi_Hinh}  ${Chuoi_Collapse}  
                        </div>`
        Chuoi_HTML_Danh_sach +=Chuoi_HTML
    })
    Chuoi_HTML_Danh_sach +="</div>"  
    return Chuoi_HTML_Danh_sach
}
static Tao_Chuoi_Dropdown(Chuoi_Click,Chuoi_An){
    var Chuoi_HTML=`<div class='dropdown btn'>
                        <div data-toggle='dropdown'>${Chuoi_Click}</div>
                        <div class='dropdown-menu'>${Chuoi_An}</div>
                    </div>`
    return Chuoi_HTML
}
static Tao_Chuoi_Collapse(Chuoi_Click,Chuoi_An,id){
    var Chuoi_HTML=`<div data-toggle='collapse' data-target='#${id}'>${Chuoi_Click}</div>
                        <div class='collapse' id='${id}' >${Chuoi_An}</div>
                   `
    return Chuoi_HTML
}
static Tao_Chuoi_Modal(Chuoi_Click,Chuoi_An,id){
    var Chuoi_HTML=`<div class='btn' data-toggle='modal' data-target='#${id}'>${Chuoi_Click}</div>
                        <div class='modal' id='${id}' role='dialog' >
                           <div class='modal-dialog' >
                             <div class='modal-content' >
                                <div class='modal-body'>${Chuoi_An}</div>
                             </div>
                           </div>
                        </div>
                   `
    return Chuoi_HTML
}


}

module.exports=XL_NHAN_VIEN