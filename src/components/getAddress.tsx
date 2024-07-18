"use client";
import {
    getAddressProp
} from "@/interface/AddressInterface";
import {
    useEffect,
    useState
} from "react";



export default function GetAddress({address, position, inputBuildingName} : getAddressProp) {
    return (
        <div>
            <div>
                <h3>해당 위치 정보</h3>
                <h4>좌표</h4>
                위도 : {position?.lat || ''}<br />
                경도 : {position?.lng || ''}<br />

                <h4>도로명 주소</h4>
                주소 : {address?.road_address?.address_name || ''} <br/>
                건물 메인 번호 : {address?.road_address?.main_building_no || ''} <br/>
                건물 서브 번호 : {address?.road_address?.sub_building_no || ''} <br/>
                건물 이름 : <input type="text" value={address?.road_address?.building_name} onChange={inputBuildingName}/> <br/>
                우편번호 : {address?.road_address?.zone_no} <br />
            </div>
        </div>
    );
}