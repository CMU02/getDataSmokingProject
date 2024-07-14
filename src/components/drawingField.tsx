import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState
} from "react";
import {
    number
} from "prop-types";
import {
    CustomOverlayMap,
    Polygon,
} from "react-kakao-maps-sdk";
import {
    handleClickProps,
    Path
} from "@/interface/polygonMethodInterface";

interface DrawingFieldProps {
    isDrawing : boolean,
    polygon : kakao.maps.Polygon | undefined,
    setPolygon : Dispatch<SetStateAction<kakao.maps.Polygon | undefined>>
    paths : Path[]
    mousePosition : {lat: number, lng: number}
}



export default function DrawingField({isDrawing, polygon, setPolygon ,paths, mousePosition,} : DrawingFieldProps) {

    return (
        <>
            <Polygon
                path={isDrawing ? [...paths, mousePosition] : paths}
                strokeWeight={3}
                strokeColor={"#00a0e9"}
                strokeOpacity={0.8}
                strokeStyle={"solid"}
                fillColor={"#00a0e9"}
                fillOpacity={0.2}
                onCreate={setPolygon}
            />
        </>
    )
}