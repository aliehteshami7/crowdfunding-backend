import { PermissionViews } from '../types/permission-view.type';

export enum PermissionTag {
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER',
}

export const PermissionTagKeys = Object.keys(PermissionTag);
export const PermissionTagValues = PermissionTagKeys.map(
  (k) => PermissionTag[k as any],
);

export const permissionsView: PermissionViews = {
  [PermissionTag.ADMIN]: {
    category: 'Admin',
    group: 'Admin',
    name: 'Admin',
  },

  [PermissionTag.REVIEWER]: {
    category: 'Reviewer',
    group: 'Reviewer',
    name: 'Reviewer',
  },
};
