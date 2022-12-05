import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics, logEvent, Analytics, setUserId, setUserProperties } from 'firebase/analytics';
import { ITracker, ITrackEvent, IUserProperties } from '../interfaces';

export class FirebaseTracker implements ITracker {
    readonly app: FirebaseApp;
    readonly analytics: Analytics;

    constructor(options: FirebaseOptions) {
        this.app = initializeApp(options);
        this.analytics = getAnalytics(this.app);
    }

    setUser(properties: IUserProperties) {
        setUserId(this.analytics, properties.id);
        setUserProperties(this.analytics, {
            user_id_property: properties.id,
            analytical_id: properties.analyticalId,
            owner_user_id: properties.ownerId,
            user_roles: properties.roles.sort().join(','),
            owner_user_roles: properties.ownerRoles.sort().join(','),
        });
    }

    track(event: ITrackEvent) {
        logEvent(this.analytics, event.name, event.context);
    }

}