import { createInstance, Client, Config } from "@optimizely/optimizely-sdk";
import { ITracker, ITrackEvent, IUserProperties } from '../interfaces';

export class OptimizelyTracker implements ITracker {
    readonly client: Client | null;
    private userProperties!: IUserProperties;

    constructor(config: Config) {
        this.client = createInstance(config);
    }

    setUser(properties: IUserProperties) {
        this.userProperties = properties;
    }

    track(event: ITrackEvent) {
        this.client?.track(event.name, this.userProperties?.id, {
            user_id_property: this.userProperties?.id,
            analytical_id: this.userProperties?.analyticalId,
            owner_user_id: this.userProperties?.ownerId,
            user_roles: this.userProperties?.roles.sort().join(','),
            owner_user_roles: this.userProperties?.ownerRoles.sort().join(','),
        });
    }

}