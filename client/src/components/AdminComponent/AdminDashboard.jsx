import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { BarElement } from "chart.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { getStatistic } from "../../services/StatisticService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const Statistic = async () => {
      const res = await getStatistic();
      setData(res.statistic);
    };

    Statistic();
  }, []);
  return (
    <div className="w-full h-full">
      {data && (
        <>
          <div className="grid grid-cols-2 items-center">
            <div className="flex flex-col items-center">
              {
                <Pie
                  data={{
                    labels: ["Đồng hồ nam", "Dồng hồ nữ"],
                    datasets: [
                      {
                        label: "Số lượng đồng hồ",
                        data: [data[0]?.maleSales, data[0]?.femaleSales],
                        backgroundColor: ["#FF0000", "#99CCFF"],
                        borderColor: ["#FF0000", "#99CCFF"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  className=" !w-[300px] !h-[300px]"
                />
              }
              <p className="font-bold">
                Số lượng sản phẩm bán ra được theo danh mục trong tháng
              </p>
            </div>
            <div className="flex flex-col items-center">
              {
                <Bar
                  data={{
                    labels: data[0].brands
                      .slice(0, 6)
                      .map((brand) => brand.name),
                    datasets: [
                      {
                        label: "Số lượng",
                        data: data[0].brands
                          .slice()
                          .map((brand) => brand.soldMonth),
                        backgroundColor: "#8B008B",
                      },
                    ],
                  }}
                  className=" !w-full !h-[300px]"
                />
              }
              <p className="font-bold">
                Số lượng sản phẩm bán ra được theo thương hiệu trong tháng
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {
              <Line
                data={{
                  labels: data.map(
                    (item, index) => "tháng" + data[11 - index].month
                  ),
                  datasets: [
                    {
                      label: "Tổng tiền",
                      data: data.map((item, index) => data[11 - index].revenue),
                      borderColor: "#99CCFF",
                      backgroundColor: "#99CCFF",
                    },
                  ],
                }}
                className=" !w-full !h-[440px]"
              />
            }
            <p className="font-bold">Tổng doanh thu trong 12 tháng</p>
          </div>
        </>
      )}

      {!data && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

// lables = data.map(item=> ('thang'+ item.month)).revse()
