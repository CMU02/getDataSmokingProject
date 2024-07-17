import exp from "constants";
import { addressProps } from "./AddressInterface";
import { Path } from "./polygonMethodInterface";

export interface DataConvertCsvProps {
    address_idx : string;
    address : addressProps[];
    address_position : { lat: number; lng: number } | undefined;
    division : string | undefined;
    implicit : string | undefined;
    paths : Path[];
}