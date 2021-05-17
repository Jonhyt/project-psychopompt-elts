import { Gods } from "../../Assets/SoulAssets/Gods";
import { SoulDeaths } from "../../Assets/SoulAssets/SoulDeaths";
import { SoulOcupations } from "../../Assets/SoulAssets/SoulOccupations";
import { store } from "../../Store";
import { setArchivist } from "../../Store/Gods/actions";
import { Soul } from "../Soul";
import { God } from "../types/God";

export const Archivist: God = {
    id: Gods.Archivist,
    approvalDelta: function (soul: Soul) {
        let approvalDelta = 0;

        //Likes older people
        if (soul.ageDeath <= 40) approvalDelta++;

        //Likes Scholars and Priests
        //Dislikes Farmers
        switch (soul.occupation) {
            case SoulOcupations.Priest:
            case SoulOcupations.Scholar:
                approvalDelta++;
                break;
            case SoulOcupations.Farmer:
                approvalDelta--;
        }

        //Likes people who died in wierd ways
        switch (soul.causeOfDeath) {
            case SoulDeaths.FreakAccident:
            case SoulDeaths.MauledAnimals:
                approvalDelta++;
        }

        return approvalDelta;
    },
    onAccept: function (soul: Soul) {
        //No modifiers on accept
        const approvalDelta = this.approvalDelta(soul);
        return approvalDelta;
    },
    onReject: function (soul: Soul) {
        //Prefers that souls be given to others than if they're destroyed
        const approvalDelta = Math.max(Math.round(this.approvalDelta(soul) / 2), 0);
        return approvalDelta;
    },
    onDestroy: function (soul: Soul) {
        //Dislikes a lot when souls are destroyed
        const approvalDelta = Math.min(-this.approvalDelta(soul), -1);
        return approvalDelta;
    },
    onSort: function (soul: Soul, god?: Gods) {
        let approvalDelta: number;
        if (god === undefined) {
            approvalDelta = this.onDestroy(soul);
        } else if (god === this.id) {
            approvalDelta = this.onAccept(soul);
        } else {
            approvalDelta = this.onReject(soul);
        }
        store.dispatch(setArchivist(approvalDelta));
    },
};
