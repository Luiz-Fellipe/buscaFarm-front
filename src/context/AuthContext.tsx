import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  name: string;
}

interface EmployeePosition {
  name: string;
}

interface Employee {
  user: User;
  employee_position: EmployeePosition;
}

interface AuthState {
  token: string;
  employee: Employee;
  pharmacie: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  employee: Employee;
  pharmacie: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@BuscaFarm:token');
    const pharmacie = localStorage.getItem('@BuscaFarm:pharmacie');
    const employee = localStorage.getItem('@BuscaFarm:employee');

    if (token && pharmacie && employee) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        employee: JSON.parse(employee),
        pharmacie: JSON.parse(pharmacie),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);

      const response = await api.post('sessions/employees', {
        email,
        password,
      });
      const { token, employee } = response.data;
      setData({ token, employee, pharmacie: employee.pharmacie });

      localStorage.setItem('@BuscaFarm:token', token);
      localStorage.setItem(
        '@BuscaFarm:pharmacie',
        JSON.stringify(employee.pharmacie),
      );
      delete employee.pharmacie;
      localStorage.setItem('@BuscaFarm:employee', JSON.stringify(employee));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@BuscaFarm:token');
    localStorage.removeItem('@BuscaFarm:pharmacie');
    localStorage.removeItem('@BuscaFarm:employee');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        employee: data.employee,
        pharmacie: data.pharmacie,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
