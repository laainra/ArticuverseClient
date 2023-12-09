const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

const handleLogin = async (email, password) => {
  try {
      const response = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const userId = data.user_id; 
          const role = data.role; 
    
          // Save token and user ID to localStorage for subsequent authentication
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);

          console.log(localStorage);

          // Redirect to the admin or profile page based on user role
          if (role==="admin") {
              window.location.href = "/admin/dashboard";
          } else {
              window.location.href = "/profile";
          }

          // Save token to localStorage for subsequent authentication
          localStorage.setItem('token', token);
      } else {
          // Handle errors, show a message, or take other actions
          alert("Login failed. Check your credentials and try again.");
      }
  } catch (error) {
      console.error("Error during login:", error);
  }
};

export { handleLogin , isAuthenticated};
