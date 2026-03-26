const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT PARSE ERROR:", e);
    return null;
  }
};

const testAPI = async () => {
    try {
        const response2 = await fetch('http://localhost:5207/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: 'test2q2@test.com',
                Password: 'Password123!',
                Role: 'USER'
            })
        });
        const text2 = await response2.text();
        const data = JSON.parse(text2);
        
        if (data.data?.token) {
            const token = data.data.token;
            console.log("Token:", token);
            const decoded = parseJwt(token);
            console.log("Decoded:", decoded);
            
            const actualRole = decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                              || decoded?.role 
                              || decoded?.Role;
            console.log("EXTRACTED ROLE:", actualRole);
        }
    } catch (e) { console.error(e); }
}
testAPI();
