// install npm install express

// Khai báo sử dụng thư viện hàm 
const EXPRESS=require("express")
const XL_GIAO_DIEN=require("./XL_GIAO_DIEN.js")
const XL_KHACH=require("./XL_KHACH.js")
const XL_PHIM=require("./XL_PHIM.js")
const XL_BAN_VE=require("./XL_BAN_VE.js")
const XL_QUAN_LY=require("./XL_QUAN_LY.js")
const XL_SUAT_CHIEU=require("./XL_SUAT_CHIEU.js")

// Khai báo và khởi động Ứng dụng 
var Ung_dung=EXPRESS()
Ung_dung.use("/Media",EXPRESS.static("./Media"))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.get("/KHACH",XL_Tra_cuu_Phim)
Ung_dung.get("/BAN_VE",XL_Tra_cuu_Suat_chieu)
Ung_dung.post("/BAN_VE",XL_Ban_Ve_Tao_Ve)
Ung_dung.get("/QUAN_LY",XL_Thong_ke_Ve)

// ====== Khai báo biến toàn cục
var Khung_HTML=XL_GIAO_DIEN.Doc_Khung_HTML()
var Danh_sach_Phim = XL_PHIM.Doc_Danh_sach_Phim();
var Danh_sach_Suat_chieu = XL_SUAT_CHIEU.Doc_Danh_sach_Suat_chieu();

// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
    var Chuoi_HTML=XL_GIAO_DIEN.Tao_Chuoi_Trang_Giao_dien();  
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
function XL_Tra_cuu_Phim(req, res) {    
    var Chuoi_Tra_cuu = req.query.Th_Chuoi_Tra_cuu || ""; 
    var Danh_sach_Phim_Xem = XL_PHIM.Tra_cuu_Phim(Danh_sach_Phim, Chuoi_Tra_cuu); 
    
    var Chuoi_HTML = XL_KHACH.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Phim(Chuoi_Tra_cuu)
        +XL_KHACH.Tao_Chuoi_HTML_DanhSachPhim(Danh_sach_Phim_Xem); 
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
    res.send(Chuoi_HTML);
}

function XL_Tra_cuu_Suat_chieu(req, res) {
    var Chuoi_Tra_cuu = req.query.Th_Chuoi_Tra_cuu || "";
    var Danh_sach_Suat_chieu_Xem = XL_SUAT_CHIEU.Tra_cuu_Suat_chieu(Danh_sach_Suat_chieu, Chuoi_Tra_cuu); 
    var Chuoi_HTML = XL_BAN_VE.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Suat_chieu(Chuoi_Tra_cuu)
        + XL_BAN_VE.Tao_Chuoi_HTML_DanhSachSuatChieu(Danh_sach_Suat_chieu_Xem);
    
    if (req.query.success) {
        Chuoi_HTML += `<script>alert('Bán vé thành công!');</script>`;
    }
    if (req.query.error) {
        Chuoi_HTML += `<script>alert('Bán vé thất bại!');</script>`;
    }
    
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
    res.send(Chuoi_HTML);
}

function XL_Ban_Ve_Tao_Ve(req, res) {
    
    var Suat_chieu_ID = req.body.suat_chieu_id;
    var Ket_qua = XL_BAN_VE.Ban_Ve(Suat_chieu_ID);
    
    if (Ket_qua) {
        Danh_sach_Suat_chieu = XL_SUAT_CHIEU.Doc_Danh_sach_Suat_chieu();
        res.redirect('/BAN_VE?success=1');
    } else {
        res.redirect('/BAN_VE?error=1');
    }
}

function XL_Thong_ke_Ve(req, res) {
    var Chuoi_Tra_cuu = req.query.Th_Chuoi_Tra_cuu || "";
    var Chuoi_HTML = XL_QUAN_LY.Tao_Chuoi_HTML_Ket_hop(Chuoi_Tra_cuu);
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
    res.send(Chuoi_HTML);
}




