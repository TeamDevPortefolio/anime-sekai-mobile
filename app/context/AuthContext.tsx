import { createContext, useContext, useState } from 'react';

type AuthContextType = {
    user: any | null;
    login: (data: any) => Promise<void>;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any | null>(null);
    const login = async (data: any) => {
        setUser(data.user)

    }
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}

        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };