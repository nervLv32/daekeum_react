import {useRecoilState} from "recoil";
import userAtom from "../recoil/userAtom";
import {Outlet, Navigate} from "react-router-dom";

const ProtectRouter = () => {
  const [auth, setAuth] = useRecoilState(userAtom)

  console.log('tet')

  return<>
    {!auth.isLogin ? <Outlet/> : <Navigate to={'/auth'}/>}
  </>
}

export default ProtectRouter
