import React from 'react'
interface User {
    // Add properties representing your user data (e.g., name, email, ID)
    firstName: string;
    lastName:string;
    email: string;
    id: string; // Example properties
  }
  
  // Create a Context with the User interface type
  const UserContext = React.createContext<User | null>(null);
  
  const UserProvider = ({ children, userData }: { children: React.ReactNode; userData: User }) => {
    return (
      <UserContext.Provider value={userData}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export { UserContext, UserProvider };
  