import { PermissionViews } from '../types/permission-view.type';

export enum PermissionTag {
  CREATE_SUBSCRIBER = 'CREATE_SUBSCRIBER',
  READ_SUBSCRIBER = 'READ_SUBSCRIBER',
  FIND_SUBSCRIBER = 'FIND_SUBSCRIBER',
  UPDATE_SUBSCRIBER = 'UPDATE_SUBSCRIBER',
  DELETE_SUBSCRIBER = 'DELETE_SUBSCRIBER',

  SET_DEVICE_OWNERSHIP = 'SET_DEVICE_OWNERSHIP',

  CREATE_EMPLOYEE = 'CREATE_EMPLOYEE',
  READ_EMPLOYEE = 'READ_EMPLOYEE',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  FIND_EMPLOYEE = 'FIND_EMPLOYEE',

  SUSPEND_EMPLOYEE = 'SUSPEND_EMPLOYEE',
  ACTIVATE_EMPLOYEE = 'ACTIVATE_EMPLOYEE',

  CREATE_ROLE = 'CREATE_ROLE',
  READ_ROLE = 'READ_ROLE',
  FIND_ROLE = 'FIND_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',

  CREATE_USER_ROLE = 'CREATE_USER_ROLE',
  READ_USER_ROLE = 'READ_USER_ROLE',
  FIND_USER_ROLE = 'FIND_USER_ROLE',
  UPDATE_USER_ROLE = 'UPDATE_USER_ROLE',
  DELETE_USER_ROLE = 'DELETE_USER_ROLE',

  READ_ACTION = 'READ_ACTION',

  EXPORT_REPORT_DATA = 'EXPORT_REPORT_DATA',

  CREATE_DEVICE = 'CREATE_DEVICE',
  READ_DEVICE = 'READ_DEVICE',
  FIND_DEVICE = 'FIND_DEVICE',
  UPDATE_DEVICE = 'UPDATE_DEVICE',
  DELETE_DEVICE = 'DELETE_DEVICE',
  DEACTIVATE_DEVICE = 'DEACTIVATE_DEVICE',

  READ_DEVICE_DATA = 'READ_DEVICE_DATA',
  READ_DEVICE_EVENT = 'READ_DEVICE_EVENT',
  READ_DEVICE_STATUS = 'READ_DEVICE_STATUS',

  GET_ACTIVATION_CODE = 'GET_ACTIVATION_CODE',

  CREATE_DEVICE_ORDERS = 'CREATE_DEVICE_ORDERS',
  READ_DEVICE_ORDERS = 'READ_DEVICE_ORDERS',
  UPDATE_DEVICE_ORDERS = 'UPDATE_DEVICE_ORDERS',
  DELETE_DEVICE_ORDERS = 'DELETE_DEVICE_ORDERS',

  UPDATE_FIRMWARE_ORDER = 'UPDATE_FIRMWARE_ORDER',

  CREATE_INTERVENTION = 'CREATE_INTERVENTION',
  READ_INTERVENTION = 'READ_INTERVENTION',
  UPDATE_INTERVENTION = 'UPDATE_INTERVENTION',
  DELETE_INTERVENTION = 'DELETE_INTERVENTION',

  CREATE_DEVICE_MODEL = 'CREATE_DEVICE_MODEL',
  READ_DEVICE_MODEL = 'READ_DEVICE_MODEL',
  FIND_DEVICE_MODEL = 'FIND_DEVICE_MODEL',
  UPDATE_DEVICE_MODEL = 'UPDATE_DEVICE_MODEL',
  DELETE_DEVICE_MODEL = 'DELETE_DEVICE_MODEL',

  CREATE_FIRMWARE = 'CREATE_FIRMWARE',
  READ_FIRMWARE = 'READ_FIRMWARE',
  DELETE_FIRMWARE = 'DELETE_FIRMWARE',

  CREATE_ORDER = 'CREATE_ORDER',
  READ_ORDER = 'READ_ORDER',
  DISMISS_ORDER = 'DISMISS_ORDER',

  GET_REPORT_HISTORY = 'GET_REPORT_HISTORY',
  GENERATE_REPORT = 'GENERATE_REPORT',
}

export const PermissionTagKeys = Object.keys(PermissionTag);
export const PermissionTagValues = PermissionTagKeys.map(
  (k) => PermissionTag[k as any],
);

export const permissionsView: PermissionViews = {
  //? Begin Subscriber
  [PermissionTag.CREATE_SUBSCRIBER]: {
    category: 'Subscriber',
    group: 'Subscriber',
    name: 'Create',
  },

  [PermissionTag.READ_SUBSCRIBER]: {
    category: 'Subscriber',
    group: 'Subscriber',
    name: 'Read',
  },

  [PermissionTag.FIND_SUBSCRIBER]: {
    category: 'Subscriber',
    group: 'Subscriber',
    name: 'Find',
  },

  [PermissionTag.UPDATE_SUBSCRIBER]: {
    category: 'Subscriber',
    group: 'Subscriber',
    name: 'Update',
  },

  [PermissionTag.DELETE_SUBSCRIBER]: {
    category: 'Subscriber',
    group: 'Subscriber',
    name: 'Delete',
  },

  [PermissionTag.SET_DEVICE_OWNERSHIP]: {
    category: 'Subscriber',
    group: 'Ownership',
    name: 'Set Device Ownership',
  },

  //! End Subscriber

  //? Begin Employee
  [PermissionTag.CREATE_EMPLOYEE]: {
    category: 'Employee',
    group: 'Employee',
    name: 'Create',
  },

  [PermissionTag.READ_EMPLOYEE]: {
    category: 'Employee',
    group: 'Employee',
    name: 'Read',
  },

  [PermissionTag.UPDATE_EMPLOYEE]: {
    category: 'Employee',
    group: 'Employee',
    name: 'Update',
  },

  [PermissionTag.DELETE_EMPLOYEE]: {
    category: 'Employee',
    group: 'Employee',
    name: 'Delete',
  },

  [PermissionTag.FIND_EMPLOYEE]: {
    category: 'Employee',
    group: 'Employee',
    name: 'Find',
  },

  [PermissionTag.SUSPEND_EMPLOYEE]: {
    category: 'Employee',
    group: 'Suspend',
    name: 'Suspend Employee',
  },

  [PermissionTag.ACTIVATE_EMPLOYEE]: {
    category: 'Employee',
    group: 'Suspend',
    name: 'Activate Employee',
  },

  [PermissionTag.CREATE_ROLE]: {
    category: 'Employee',
    group: 'Role',
    name: 'Create',
  },
  [PermissionTag.READ_ROLE]: {
    category: 'Employee',
    group: 'Role',
    name: 'Read',
  },
  [PermissionTag.FIND_ROLE]: {
    category: 'Employee',
    group: 'Role',
    name: 'Find',
  },
  [PermissionTag.UPDATE_ROLE]: {
    category: 'Employee',
    group: 'Role',
    name: 'Update',
  },
  [PermissionTag.DELETE_ROLE]: {
    category: 'Employee',
    group: 'Role',
    name: 'Delete',
  },
  [PermissionTag.READ_ACTION]: {
    category: 'Employee',
    group: 'Action',
    name: 'Read',
  },

  [PermissionTag.CREATE_USER_ROLE]: {
    category: 'Employee',
    group: 'User Role',
    name: 'Assign Role',
  },

  [PermissionTag.READ_USER_ROLE]: {
    category: 'Employee',
    group: 'User Role',
    name: 'Read',
  },

  [PermissionTag.FIND_USER_ROLE]: {
    category: 'Employee',
    group: 'User Role',
    name: 'Find',
  },

  [PermissionTag.UPDATE_USER_ROLE]: {
    category: 'Employee',
    group: 'User Role',
    name: 'Update',
  },

  [PermissionTag.DELETE_USER_ROLE]: {
    category: 'Employee',
    group: 'User Role',
    name: 'Delete',
  },

  //! End Employee

  //? Begin Report
  [PermissionTag.EXPORT_REPORT_DATA]: {
    category: 'Report',
    group: 'Export Data',
    name: 'Export Data',
  },

  //! End Report

  //? Begin Device
  [PermissionTag.CREATE_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Create',
  },

  [PermissionTag.READ_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Read',
  },
  [PermissionTag.FIND_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Find',
  },
  [PermissionTag.UPDATE_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Update',
  },

  [PermissionTag.DELETE_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Delete',
  },

  [PermissionTag.DEACTIVATE_DEVICE]: {
    category: 'Device',
    group: 'Device',
    name: 'Deactivate',
  },

  [PermissionTag.READ_DEVICE_DATA]: {
    category: 'Device',
    group: 'Device Data',
    name: 'Read',
  },

  [PermissionTag.READ_DEVICE_EVENT]: {
    category: 'Device',
    group: 'Device Event',
    name: 'Read',
  },

  [PermissionTag.READ_DEVICE_STATUS]: {
    category: 'Device',
    group: 'Device Status',
    name: 'Read',
  },

  [PermissionTag.GET_ACTIVATION_CODE]: {
    category: 'Device',
    group: 'Activation',
    name: 'Get Activation Code',
  },

  [PermissionTag.CREATE_DEVICE_ORDERS]: {
    category: 'Device',
    group: 'Device Orders',
    name: 'Create',
  },

  [PermissionTag.READ_DEVICE_ORDERS]: {
    category: 'Device',
    group: 'Device Orders',
    name: 'Read',
  },

  [PermissionTag.UPDATE_DEVICE_ORDERS]: {
    category: 'Device',
    group: 'Device Orders',
    name: 'Update',
  },

  [PermissionTag.DELETE_DEVICE_ORDERS]: {
    category: 'Device',
    group: 'Device Orders',
    name: 'Delete',
  },

  [PermissionTag.UPDATE_FIRMWARE_ORDER]: {
    category: 'Device',
    group: 'Update Firmware Order',
    name: 'Update Firmware Order',
  },

  [PermissionTag.CREATE_ORDER]: {
    category: 'Order',
    group: 'Order',
    name: 'Create',
  },
  [PermissionTag.READ_ORDER]: {
    category: 'Order',
    group: 'Order',
    name: 'Read',
  },

  [PermissionTag.DISMISS_ORDER]: {
    category: 'Order',
    group: 'Order',
    name: 'Dismiss',
  },

  //! End Device

  //? Begin Intervention
  [PermissionTag.CREATE_INTERVENTION]: {
    category: 'Intervention',
    group: 'Interventions',
    name: 'Create',
  },

  [PermissionTag.READ_INTERVENTION]: {
    category: 'Intervention',
    group: 'Interventions',
    name: 'Read',
  },

  [PermissionTag.UPDATE_INTERVENTION]: {
    category: 'Intervention',
    group: 'Interventions',
    name: 'Update',
  },

  [PermissionTag.DELETE_INTERVENTION]: {
    category: 'Intervention',
    group: 'Interventions',
    name: 'Delete',
  },

  //! End Device

  //? Begin Device Model and Firmware
  [PermissionTag.CREATE_DEVICE_MODEL]: {
    category: 'Device Model and Firmware',
    group: 'Device Model',
    name: 'Create',
  },

  [PermissionTag.READ_DEVICE_MODEL]: {
    category: 'Device Model and Firmware',
    group: 'Device Model',
    name: 'Read',
  },

  [PermissionTag.FIND_DEVICE_MODEL]: {
    category: 'Device Model and Firmware',
    group: 'Device Model',
    name: 'Find',
  },

  [PermissionTag.UPDATE_DEVICE_MODEL]: {
    category: 'Device Model and Firmware',
    group: 'Device Model',
    name: 'Update',
  },

  [PermissionTag.DELETE_DEVICE_MODEL]: {
    category: 'Device Model and Firmware',
    group: 'Device Model',
    name: 'Delete',
  },

  [PermissionTag.CREATE_FIRMWARE]: {
    category: 'Device Model and Firmware',
    group: 'Firmware',
    name: 'Create',
  },

  [PermissionTag.READ_FIRMWARE]: {
    category: 'Device Model and Firmware',
    group: 'Firmware',
    name: 'Read',
  },

  [PermissionTag.DELETE_FIRMWARE]: {
    category: 'Device Model and Firmware',
    group: 'Firmware',
    name: 'Delete',
  },

  //! End Device Model and Firmware
  [PermissionTag.GENERATE_REPORT]: {
    category: 'Report',
    group: 'Report',
    name: 'GENERATE',
  },

  [PermissionTag.GET_REPORT_HISTORY]: {
    category: 'Report',
    group: 'Report',
    name: 'READ',
  },

  //? Begin Report

  //! End Report
};
