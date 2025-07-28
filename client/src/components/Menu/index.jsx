import { Revoke } from '@react-vant/icons'
import styles from './index.module.less'
import logo from '../../assets/img/avatar.png'
import { FriendsO, BarChartO, createFromIconfontCN } from '@react-vant/icons'

const IconFont = createFromIconfontCN('https://at.alicdn.com/t/c/font_4985745_npx0gei8p4.js')

export default function Menu({ setShowMenu }) {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className={styles['menu-wrapper']}>
      <div className={styles['menu-back']}>
        <Revoke onClick={() => setShowMenu(false)} />
      </div>

      <section className={styles['menu-content']}>
        <div className={styles['menu-avatar']}>
          <img src={logo} alt="" />
        </div>
        <p className={styles['menu-avatar-name']}>
          你好，<span>{user? user.nickname: '用户'}</span>
        </p>
        <ul className={styles['menu-list']}>
          <li className={styles['menu-list-item']}>
            <FriendsO />
            <span>个人中心</span>
          </li>
          <li className={styles['menu-list-item']}>
            <BarChartO />
            <span>日记统计</span>
          </li>
          <li className={styles['menu-list-item']}>
            <IconFont name='icon-yejianmoshi' />
            <span>夜间模式</span>
          </li>
          <li className={styles['menu-list-item']}>
            <IconFont name='icon-tuichudenglu' />
            <span>退出登录</span>
          </li>
        </ul>
      </section>
    </div>
  )
}