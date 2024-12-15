import { events } from "./config";
import Event from "./Event";

export default function News() {
  return (
    <div className="mx-[150px] border-b border-x p-10 mb-10 mt-20">
      <p className="text-3xl mb-5">DWATCH - TIN TỨC VÀ SỰ KIỆN</p>
      <div className="w-10 h-[2px] bg-red-500 mt-2 mb-10"></div>
      <div className="grid grid-cols-4 gap-x-5">
        <div className="col-span-3 grid grid-cols-3 gap-x-5">
          {events.map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </div>
        <div className="flex">
          <div className="w-[2px] bg-stone-200 mr-5"></div>
          <div>
            <p className="text-xl">BÁO CHÍ NÓI VỀ DWATCH</p>
            <div className="w-5 h-1 bg-red-500 mt-2 mb-10"></div>
            <img src="/images/event/dantri.png" className="max-w-48" alt="" />
            <img src="/images/event/vietnamnet.png" className="max-w-48 my-5" alt="" />
            <img src="/images/event/vtv1.png" className="max-w-48" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
