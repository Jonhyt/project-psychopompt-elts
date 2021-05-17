import { Gods } from "../../Assets/SoulAssets/Gods";
import { SoulOcupations } from "../../Assets/SoulAssets/SoulOccupations";
import { Taboos } from "../../Assets/SoulAssets/Taboos";
import { store } from "../../Store";
import { setFather } from "../../Store/Gods/actions";
import { Soul } from "../Soul";
import { God } from "../types/God";

export const FatherGod: God = {
    id: Gods.Father,
    approvalDelta: function (soul: Soul) {
        let approvalDelta = 0;
        //Likes priests and kings, dislikes thieves
        switch (soul.occupation) {
            case SoulOcupations.King:
            case SoulOcupations.Priest:
                approvalDelta += 1;
                break;
            case SoulOcupations.Thief:
                approvalDelta--;
                break;
        }

        //Dislikes if not worshipped, likes if worshipped
        approvalDelta += soul.worships.includes(Gods.Father) ? 2 : -1;

        approvalDelta += soul.worships.some((g) => g !== Gods.Father) ? -1 : 0;

        //Dislikes Blasphemy and Adultery
        if (soul.taboosBroken.includes(Taboos.Blasphemy) || soul.taboosBroken.includes(Taboos.Adultery)) approvalDelta--;

        return approvalDelta;
    },
    onAccept: function (soul: Soul) {
        //Likes when given a soul
        const approvalDelta = this.approvalDelta(soul) + 1;
        return approvalDelta;
    },
    onReject: function (soul: Soul) {
        //Dislikes when the soul is rejected
        const approvalDelta = -1;
        return approvalDelta;
    },
    onDestroy: function (soul: Soul) {
        //Inverts the approval change from what they would've gained if they
        //were given the soul
        const approvalDelta = -this.approvalDelta(soul);
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
        store.dispatch(setFather(approvalDelta));
    },
};
