"use client";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { DataConvertCsvProps } from '@/interface/DataConvertCsvInterface';
import build from 'next/dist/build';
import path from 'path';
 
export default function DataConvertCsv() {
    const [data, setData] = useState<DataConvertCsvProps[]>([]);

    const getDataToLocalStorage = () => {
        const keys = Object.keys(localStorage);
        const dataKeys = keys.filter((key) => key.startsWith("data"));

        const storedData: DataConvertCsvProps[] = dataKeys.map(
            (key) => {
            return JSON.parse(localStorage.getItem(key) || "{}");
            }
        );
        setData(storedData);
    }


    useEffect(() => {
        getDataToLocalStorage();
    }, [])

    console.log(data)

    const generateCsv = () => {
        const csvData1 = data.map(item => ({
            address_idx : item.address_idx,
            address_name : item.address[0].road_address?.address_name,
            main_building_no : item.address[0].road_address?.main_building_no,
            sub_building_no : item.address[0].road_address?.sub_building_no,
            building_name : item.address[0].road_address?.building_name,
            address_position_lat : item.address_position?.lat,
            address_position_lng : item.address_position?.lng,
            zone_no : item.address[0].road_address?.zone_no,
            division : item.division,
            implicit : item.implicit
        }))


        const csvData2 = data.map(item =>({
                address_idx : item.address_idx,
                path_lat : item.paths.map(path => path.lat),
                path_lng : item.paths.map(path => path.lng)
            })
        )

        const csv1 = Papa.unparse(csvData1);
        const blob1 = new Blob([csv1], { type: "text/csv;charset=utf-8" });

        const csv2 = Papa.unparse(csvData2);
        const blob2 = new Blob([csv2], { type: "text/csv;charset=utf-8" });

        saveAs(blob1, "data1.csv");

        saveAs(blob2, "data2.csv");
    };

    return (
        <div>
            <button onClick={getDataToLocalStorage}>데이터 가져오기</button>
            <button onClick={generateCsv}>데이터 추출하기</button>
        </div>
    )
}