import { ITrackEvent } from "./ITrackEvent";
import { IUserProperties } from "./IUserProperties"

interface TrackFunc {
    (event: ITrackEvent): void;
}

interface SetUserFunc {
    (properties: IUserProperties): void;
}

export interface ITracker {
    track: TrackFunc;
    setUser: SetUserFunc;
}
