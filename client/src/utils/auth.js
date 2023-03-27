// import decode from "jwt-decode";

class AuthService {
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }
}

export default new AuthService();
