import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    icon: mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/activities/activities-list',
    label: 'Activities',
    icon: mdiTable,
    permissions: 'READ_ACTIVITIES',
  },
  {
    href: '/contacts/contacts-list',
    label: 'Contacts',
    icon: mdiTable,
    permissions: 'READ_CONTACTS',
  },
  {
    href: '/leads/leads-list',
    label: 'Leads',
    icon: mdiTable,
    permissions: 'READ_LEADS',
  },
  {
    href: '/metrics/metrics-list',
    label: 'Metrics',
    icon: mdiTable,
    permissions: 'READ_METRICS',
  },
  {
    href: '/notes/notes-list',
    label: 'Notes',
    icon: mdiTable,
    permissions: 'READ_NOTES',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    icon: mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    icon: mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/api-docs',
    label: 'Swagger API',
    icon: mdiAccountCircle,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
