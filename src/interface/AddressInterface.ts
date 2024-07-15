import {
    string
} from "prop-types";

export interface getAddressProp {
    address: addressProps |undefined;
    position: {lat:number, lng:number} | undefined;
}

export interface addressProps {
    road_address : roadAddressProps | undefined;
    // address : normalAddressProps | undefined;
}

interface roadAddressProps {
    address_name? : string;
    region_1depth_name? : string;
    region_2depth_name? : string;
    region_3depth_name? : string;
    road_name? : string;
    underground_yn? : string;
    main_building_no? : string;
    sub_building_no? : string;
    building_name? : string;
    zone_no? : string;
}

interface normalAddressProps {
    address_name? : string;
    region_1depth_name? : string;
    region_2depth_name? : string;
    region_3depth_name? : string;
    mountain_yn? : string;
    main_address_no? : string;
    sub_address_no? : string;
    zip_code? : string;
}