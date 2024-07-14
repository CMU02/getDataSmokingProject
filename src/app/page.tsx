"use client"
import {
    DrawingManager,
    Map,
    MapMarker,
    useKakaoLoader,
} from 'react-kakao-maps-sdk';
import React, {
    useState
} from "react";
import GetAddress
    from "@/components/getAddress";
import DrawingField
    from "@/components/drawingField";
import {
    addressProps
} from "@/interface/AddressInterface";
import {
    Path
} from "@/interface/polygonMethodInterface";

export default function Home() {
    const APP_KEY : string = '6cf24fc76a6d5ae29260b2a99b27b49a';
    const [loading, error] = useKakaoLoader({appkey : APP_KEY, libraries: ['services', "drawing", "clusterer"]});

    const [position, setPosition] = useState<{lat: number, lng: number}>()
    const [address, setAddress] = useState<addressProps[]>([]);
    const [mode, setMode] = useState(true);

    const [isDrawing, setIsDrawing] = useState(false);
    const [polygon, setPolygon] = useState<kakao.maps.Polygon>();
    const [paths, setPaths] = useState<Path[]>([]);
    const [mousePosition, setMousePosition] = useState({lat: 0, lng: 0});
    const [math, setMath] = useState<number>()

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
    const onChangeMode = () => {
        setMode(!mode);
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

    return (
        <>
            <Map
                center={{lat: 37.39432911172592, lng: 126.95693953605208}}
                isPanto={true}
                style={{width:'100%', height: '500px'}}
                level={3}
                zoomable={true}
                onClick={mode ? getLocationInfo : handleClick}
                onDoubleClick={handleDoubleClick}
                onMouseMove={handleMouseMove}
            >
                <MapMarker position={position ?? {lat: 37.39432911172592, lng: 126.95693953605208}} />
                <DrawingField isDrawing={isDrawing} paths={paths} setPolygon={setPolygon} polygon={polygon} mousePosition={mousePosition}/>
            </Map>
            <div>
                <button onClick={onChangeMode}>영역 지정하기</button>
                <button onClick={onChangeMode}>해당 위치 주소 값 가져오기</button><br />
                현재 모드 : {mode ? <div>주소 값 가져오기 중</div> : <div>영역 지정하는 중</div>}
            </div>
            <div>
                <h3>영역 좌표 값</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Latitude (위도)</th>
                            <th>Longitude (경도)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        paths.map((path, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{path.lat}</td>
                                <td>{path.lng}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <GetAddress address={address[0]} position={position}></GetAddress>
        </>
    );
}
