import { Gods } from "../../Assets/SoulAssets/Gods";
import { SoulDeaths } from "../../Assets/SoulAssets/SoulDeaths";
import { SoulOcupations } from "../../Assets/SoulAssets/SoulOccupations";
import { Taboos } from "../../Assets/SoulAssets/Taboos";
import { store } from "../../Store";
import { setWarrior } from "../../Store/Gods/actions";
import { Soul } from "../Soul";
import { God } from "../types/God";

export const WarriorGod: God = {
    id: Gods.Warrior,
    approvalDelta: function (soul: Soul) {
        let approvalDelta = 0;

        //Really likes Kings and Generals
        //Likes Soldiers
        switch (soul.occupation) {
            case SoulOcupations.King:
            case SoulOcupations.General:
                approvalDelta += 2;
                break;
            case SoulOcupations.Soldier:
                approvalDelta++;
        }

        //Likes people who died in battle
        //Dislikes people who died of old age or disease
        switch (soul.causeOfDeath) {
            case SoulDeaths.KilledBattle:
                approvalDelta++;
                break;
            case SoulDeaths.Old:
            case SoulDeaths.Disease:
                approvalDelta--;
        }

        //Likes young adult people (14 - 39)
        //Dislikes old people (40+)
        if (soul.ageDeath >= 14) {
            if (soul.ageDeath < 40) approvalDelta++;
            else approvalDelta--;
        }

        //Dislikes deserters
        if (soul.taboosBroken.includes(Taboos.Desertion)) approvalDelta--;

        return approvalDelta;
    },
    onAccept: function (soul: Soul) {
        const approvalDelta = this.approvalDelta(soul) + 1;
        return approvalDelta;
    },
    onReject: function (soul: Soul) {
        const approvalDelta = -this.approvalDelta(soul);
        return approvalDelta;
    },
    onDestroy: function (soul: Soul) {
        const approvalDelta = -this.approvalDelta(soul);
        return approvalDelta;
    },
    onSort: function (soul: Soul, god?: Gods) {
        let approvalDelta: number;
        if (!god) {
            approvalDelta = this.onDestroy(soul);
        } else if (god === this.id) {
            approvalDelta = this.onAccept(soul);
        } else {
            approvalDelta = this.onReject(soul);
        }
        store.dispatch(setWarrior(approvalDelta));
    },
};
