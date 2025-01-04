import { useNavigate } from "react-router-dom";
import { items, knowledge_items, majorItems, realOrFakeItems } from "./config";
import EastIcon from "@mui/icons-material/East";

const Knowledge = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[80vw] mx-auto">
      <div className="flex gap-x-2 items-center mt-10 opacity-60 text-[14px]">
        <button onClick={() => navigate("/")}>Trang chủ</button>/
        <p>Kiến thức đồng hồ</p>
      </div>
      <hr className="w-full my-5" />
      <p className="text-3xl mb-5">Kiến thức đồng hồ</p>

      <div className="grid grid-cols-2 gap-x-5">
        <div>
          <div className="overflow-hidden">
            <img
              src="/images/knowledge/kienthuc18.png"
              className="hover:opacity-70 box-border hover:scale-110 cursor-pointer"
              alt=""
            />
          </div>
          <p className="mt-5 font-bold text-xl hover:text-red-500 cursor-pointer">
            BST ĐỒNG HỒ POLJOT "HÀO KHÍ VIỆT NAM" PHIÊN BẢN GIỚI HẠN
          </p>
          <p className="mt-2 text-[12px] opacity-60">01/01/1970</p>
          <p className="mt-2 ">
            Hội tụ những chiếc đồng hồ mang Biểu tượng cao quý của đất nước Việt
            Nam như: Hình ảnh Bác Hồ vĩ đại, bản đồ Việt Nam,...
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 cursor-pointer">
          {items.map((item, index) => (
            <div key={index}>
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  className="hover:opacity-70 box-border hover:scale-110"
                  alt=""
                />
              </div>
              <p className="mt-5 font-bold hover:text-red-500">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full my-10" />

      <div className="grid grid-cols-3 gap-x-10 mb-20">
        <div className="col-span-2">
          {knowledge_items.map((item, index) => (
            <div key={index}>
              {index !== 0 ? <hr className="w-full my-10" /> : null}
              <div className="grid grid-cols-5 gap-x-5">
                <div className="overflow-hidden col-span-2">
                  <img
                    src={item.image}
                    className="hover:opacity-70 cursor-pointer hover:scale-110"
                    alt=""
                  />
                </div>
                <div className="col-span-3">
                  <p className="font-bold hover:text-red-500 cursor-pointer">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[12px] opacity-60">{item.date}</p>
                  <p className="mt-5">{item.content}</p>
                  <div className="text-red-500 mt-3 flex items-center gap-x-2 text-sm cursor-pointer">
                    <EastIcon style={{ fontSize: 18 }} /> Xem thêm
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex">
            <div className="w-1 bg-red-700"></div>
            <p className="flex-1 bg-stone-200 pl-5 py-2 font-bold">
              PHÂN BIỆT ĐỒNG HỒ THẬT GIẢ
            </p>
          </div>

          {realOrFakeItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-x-3 mt-5 cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  className="hover:opacity-60 hover:scale-110"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <p className="font-bold">{item.title}</p>
                <p className="mt-5 text-[12px] opacity-60">{item.date}</p>
              </div>
            </div>
          ))}

          <div className="flex mt-10">
            <div className="w-1 bg-red-700"></div>
            <p className="flex-1 bg-stone-200 pl-5 py-2 font-bold">
              KIẾN THỨC CHUYÊN NGÀNH
            </p>
          </div>

          {majorItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-x-3 mt-5 cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  className="hover:opacity-60 hover:scale-110"
                  alt=""
                />
              </div>
              <div className="col-span-2">
                <p className="font-bold">{item.title}</p>
                <p className="mt-5 text-[12px] opacity-60">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
