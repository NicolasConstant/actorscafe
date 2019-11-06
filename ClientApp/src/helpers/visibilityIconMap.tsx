import { Visibility } from "../models/Visibility";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export const visibilityIconMap: {
    [key in Visibility]: IconProp;
} = {
    public: "globe",
    followers: "lock",
    direct: "envelope",
};
