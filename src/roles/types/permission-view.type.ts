import { PermissionTag } from '../enum/permission-tag.enum';

export type PermissionView = {
  category: string;
  group: string;
  name: string;
};

export type PermissionViews = {
  [permissionTag in PermissionTag]: PermissionView;
};
