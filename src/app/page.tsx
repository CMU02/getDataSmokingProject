"use client"
import { Map, MapMarker, useKakaoLoader} from 'react-kakao-maps-sdk';
import React, { useEffect, useState } from "react";
import GetAddress from "@/components/getAddress";
import DrawingField from "@/components/drawingField";
import { addressProps } from "@/interface/AddressInterface";
import { Path } from "@/interface/polygonMethodInterface";
import DataConvertCsv from '@/components/dataConvertCsv';
import dayjs from 'dayjs';
import ShowAreaPaths from '@/components/showAreaPaths';

export default function Home() {
    const APP_KEY : string = "6cf24fc76a6d5ae29260b2a99b27b49a";
    const [loading, error] = useKakaoLoader({appkey : APP_KEY, libraries: ['services', "drawing", "clusterer"]});

    const [isDrawing, setIsDrawing] = useState(false);
    const [polygon, setPolygon] = useState<kakao.maps.Polygon>();
    const [paths, setPaths] = useState<Path[]>([]);
    const [mousePosition, setMousePosition] = useState({lat: 0, lng: 0});

    const [position, setPosition] = useState<{lat: number, lng: number}>({lat: 0, lng: 0});
    const [address, setAddress] = useState<addressProps[]>([]);
    const [mode, setMode] = useState(true);
    const [division, setDivision] = useState<string>('');
    const [implicit, setImplicit] = useState<string>('');

    const [dayTime, setDayTime] = useState<string>('');

    const getLocationInfo = (_map: kakao.maps.Map, mouseEvent : kakao.maps.event.MouseEvent) => {
        const latlng = mouseEvent.latLng
        const geocoder = new kakao.maps.services.Geocoder();
        setPosition({lat: latlng.getLat(), lng: latlng.getLng()
        })
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), callback)
    }
    const callback = (result: any, status: string) => {
        if (status === kakao.maps.services.Status.OK) {
            setAddress(result);
        }
    }
    const handleClick = (_map : kakao.maps.Map, mouseEvent : kakao.maps.event.MouseEvent) => {
        if (!isDrawing) {
            setPaths([])
        }
        setPaths((prevState) => [...prevState, {lat: mouseEvent.latLng.getLat(), lng: mouseEvent.latLng.getLng()}])
        setIsDrawing(true);
    }
    const handleMouseMove = (_map : kakao.maps.Map, mouseEvent : kakao.maps.event.MouseEvent) => {
        setMousePosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng()
        })
    }
    const handleDoubleClick = (_map : kakao.maps.Map, mouseEvent : kakao.maps.event.MouseEvent) => {
        setIsDrawing(false)
    }
    const onImplicitChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let currentValue = e.target.value
        if (currentValue === "yes") {
            setImplicit("yes")
        } else {
            setImplicit("no")
        }
    }

    const onSaveData = () => {
        const newData = {
            address_idx: dayTime,
            address,
            address_position: position,
            paths,
            division,
            implicit
        }

        localStorage.setItem(`data${dayTime}`, JSON.stringify(newData));
        alert("저장되었습니다.")
    }

    useEffect(() => {
        const dayTimer = setInterval(() => {
            setDayTime(dayjs().format('YYYY-MM-DD HH:mm:ss'))
        }, 1000);
        return () => {
            clearInterval(dayTimer);
        }
    }, [])

    return (
      <>
        <Map
          center={{ lat: 37.39432911172592, lng: 126.95693953605208 }}
          isPanto={true}
          style={{ width: "100%", height: "415px" }}
          level={3}
          zoomable={true}
          onClick={mode ? getLocationInfo : handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseMove={handleMouseMove}
        >
          <MapMarker
            position={
              position ?? { lat: 37.39432911172592, lng: 126.95693953605208 }
            }
          />
          <DrawingField
            isDrawing={isDrawing}
            paths={paths}
            setPolygon={setPolygon}
            polygon={polygon}
            mousePosition={mousePosition}
          />
        </Map>
        <div>
          <button onClick={() => setMode(!mode)}>영역 지정하기</button>
          <button onClick={() => setMode(!mode)}>
            해당 위치 주소 값 가져오기
          </button>
          <br />
          현재 모드 : {mode ? <div>주소 값 가져오기 중</div> : <div>영역 지정하는 중</div>}
        </div>
        <h3>현재 날짜 및 시간 : {dayTime}</h3>
        <ShowAreaPaths paths={paths} />
        <GetAddress address={address[0]} position={position}></GetAddress>
        구분 : <input type="text" value={division} onChange={(e) => {setDivision(e.target.value)}}/>
        <br />
        암묵적 흡연 장소 여부 :
        <input type="radio" value={"yes"} name="implicit" onChange={onImplicitChange} />Yes
        <input type="radio" value={"no"} name="implicit" onChange={onImplicitChange} />No
        <br />
        <button onClick={onSaveData}>저장</button>
        <a href="/showdata">저장된 데이터 확인하기</a>
        <div>
            <DataConvertCsv />
        </div>
      </>
    );
}
