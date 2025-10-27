class XL_CHI_NHANH{
    // Xử lý Nghiệp vụ
    static Tao_Danh_sach_Chi_nhanh(Danh_sach_Nhan_vien){
            var Danh_sach=[]
            Danh_sach_Nhan_vien.forEach(Nhan_vien=>{
                var Da_co=Danh_sach.find(x=>x.Ma_so==Nhan_vien.Don_vi.Chi_nhanh.Ma_so) !=null
                if (!Da_co)
                  Danh_sach.push(Nhan_vien.Don_vi.Chi_nhanh)
            })
            return Danh_sach
        }
    // Xử lý Giao diện
    static Tao_Chuoi_HTML_Chon_Chi_nhanh(Danh_sach_Chi_nhanh,Ma_so_Chi_nhanh=null){
        var Chi_nhanh=Danh_sach_Chi_nhanh.find(x=>x.Ma_so==Ma_so_Chi_nhanh)
        if (!Chi_nhanh)
            Chi_nhanh=Danh_sach_Chi_nhanh[0]
        var Chuoi_Click=`<div class='btn btn-primary dropdown-toggle' data-toggle='dropdown' >
                        ${Chi_nhanh.Ten} </div>`
        var Chuoi_Danh_sach_Chon=`<div class='dropdown-menu'>`
        Danh_sach_Chi_nhanh.forEach(Chi_nhanh=>{
            Chuoi_Danh_sach_Chon +=`<div class='dropdown-item'>
                                    <form action='/NHAN_VIEN/Tra_cuu' method='post' >
                                        <input name='Th_Chuoi_Tra_cuu' value='${Chi_nhanh.Ma_so}'  type='hidden' />
                                        <button type='submit' class='btn btn-primary'>${Chi_nhanh.Ten}</button>
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
    
    module.exports=XL_CHI_NHANH