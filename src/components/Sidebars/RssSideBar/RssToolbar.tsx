import React from 'react'
import { useModalOpeners } from '@/contexts/ModalContext'

const RssToolbar: React.FC = () => {
  const { setIsNewRssModalOpen } = useModalOpeners()

  return (
    <div className="mb-4 flex flex-col gap-6">
      <button
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md 
                      border-0 bg-blue-500 py-3 text-white
                      shadow-md transition-colors duration-200 hover:bg-blue-400 hover:text-gray-200
                      hover:shadow-lg"
        type="button"
        onClick={() => setIsNewRssModalOpen(true)}
      >
        <span className="text-xs font-bold">New RSS</span>
      </button>
    </div>
  )
}

export default RssToolbar
