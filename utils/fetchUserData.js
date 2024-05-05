export async function fetchUserData(email) {
    try {
      const response = await fetch("/api/creator/getcreator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Assuming you need to send some data to the API, modify this accordingly
        body: JSON.stringify({ email : email}),
      });
  
      if (!response.ok) {
        // Handle error response from the server
        throw new Error("Failed to fetch user data");
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Assuming the user data is nested under 'creator' in the response
      return data.creator;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error appropriately, e.g., return a default user object or re-throw the error
      throw error;
    }
  }
  