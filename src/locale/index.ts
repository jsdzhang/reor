import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enUS from '@/locale/en-US'
import zhCN from '@/locale/zh-CN'

const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
}

// eslint-disable-next-line no-void
void i18next
  .use(new LanguageDetector(null, { lookupLocalStorage: 'ai-lng' }))
  .use(initReactI18next)
  .init({
    // debug: true,
    lng: 'zh-CN',
    resources,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  })
  .then((t) => {
    t('common.welcome')
  })

export default i18next
