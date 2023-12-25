import { AppUser, Base } from './app-user';

export class ActivityLog {
  actor?: AppUser;
  actee?: AppUser;
  objectType?: string;
  objectId?: string;
  actionType?: string;
  actionDescription?: string;
  otherDescription?: string;
  base?: Base
}

export class ActivityLogFilter {
  actorId?: string;
  acteeId?: string;
  objectType?: string;
  objectId?: string;
  actionType?: string;
}

