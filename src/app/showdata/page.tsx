"use client";
import { DataConvertCsvProps } from "@/interface/DataConvertCsvInterface"
import { useEffect, useState } from "react"

export default function Data() {
    const [data, setData] = useState<DataConvertCsvProps[]>([]);

    const getDataToLocalStorage = () => {
        const keys = Object.keys(localStorage);
        const dataKeys = keys.filter((key) => key.startsWith("data"));
        const storedData: DataConvertCsvProps[] = dataKeys
            .filter((key) => localStorage.getItem(key) !== 'undefined')
            .map((key) => {
                return JSON.parse(localStorage.getItem(key) as string);
            })

        setData(storedData);
    }
    useEffect(() => {
        getDataToLocalStorage();
    }, [])


    return (
      <>
        <div>
          <table
            style={{ border: "solid 1px #000", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ border: "solid 1px #000" }}>
                <th style={{ border: "solid 1px #000" }}>Index</th>
                <th>Address Name</th>
                <th>Main Building No</th>
                <th>Sub Building No</th>
                <th>Building Name</th>
                <th>Address Position Latitude</th>
                <th>Address Position Longitude</th>
                <th>Zone No</th>
                <th>Division</th>
                <th>Implicit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.address_idx}>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address_idx}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address[0].road_address?.address_name}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address[0].road_address?.main_building_no}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address[0].road_address?.sub_building_no}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address[0].road_address?.building_name}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address_position?.lat}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address_position?.lng}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>
                    {item.address[0].road_address?.zone_no}
                  </td>
                  <td style={{ border: "solid 1px #000" }}>{item.division}</td>
                  <td style={{ border: "solid 1px #000" }}>{item.implicit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="/">뒤로가기</a>
        </div>
      </>
    );
}