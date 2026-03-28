import { Root, SplitLayout } from '@vkontakte/vkui'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'

import MainView from './views/MainView'
import { getMe, authWithVk } from './redux/slices/authSlice'
import {
  loadVkPersona,
  fetchGetMyProfile,
} from './redux/slices/userSlice'
import { dataUserVK } from './assets/data/vk-mock'

const App = () => {
  const { panel, view } = useActiveVkuiLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
    dispatch(loadVkPersona(dataUserVK))
    dispatch(fetchGetMyProfile())
    dispatch(authWithVk())
  }, [dispatch])

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
