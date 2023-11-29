export function utilsSeperateEmailFromUsername(email) {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  }
  return email;
}
