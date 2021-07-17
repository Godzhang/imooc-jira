import { createContext, ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/SearchPanel";
import { http } from "utils/http";
import useMount from "hooks/useMount";
import useAsync from "hooks/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) return <FullPageLoading></FullPageLoading>;
  if (isError)
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};
