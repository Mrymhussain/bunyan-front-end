export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function parseToken(token) {
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      const tokenJSON = atob(payload);
  
      return JSON.parse(tokenJSON);
    } catch {
      return null;
    }
  }
  
  export function getUserFromToken() {
    const token = getToken();
  
    return parseToken(token);
  }
  
  export function registerToken(token) {
    localStorage.setItem('token', token);
  }
  
  export function removeToken() {
    localStorage.removeItem('token');
  }