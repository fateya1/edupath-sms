// frontend/src/services/apiService.js
export const apiUrl = import.meta.env.VITE_API_URL; // Using the environment variable

// Example login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data; // return user data or token here
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // You can handle the error as you see fit
  }
};
