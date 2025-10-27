class XL_DON_VI{
// Xử lý Nghiệp vụ
static Tao_Danh_sach_Don_vi(Danh_sach_Nhan_vien){
        var Danh_sach=[]
        Danh_sach_Nhan_vien.forEach(Nhan_vien=>{
            var Da_co=Danh_sach.find(x=>x.Ma_so==Nhan_vien.Don_vi.Ma_so) !=null
            if (!Da_co)
              Danh_sach.push(Nhan_vien.Don_vi)
        })
        return Danh_sach
    }
// Xử lý Giao diện
static Tao_Chuoi_HTML_Chon_Don_vi(Danh_sach_Don_vi,Ma_so_Don_vi=null){
    var Don_vi=Danh_sach_Don_vi.find(x=>x.Ma_so==Ma_so_Don_vi)
    if (!Don_vi)
        Don_vi=Danh_sach_Don_vi[0]
    var Chuoi_Click=`<div class='btn btn-primary dropdown-toggle' data-toggle='dropdown' >
                    ${Don_vi.Ten} </div>`
    var Chuoi_Danh_sach_Chon=`<div class='dropdown-menu'>`
    Danh_sach_Don_vi.forEach(Don_vi=>{
        Chuoi_Danh_sach_Chon +=`<div class='dropdown-item'>
                                <form action='/NHAN_VIEN/Tra_cuu' method='post' >
                                    <input name='Th_Chuoi_Tra_cuu' value='${Don_vi.Ma_so}'  type='hidden' />
                                    <button type='submit' class='btn btn-primary'>${Don_vi.Ten}</button>
                                </form>
                           </div>`
    })
    Chuoi_Danh_sach_Chon +=`</div>`
    var Chuoi_HTML=`<div class='btn dropdown' >
                        ${Chuoi_Click}
                        ${Chuoi_Danh_sach_Chon}
                    </div>`
    return Chuoi_HTML
}
}

module.exports=XL_DON_VI