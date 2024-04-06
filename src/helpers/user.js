export function hasRole(userRole, allowedRoles) {
  return allowedRoles.includes(userRole);
}