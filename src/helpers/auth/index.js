export const isLoggedIn = (user) => {
  if (user) return true;
  return false;
}

export const isStaff = (user) => {
  return isLoggedIn(user) && user.is_staff;
}

export const isSuperUser = (user) => {
  return isLoggedIn(user) && user.is_superuser
}
