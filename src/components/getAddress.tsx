"use client";
import {
    getAddressProp
} from "@/interface/AddressInterface";
import {
    useEffect,
    useState
} from "react";



export default function GetAddress({address, position} : getAddressProp) {
    // 위도, 경도
    let lat = position?.lat
    let lng = position?.lng

    // 도로명 주소
    const [rAddressName, setRAddressName] = useState<string>();
    const [rUndergroundYn, setRUndergroundYn] = useState<string>();
    const [rMainBuildingNo, setRMainBuildingNo] = useState<string>();
    const [rSubBuildingNo, setRSubBuildingNo] = useState<string>();
    const [rBuildingName, setRBuildingName] = useState<string>();
    const [rZoneNo, setRZoneNo] = useState<string>();

    // 일반 주소
    // const [nAddressName, setNAddressName] = useState<string>();
    // const [nMountain_yn, setNMountain_yn] = useState<string>();
    // const [nMainAddressNo, setNMainAddressNo] = useState<string>();
    // const [nSubAddressNo, setNSubAddressNo] = useState<string>();
    // const [nZipCode, setNZipCode] = useState<string>();


    useEffect(() => {
        const road_address = address?.road_address
        // const normal_address = address?.address

        // 도로명 주소 setter
        setRAddressName(road_address?.address_name)
        setRUndergroundYn(road_address?.underground_yn)
        setRMainBuildingNo(road_address?.main_building_no)
        setRSubBuildingNo(road_address?.sub_building_no)
        setRBuildingName(road_address?.building_name)
        setRZoneNo(road_address?.zone_no)

        // 일반 주소 setter
        // setNAddressName(normal_address?.address_name);
        // setNMountain_yn(normal_address?.mountain_yn)
        // setNMainAddressNo(normal_address?.main_address_no)
        // setNSubAddressNo(normal_address?.sub_address_no)
        // setNZipCode(normal_address?.zip_code)

    }, [address])

    return (
        <div>
            <div>
                <h3>해당 위치 정보</h3>
                <h4>좌표</h4>
                위도 : <input type="text" readOnly={true} value={lat}/><br />
                경도 : <input type="text" readOnly={true} value={lng}/>

                <h4>도로명 주소</h4>
                주소 : <input
                            type="text"
                            value={rAddressName}
                            onChange={(e) => setRAddressName(e.target.value)}
                            style={{width: "250px"}}
                /> <br />
                건물 메인 번호 : <input type="text" value={rMainBuildingNo}/> <br/>
                건물 서브 번호 : <input type="text" value={rSubBuildingNo}/> <br/>
                건물 이름 : <input type="text" value={rBuildingName} style={{width: "210px"}}/> <br/>
                우편번호 : <input type="text" value={rZoneNo}/> <br />
            </div>
        </div>
    );
}