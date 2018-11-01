export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  try {
      localStorage.setItem('authToken', authToken);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
      localStorage.removeItem('authToken');
  } catch (e) {}
};

export const saveReturningUser = () => {
  try {
      localStorage.setItem('returningUser', 'true');
  } catch (e) {}
};

export const loadReturningUser= () => {
  const value = localStorage.getItem('returningUser');
  return JSON.parse(value);
};

export const clearReturningUser = () => {
  try {
    localStorage.removeItem('returningUser');
  } catch (e) {}
};

export const saveInformedUser = () => {
  try {
      localStorage.setItem('informedUser', 'true');
  } catch (e) {}
};

export const loadInformedUser= () => {
  const value = localStorage.getItem('informedUser');
  return JSON.parse(value);
};

export const clearInformedUser = () => {
  try {
    localStorage.removeItem('informedUser');
  } catch (e) {}
};