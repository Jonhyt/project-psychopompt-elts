import { Gods } from "../../Assets/SoulAssets/Gods";
import { Soul } from "../Soul";

export type God = {
    id: Gods;
    approvalDelta: (soul: Soul) => number;
    onAccept: (soul: Soul) => number;
    onReject: (soul: Soul) => number;
    onDestroy: (soul: Soul) => number;
    onSort: (soul: Soul, god?: Gods) => void;
};
