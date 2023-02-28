import { ITrackEvent, ITracker, IUserProperties } from "./interfaces";
import { FirebaseTracker, OptimizelyTracker } from "./implementations";
import { FirebaseOptions } from 'firebase/app';
import { Config } from "@optimizely/optimizely-sdk";

export class Tracker implements ITracker {
  readonly trackers: ITracker[];
  constructor(firebaseOptions: FirebaseOptions, optimizelyConfig: Config) {
    this.trackers = [
      new FirebaseTracker(firebaseOptions),
      new OptimizelyTracker(optimizelyConfig),
    ];
  }

  setUser(userProperties: IUserProperties) {
    this.trackers.forEach((tracker) => tracker.setUser(userProperties));
  }

  track(event: ITrackEvent) {
    this.trackers.forEach((tracker) => tracker.track(event));
  }
}
