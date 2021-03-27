import { Gods } from "../Assets/SoulAssets/Gods";
import { SoulOcupations } from "../Assets/SoulAssets/SoulOccupations";
import { Taboos } from "../Assets/SoulAssets/Taboos";
import { Soul } from "./Soul";

export const FatherGod = {
    id: Gods.Father,
    onAccept: function (soul: Soul) {
        let approvalDelta = 1;
        //Likes priests and kings, dislikes thieves
        switch (soul.occupation) {
            case SoulOcupations.King:
            case SoulOcupations.Priest:
                approvalDelta++;
                break;
            case SoulOcupations.Thief:
                approvalDelta--;
                break;
        }

        //Dislikes if soul worships other Gods
        approvalDelta -= soul.worships.reduce((sum, g) => (g === Gods.Father || sum === 1 ? 0 : 1));

        //Dislikes if not worshipped, likes if worshipped
        approvalDelta += soul.worships.find((g) => g === Gods.Father) ? 1 : -1;

        //Dislikes Blasphemy and Adultery
        soul.taboosBroken.forEach((t) => {
            switch (t) {
                case Taboos.Adultery:
                case Taboos.Blasphemy:
                    approvalDelta--;
                    break;
            }
        });

        return approvalDelta;
    },
};
