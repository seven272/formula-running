import {
  RouterLink,
  useActiveVkuiLocation,
} from '@vkontakte/vk-mini-apps-router'
import { TiHomeOutline } from 'react-icons/ti'
import { FaRegUser } from 'react-icons/fa'
import { PiListStarDuotone } from 'react-icons/pi'
import { PiMagicWand } from 'react-icons/pi'
import { TbBrandShopee } from 'react-icons/tb'
import styles from './Menu.module.css'

const Menu = () => {
  const { panel } = useActiveVkuiLocation()

  const MENU_ITEMS = [
    {
      id: 'main_panel',
      to: '/',
      label: 'Главная',
      icon: TiHomeOutline,
    },
    {
      id: 'shop_panel',
      to: '/shop',
      label: 'Магазин планов',
      icon: TbBrandShopee,
    },
    {
      id: 'generate_panel',
      to: '/generate',
      label: 'Создать план',
      icon: PiMagicWand,
    },
    {
      id: 'user_plans_panel',
      to: '/userplans',
      label: 'Мои планы',
      icon: PiListStarDuotone,
    },
    {
      id: 'profile_panel',
      to: '/profile',
      label: 'Профиль',
      icon: FaRegUser,
    },
  ]

  return (
    <ul className={styles.items}>
      {MENU_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = panel === item.id
        return (
          <li
            key={item.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
          >
            <RouterLink to={item.to}>
              <Icon className={styles.icon} />
              {item.label}
            </RouterLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
