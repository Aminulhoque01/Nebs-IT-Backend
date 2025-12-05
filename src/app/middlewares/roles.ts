export type Role = 'admin' | 'user';

const allRoles: Record<Role, string[]> = {
  admin: ['admin', 'common'],
  user: ['user', 'common']
};

const roles = Object.keys(allRoles) as Array<keyof typeof allRoles>;

// Map the roles to their corresponding rights
const roleRights = new Map<Role, string[]>(
  Object.entries(allRoles) as [Role, string[]][]
);

export { roles, roleRights };
