import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import AnalyticsSettings from './AnalyticsSettings'
import EmbeddingModelSettings from './EmbeddingSettings/EmbeddingSettings'
import GeneralSettings from './GeneralSettings'

import LLMSettingsContent from './LLMSettings/LLMSettingsContent'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: SettingsTab
}

export enum SettingsTab {
  GeneralSettingsTab = 'generalSettings',
  LLMSettingsTab = 'llmSettings',
  EmbeddingModelTab = 'embeddingModel',
  AnalyticsTab = 'analytics',
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose: onCloseFromParent,
  initialTab = SettingsTab.GeneralSettingsTab,
}) => {
  const { t } = useTranslation()
  const [willNeedToReIndex, setWillNeedToReIndex] = useState(false)
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleSave = () => {
    if (willNeedToReIndex) {
      window.database.indexFilesInDirectory()
    }
    onCloseFromParent()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleSave()
      }}
    >
      <DialogContent className="border-none bg-transparent p-0 [&>button]:hidden">
        <div className="flex h-[80vh] w-[80vw] md:w-[70vw] lg:w-[50vw]">
          <div className="flex w-[150px] flex-col rounded-l-lg border-y-0 border-l-0 border-r-[0.1px] border-solid border-gray-700 bg-dark-gray-c-seven p-2 text-white">
            <div
              className={`mt-2 flex cursor-pointer items-center rounded border-b border-gray-200 p-2 text-sm hover:bg-neutral-600 ${
                activeTab === SettingsTab.GeneralSettingsTab
                  ? 'bg-neutral-700 font-semibold text-white'
                  : 'text-gray-200'
              }`}
              onClick={() => setActiveTab(SettingsTab.GeneralSettingsTab)}
            >
              {t('setting.editor')}
            </div>
            <div
              className={`flex cursor-pointer items-center rounded border-b border-gray-200 p-2 text-sm hover:bg-neutral-600 ${
                activeTab === SettingsTab.LLMSettingsTab ? 'bg-neutral-700 font-semibold text-white' : 'text-gray-200'
              }`}
              onClick={() => setActiveTab(SettingsTab.LLMSettingsTab)}
            >
              {t('setting.llm')}
            </div>
            <div
              className={`flex cursor-pointer items-center rounded border-b border-gray-200 p-2 text-sm hover:bg-neutral-600 ${
                activeTab === SettingsTab.EmbeddingModelTab
                  ? 'bg-neutral-700 font-semibold text-white'
                  : 'text-gray-200'
              }`}
              onClick={() => setActiveTab(SettingsTab.EmbeddingModelTab)}
            >
              {t('setting.embedding')}
            </div>
            <div
              className={`flex cursor-pointer items-center rounded border-b border-gray-200 p-2 text-sm hover:bg-neutral-600 ${
                activeTab === SettingsTab.AnalyticsTab ? 'bg-neutral-700 font-semibold text-white' : 'text-gray-200'
              }`}
              onClick={() => setActiveTab(SettingsTab.AnalyticsTab)}
            >
              {t('setting.analytics')}
            </div>
          </div>

          <div className="w-full flex-1 overflow-y-auto rounded-r-lg bg-dark-gray-c-three px-4">
            {activeTab === SettingsTab.GeneralSettingsTab && <GeneralSettings />}
            {activeTab === SettingsTab.LLMSettingsTab && <LLMSettingsContent />}
            {activeTab === SettingsTab.EmbeddingModelTab && (
              <EmbeddingModelSettings handleUserHasChangedModel={() => setWillNeedToReIndex(true)} />
            )}
            {activeTab === SettingsTab.AnalyticsTab && <AnalyticsSettings />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsModal
