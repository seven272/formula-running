import { createHashRouter } from '@vkontakte/vk-mini-apps-router'

const routers = [
  {
    path: '/',
    panel: 'main_panel',
    view: 'main_view',
  },
  {
    path: '/info',
    panel: 'info_list_panel',
    view: 'main_view',
  },
  {
    path: '/info/:alias',
    panel: 'info_panel',
    view: 'main_view',
  },
  {
    path: '/shop',
    panel: 'shop_panel',
    view: 'main_view',
  },
  {
    path: '/shop/plan/:id',
    panel: 'details_plan_panel',
    view: 'main_view',
  },
  {
    path: '/plan',
    panel: 'plan_panel',
    view: 'main_view',
  },
  {
    path: '/userplans',
    panel: 'user_plans_panel',
    view: 'main_view',
  },
  {
    path: '/userplans/:url',
    panel: 'user_plan_panel',
    view: 'main_view',
  },
   {
    path: '/userplans/edit/:url',
    panel: 'user_plan_edit_panel',
    view: 'main_view',
  },
  {
    path: '/statistic',
    panel: 'statistic_panel',
    view: 'main_view',
  },
  {
    path: '/profile',
    panel: 'profile_panel',
    view: 'main_view',
  },
  {
    path: '/auth',
    panel: 'auth_panel',
    view: 'main_view',
  },
  {
    path: '/admin',
    panel: 'admin_panel',
    view: 'main_view',
  },
  {
    path: '/generate',
    panel: 'generate_panel',
    view: 'main_view',
  },
  {
    path: '/status',
    panel: 'status_panel',
    view: 'main_view',
  },
]

const router = createHashRouter(routers)

export default router
