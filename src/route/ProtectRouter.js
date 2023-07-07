import {useRecoilValue} from "recoil";
import userAtom from "../recoil/userAtom";
import {Outlet, Navigate} from "react-router-dom";

const ProtectRouter = () => {
  // const [auth, setAuth] = useRecoilState(userAtom)
  const auth = useRecoilValue(userAtom)

  return<>
    {/* {!auth.isLogin ? <Outlet/> : <Navigate to={'/auth'}/>} */}
    {auth.isLogin ? <Outlet/> : <Navigate to={'/auth'}/>}
  </>
}

export default ProtectRouter
