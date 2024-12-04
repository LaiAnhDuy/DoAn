import { expertises } from "./config";

export default function Expertise() {
  return (
    <div className="bg-stone-100 mt-10 py-10 relative">
      <div className="max-w-[80vw] mx-auto grid grid-cols-3 items-center">
        <hr className="h-[2px] bg-stone-200" />
        <p className="text-center font-medium text-3xl">THẨM ĐỊNH ĐỒNG HỒ</p>
        <hr className="h-[2px] bg-stone-200" />
      </div>
      <div className="max-w-[80vw] mx-auto flex justify-between gap-x-10 mt-10">
        {expertises.map((expertise, index) => (
          <div key={index}>
            <div className="overflow-hidden col-span-2">
              <img
                src={expertise.image}
                className="cursor-pointer hover:scale-110 w-full"
                alt=""
              />
            </div>
            <p className="mt-2 hover:text-red-500 cursor-pointer">
              {expertise.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center absolute left-0 right-0 -bottom-9">
        <button className="bg-red-500 text-white p-5 text-xl hover:bg-red-400 active:bg-red-500">
          Xem kết quả thẩm định 20.000 chiếc đồng hồ
        </button>
      </div>
    </div>
  );
}
