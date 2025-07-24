import React from 'react'
import style from './index.module.less'

const obj = {
  msg: '登录成功',
  type: 'success',
  duration: 2000,
  onClose: () => {},
}

export default function Toast() {
  const { msg, type, duration, onClose } = obj

  const timer = setTimeout(() => {
    onClose()
    clearTimeout(timer)
  }, duration)

  const newToastObj = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value
      return true
    }
  })

  return (
    <div>
      <div className={style.toast}>
        <div className={style['toast-content']}>
          <div className={style['toast-icon']}>{type === 'success' ? '√' : '✘'}</div>
          <div className={style['toast-text']}>{msg}</div>
        </div>
      </div>
    </div>
  )
}
