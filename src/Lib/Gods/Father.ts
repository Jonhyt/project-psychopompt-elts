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
                approvalDelta += 2;
                break;
            case SoulOcupations.Thief:
                approvalDelta--;
                break;
        }

        if (soul.worships.length > 0) {
            //Dislikes if soul worships other Gods
            approvalDelta -= soul.worships.reduce((sum, g) => (g === Gods.Father || sum === 1 ? 0 : 1));

            //Dislikes if not worshipped, likes if worshipped
            approvalDelta += soul.worships.find((g) => g === Gods.Father) ? 2 : -1;
        }

        //Dislikes Blasphemy and Adultery
        if (soul.taboosBroken.includes(Taboos.Blasphemy) || soul.taboosBroken.includes(Taboos.Adultery)) approvalDelta--;

        // soul.taboosBroken.forEach((t) => {
        //     switch (t) {
        //         case Taboos.Adultery:
        //         case Taboos.Blasphemy:
        //             approvalDelta--;
        //             break;
        //     }
        // });

        return approvalDelta;
    },
    onAccept: function (soul: Soul) {
        //Likes when given a soul
        const approvalDelta = this.approvalDelta(soul) + 1;
        return approvalDelta;
    },
    onReject: function (soul: Soul) {
        //Always dislikes when a soul is given to another God.
        //Loses half the approval they'd get if soul was given to them
        //If it's a soul they don't like, lose 1 approval
        // const approvalDelta = Math.round(-Math.max(this.approvalDelta(soul), 1));

        //-1 when the soul is rejected
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
