export const hasPermission = (roles: string[], userRole: string[]): boolean => {
    if(!userRole) return false
    if(!roles) return true
    return userRole.some((role: string) => roles.includes(role));
}