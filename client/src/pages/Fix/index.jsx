import Carousel from "../../components/Carousel/Carousel";
import { fixWatchs, watchBattery } from "./config";

const Fix = () => {
  return (
    <div className="max-w-[80vw] mx-auto">
      <p className="text-center text-3xl font-bold mt-10">
        TẠI SAO NÊN CHỌN SỬA CHỮA ĐỒNG HỒ TẠI DWATCH
      </p>
      <div className="w-80 bg-red-500 mx-auto h-[2px] mt-2"></div>

      <div className="grid grid-cols-5 gap-x-10 mt-10">
        <div className="border border-red-500 rounded-xl col-span-2">
          <div className="bg-stone-300 rounded-t-xl">
            <img src="/images/fix/fix.png" className="w-full" alt="" />
          </div>
          <div className="py-2 px-5">
            <div className="flex gap-x-5 items-center">
              <img src="/images/fix/fix6.png" className="w-12" alt="" />
              <p>
                <p className="text-red-500 font-bold">ĐỘI NGŨ KỸ THUẬT</p>
                <p>CHUYÊN GIA - TÂM HUYẾT</p>
              </p>
            </div>
            <div className="flex gap-x-5 items-center mt-2">
              <img src="/images/fix/fix7.png" className="w-12" alt="" />
              <p>
                <p className="text-red-500 font-bold">
                  CAM KẾT BẢO HÀNH SỬA CHỮA
                </p>
                <p>CHUẨN CÁC BƯỚC</p>
              </p>
            </div>
            <div className="flex gap-x-5 items-center mt-2">
              <img src="/images/fix/fix8.png" className="w-12" alt="" />
              <p>
                <p className="text-red-500 font-bold">CƠ SỞ SỬA CHỮA</p>
                <p>ĐẠT CHUẨN</p>
              </p>
            </div>
            <div className="flex gap-x-5 items-center mt-2">
              <img src="/images/fix/fix9.png" className="w-12" alt="" />
              <p>
                <p className="text-red-500 font-bold">TRANG THIẾT BỊ</p>
                <p>NHẬP KHẨU HIỆN ĐẠI</p>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <Carousel />
        </div>
      </div>

      <div>
        <p className="text-center text-3xl font-bold mt-10">
          QUY TRÌNH TIẾP NHẬN, SỬA CHỮA ĐỒNG HỒ TẠI DWATCH
        </p>
        <div className="w-52 bg-red-500 mx-auto h-[2px] mt-2"></div>
        <img
          src="/images/fix/fix10.jpeg"
          className="w-4/5 mx-auto mt-10"
          alt=""
        />
      </div>

      <div className="bg-stone-100 p-10 mt-20">
        <p className="text-center text-3xl font-bold">
          QUY TRÌNH SỬA CHỮA ĐỒNG HỒ
        </p>
        <div className="w-52 bg-red-500 mx-auto h-[2px] mt-2"></div>
        <div className="grid grid-cols-4 gap-5 mt-10">
          {fixWatchs.map((fixWatch, index) => (
            <div key={index} className="bg-stone-200 rounded-lg">
              <img src={fixWatch.image} className="rounded-lg w-full" alt="" />
              <p className="mt-2 text-xl font-bold p-5 text-center">
                {fixWatch.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-100 p-10 mt-20">
        <p className="text-center text-3xl font-bold">
          QUY TRÌNH THAY PIN ĐỒNG HỒ
        </p>
        <div className="w-52 bg-red-500 mx-auto h-[2px] mt-2"></div>
        <div className="grid grid-cols-4 gap-5 mt-10">
          {watchBattery.map((watchBattery, index) => (
            <div key={index} className="bg-stone-200 rounded-lg">
              <img
                src={watchBattery.image}
                className="rounded-lg w-full"
                alt=""
              />
              <p className="mt-2 text-xl font-bold p-5 text-center">
                {watchBattery.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-center text-3xl font-bold mt-10">
          Chuyên gia tư vấn miễn phí
        </p>
        <div className="w-52 bg-red-500 mx-auto h-[2px] mt-2"></div>
        <div
          className="mt-10 py-10 px-20 text-white grid grid-cols-4 gap-x-20"
          style={{
            backgroundImage: "url('/images/fix/fix6.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="border border-white rounded-full text-red-500 font-bold text-4xl flex text-center items-center aspect-square">
            LỊCH LÀM VIỆC
          </p>
          <div className="col-span-3 mr-32">
            <p className="text-4xl  mb-5">SÁNG: 9H - 12H | CHIỀU : 13H - 18H</p>
            <p className="text-4xl  mb-20">
              THỜI GIAN: THỨ 2 - THỨ 7 HÀNG TUẦN
            </p>
            <p className="italic opacity-80">
              (*)Lưu ý: Dwatch chỉ nhận sửa chữa đối với khách hàng mang đồng hồ
              trực tiếp qua các cơ sở kỹ thuật, không nhận qua COD trừ một số
              trường hợp đặc biệt. Quý khách vui lòng liên hệ Dwatch để biết chi
              tiết
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 w-[600px] mx-auto flex justify-between bg-red-600 text-white rounded-full">
        <p className="p-5 text-xl">TƯ VẤN MIỄN PHÍ</p>
        <input
          type="text"
          className="focus:outline-none border text-black text-xl border-red-400 px-2 flex-1"
          placeholder="Câu hỏi tư vấn..."
        />
        <button className="p-5 text-xl hover:bg-red-700 active:bg-red-600 rounded-r-full">
          Gửi ngay
        </button>
      </div>
      <p className="font-bold text-xl text-center my-5">
        Cảm ơn bạn đã quan tâm tới dịch vụ sửa chữa - bảo dưỡng đồng hồ tại
        Dwatch
      </p>
    </div>
  );
};

export default Fix;
