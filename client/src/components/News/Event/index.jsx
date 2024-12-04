import { CalendarOutlined } from "@ant-design/icons";
export default function Event({image, title, date, content}) {
  return (
    <div>
      <div className="overflow-hidden">
        <img
          src={image}
          className="max-h-[148px] w-full cursor-pointer hover:scale-110"
          alt=""
        />
      </div>
      <p className="mt-3 font-bold cursor-pointer hover:text-red-500">
        {title}
      </p>
      <div className="mt-2 mb-5">
        <CalendarOutlined />
        {date}
      </div>
      <p>{content}</p>
    </div>
  );
}
