import { useNavigate, useLocation } from "react-router-dom";

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    navigate(location?.state?.from || "/", { replace: true }); // ✅ تابعی که استفاده می‌کنیم برمی‌گردونه.
  };
};