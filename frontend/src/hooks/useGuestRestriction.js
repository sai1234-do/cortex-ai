import useAuthStore from "../store/authStore";
import { useUIStore } from "../store/uiStore";

export default function useGuestRestriction() {

    const user = useAuthStore(state => state.user);

    const openGuestRestriction = useUIStore(
        state => state.openGuestRestriction
    );

    return function requireLogin(

        feature = "feature",

        description = ""

    ) {

        if (user) return true;

        openGuestRestriction({

            feature,

            description:
                description ||

                `Please login to use ${feature}.`

        });

        return false;

    };

}