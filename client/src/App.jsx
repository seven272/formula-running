import { Root, SplitLayout } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { ScreenSpinner } from '@vkontakte/vkui'

import MainView from './views/MainView'
import { getMe, authWithVk } from './redux/slices/authSlice'
import { fetchGetMyProfile } from './redux/slices/userSlice'
import { fetchGetCurrentPlan } from './redux/slices/currentPlanSlice'

const App = () => {
  const { panel, view } = useActiveVkuiLocation()
  const dispatch = useDispatch()
  const isAuthLoading = useSelector((state) => state.auth.isLoading)

  useEffect(() => {
    dispatch(getMe())
    dispatch(authWithVk())
      .unwrap() // unwrap позволяет дождаться успеха
      .then(() => {
        dispatch(fetchGetMyProfile())
        dispatch(fetchGetCurrentPlan())
      })
      .catch((err) => console.error('Ошибка входа:', err))
  }, [dispatch])

  if (isAuthLoading) {
    return <ScreenSpinner size="large" />
  }

  return (
    <div className="app">
      <SplitLayout>
        <Root activeView={view}>
          <MainView id="main_view" activePanel={panel} />
        </Root>
      </SplitLayout>
    </div>
  )
}

export default App
