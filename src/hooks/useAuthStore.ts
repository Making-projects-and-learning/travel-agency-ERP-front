/** Libraries */
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import { googleLogout } from '@react-oauth/google'

/** API */
import travelAgencyApi from '../api/travelAgencyApi'

/** Store Type */
import type { RootState, AppDispatch } from '../store'

/** Redux toolkit - Slices */
import {
  authCheckingFinish,
  authLogin,
  authLogout,
} from '../store/slices/auth.slice'

import {
  uiCloseProgressBackdrop,
  uiOpenProgressBackdrop,
} from '../store/slices/ui.slice'

export const useAuthStore = () => {
  /** useDispatch setting */
  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  /** useSelector setting */
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  const {
    checking,
    _id,
    name,
    username,
    email,
    description,
    posts,
    friends,
    groups,
    individualRooms,
    likedPosts,
    online,
  } = useAppSelector((state) => state.auth)

  const startLogin = async (username: string, password: string) => {
    try {
      dispatch(uiOpenProgressBackdrop())

      const {
        data: { token, user },
        status,
      } = await travelAgencyApi.post('auth/login', { username, password })

      if (status === 200) {
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime().toString())

        dispatch(authLogin(user))

        dispatch(uiCloseProgressBackdrop())
      } else {
        dispatch(uiCloseProgressBackdrop())
      }
    } catch (error) {
      dispatch(uiCloseProgressBackdrop())
      console.log(error)
    }
  }

  const startRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      console.log(name, email, password)
      // dispatch(uiOpenProgressBackdrop());

      // const { data } = await travelAgencyApi.post("users", {
      //     name,
      //     email,
      //     password,
      // });

      // console.log(data);

      // const { token, user, msg, errors } = data;

      // if (msg === "OK") {
      //     localStorage.setItem("token", token);
      //     localStorage.setItem("token-init-date", new Date().getTime().toString());

      //     // dispatch(
      //     //     authLogin({
      //     //         _id: user._id,
      //     //         name: user.name,
      //     //         email: user.email,
      //     //     })
      //     // );

      //     dispatch(uiCloseProgressBackdrop());
      // } else {
      //     errors !== undefined && console.log(errors);
      //     msg !== undefined && console.log(msg);
      //     dispatch(uiCloseProgressBackdrop());
      // }
    } catch (error) {
      dispatch(uiCloseProgressBackdrop())
      console.log(error)
    }
  }

  const startChecking = async () => {
    if (!localStorage.getItem('token')) return dispatch(authCheckingFinish())

    try {
      const {
        data: { user, token, msg },
        status,
      } = await travelAgencyApi.get('auth/renew')

      if (status === 200) {
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime().toString())

        dispatch(authLogin(user))
      } else {
        if (msg === 'invalid token.') {
          const removeToken = new Promise((resolve, _reject) => {
            resolve(() => {
              localStorage.removeItem('token-init-date')
              localStorage.removeItem('token')
            })
          })

          removeToken.then(() => {
            dispatch(authCheckingFinish())
          })
        } else {
          dispatch(authCheckingFinish())
        }
      }
    } catch (error: any) {
      dispatch(authCheckingFinish())
      console.log(error)
    }
  }

  const startLogout = () => {
    try {
      dispatch(uiOpenProgressBackdrop())

      localStorage.removeItem('token-init-date')
      localStorage.removeItem('token')

      dispatch(authLogout())
      googleLogout()

      setTimeout(() => {
        dispatch(uiCloseProgressBackdrop())
      }, 1500)
    } catch (error) {
      console.log(error)

      setTimeout(() => {
        dispatch(uiCloseProgressBackdrop())
      }, 1500)
    }
  }

  const startGoogleLogin = async (id_token: string) => {
    try {
      dispatch(uiOpenProgressBackdrop())

      const {
        data: { user, token },
        status,
      } = await travelAgencyApi.post('auth/google', { id_token })

      if (status === 200) {
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime().toString())

        dispatch(authLogin(user))

        dispatch(uiCloseProgressBackdrop())
      } else {
        dispatch(uiCloseProgressBackdrop())
      }
    } catch (error) {
      dispatch(uiCloseProgressBackdrop())
      console.log(error)
    }
  }

  return {
    //* Propiedades
    checking,
    _id,
    name,
    username,
    email,
    description,
    posts,
    friends,
    groups,
    individualRooms,
    likedPosts,
    online,

    //* Métodos
    startLogin,
    startRegister,
    startChecking,
    startLogout,
    startGoogleLogin,
  }
}
