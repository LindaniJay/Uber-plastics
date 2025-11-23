'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export default function LanguageTestPage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Language Test Page
            </h1>
            <LanguageSwitcher />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Current Language: {language.toUpperCase()}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-300">
                  Navigation
                </h3>
                <ul className="space-y-2 text-green-700 dark:text-green-400">
                  <li>Home: {t('nav.home')}</li>
                  <li>Dashboard: {t('nav.dashboard')}</li>
                  <li>Profile: {t('nav.profile')}</li>
                  <li>Login: {t('nav.login')}</li>
                  <li>Register: {t('nav.register')}</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300">
                  Home Page
                </h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                  <li>Title: {t('home.title')}</li>
                  <li>Subtitle: {t('home.subtitle')}</li>
                  <li>Description: {t('home.description')}</li>
                  <li>Tagline: {t('home.tagline')}</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">
                  Features
                </h3>
                <ul className="space-y-2 text-purple-700 dark:text-purple-400">
                  <li>AI Management: {t('home.features.ai.title')}</li>
                  <li>Reward System: {t('home.features.reward.title')}</li>
                  <li>Analytics: {t('home.features.analytics.title')}</li>
                  <li>Community: {t('home.features.community.title')}</li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-300">
                  User Roles
                </h3>
                <ul className="space-y-2 text-orange-700 dark:text-orange-400">
                  <li>Individual: {t('home.roles.individual.title')}</li>
                  <li>Hub: {t('home.roles.hub.title')}</li>
                  <li>Collector: {t('home.roles.collector.title')}</li>
                  <li>Depot: {t('home.roles.depot.title')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Common Actions
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {t('common.loading')}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {t('common.error')}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {t('common.success')}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {t('common.save')}
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {t('common.cancel')}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Try switching languages using the button above to see the translations change!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



