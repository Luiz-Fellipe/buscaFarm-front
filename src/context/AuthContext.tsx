import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { useToast } from '~/context/ToastContext';

interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
}

interface EmployeePosition {
  name: string;
  id: string;
}
interface Pharmacie {
  id: string;
}

interface Employee {
  id?: string;
  user: User;
  employee_position: EmployeePosition;
}

interface AuthState {
  token: string;
  employee: Employee;
  pharmacie: Pharmacie;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  employee: Employee;
  pharmacie: Pharmacie;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateEmployee(employee: Employee): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
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

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
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
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao realizar o login',
          description:
            'Não foi possivel realizar o login. tente novamente mais tarde',
        });
      }
    },
    [addToast],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@BuscaFarm:token');
    localStorage.removeItem('@BuscaFarm:pharmacie');
    localStorage.removeItem('@BuscaFarm:employee');
    setData({} as AuthState);
  }, []);

  const updateEmployee = useCallback(
    (employee: Employee) => {
      const updatedEmployee = {
        ...data.employee,
        ...employee,
        user: employee.user,
      };

      localStorage.setItem(
        '@BuscaFarm:employee',
        JSON.stringify(updatedEmployee),
      );

      setData({
        token: data.token,
        employee: updatedEmployee,
        pharmacie: data.pharmacie,
      });
    },
    [setData, data.token, data.pharmacie, data.employee],
  );

  return (
    <AuthContext.Provider
      value={{
        employee: data.employee,
        pharmacie: data.pharmacie,
        signIn,
        signOut,
        updateEmployee,
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
