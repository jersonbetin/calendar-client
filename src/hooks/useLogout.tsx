import { useRouter } from "next/navigation";
import cookies from "js-cookie";

import { TOKEN_COOKIE } from "@utils/constants";

const useLogout = () => {
  const { push } = useRouter();
  const logout = () => {
    cookies.remove(TOKEN_COOKIE);

    push('/');
  };

  return { logout };
};

export default useLogout;
