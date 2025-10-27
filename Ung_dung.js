// install npm install express

// Khai báo sử dụng thư viện hàm 
const EXPRESS=require("express")
const XL_NHAN_VIEN=require("./XL_NHAN_VIEN")
const XL_DON_VI=require("./XL_DON_VI")
const XL_CHI_NHANH=require("./XL_CHI_NHANH")
// Khai báo và khởi động Ứng dụng 
var Ung_dung=EXPRESS()
Ung_dung.use("/Media",EXPRESS.static("./Media"))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.post("/NHAN_VIEN/Chuc_nang_1",XL_Chuc_nang_1)
Ung_dung.post("/NHAN_VIEN/Tra_cuu",XL_Tra_cuu_Nhan_vien)
// ====== Khai báo biến toàn cục
var Khung_HTML=XL_NHAN_VIEN.Doc_Khung_HTML()
var Danh_sach_Nhan_vien=XL_NHAN_VIEN.Doc_Danh_sach_Nhan_vien()
var Danh_sach_Don_vi=XL_DON_VI.Tao_Danh_sach_Don_vi(Danh_sach_Nhan_vien)
var Danh_sach_Chi_nhanh=XL_CHI_NHANH.Tao_Danh_sach_Chi_nhanh(Danh_sach_Nhan_vien)
// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
    var Chuoi_HTML_Chon_Don_vi=XL_DON_VI.Tao_Chuoi_HTML_Chon_Don_vi(Danh_sach_Don_vi)
    var Chuoi_HTML_Chon_Chi_nhanh=XL_CHI_NHANH.Tao_Chuoi_HTML_Chon_Chi_nhanh(Danh_sach_Chi_nhanh)
    var Chuoi_HTML=XL_NHAN_VIEN.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien("",Chuoi_HTML_Chon_Don_vi + Chuoi_HTML_Chon_Chi_nhanh)  
                 + XL_NHAN_VIEN.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien)    
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
function XL_Tra_cuu_Nhan_vien(req,res){
    var Chuoi_Tra_cuu=req.body.Th_Chuoi_Tra_cuu
    var Danh_sach_Nhan_vien_Xem=XL_NHAN_VIEN.Tra_cuu_Nhan_vien(Danh_sach_Nhan_vien,Chuoi_Tra_cuu)
    
    var Chuoi_HTML_Chon_Don_vi=XL_DON_VI.Tao_Chuoi_HTML_Chon_Don_vi(Danh_sach_Don_vi,Chuoi_Tra_cuu)
    var Chuoi_HTML_Chon_Chi_nhanh=XL_CHI_NHANH.Tao_Chuoi_HTML_Chon_Chi_nhanh(Danh_sach_Chi_nhanh,Chuoi_Tra_cuu)
    var Chuoi_HTML=XL_NHAN_VIEN.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu,Chuoi_HTML_Chon_Don_vi+ Chuoi_HTML_Chon_Chi_nhanh)
                + XL_NHAN_VIEN.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}

function XL_Chuc_nang_1(req,res){
    var Ma_so_Nhan_vien=req.body.Th_Ma_so
    x=4
}



