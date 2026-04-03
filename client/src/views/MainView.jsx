/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@vkontakte/vkui'
import toast, { Toaster } from 'react-hot-toast'

import Main from '../panels/main/Main'
import InfoList from '../panels/info-list/InfoList'
import Info from '../panels/info/Info'
import Shop from '../panels/shop/Shop'
import Plan from '../panels/plan/Plan'
import Profile from '../panels/profile/Profile'
import DetailsPlan from '../panels/details-plan/DetailsPlan'
import UserPlans from '../panels/user-plans/UserPlans'
import Auth from '../panels/auth/Auth'
import Admin from '../panels/admin/Admin'
import Generate from '../panels/generate/Generate'
import UserPlanDetail from '../panels/user-plan-detail/UserPlanDetail'
import UserPlanEdit from '../panels/user-plan-edit/UserPlanEdit'

import { clearToast } from '../redux/slices/toastSlice'

const MainView = ({ activePanel, id }) => {
  const dispatch = useDispatch()

  const { message, type } = useSelector((state) => state.toast)
  useEffect(() => {
    if (message) {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'info':
          toast(message) // Default toast for info
          break
        default:
          toast(message)
      }
      dispatch(clearToast())
    }
  }, [message, type, dispatch])
  return (
    <>
      <View id={id} activePanel={activePanel}>
        <Main id="main_panel" />
        <Shop id="shop_panel" />
        <DetailsPlan id="details_plan_panel" />
        <Plan id="plan_panel" />
        <UserPlans id="user_plans_panel" />
        <Generate id="generate_panel" />
        <InfoList id="info_list_panel" />
        <Info id="info_panel" />
        <Profile id="profile_panel" />
        <Auth id="auth_panel" />
        <Admin id="admin_panel" />
        <UserPlanDetail id="user_plan_panel" />
        <UserPlanEdit id="user_plan_edit_panel" />
      </View>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  )
}

export default MainView
