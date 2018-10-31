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