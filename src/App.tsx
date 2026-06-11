import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { Layout } from './components/Layout'
import { ChadsVasc } from './calculators/ChadsVasc'
import { FeNa } from './calculators/FeNa'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [activeTab, setActiveTab] = useState<'cardiology' | 'nephrology'>('cardiology')

  return (
    <LanguageProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="w-full"
            >
              {activeTab === 'cardiology' ? <ChadsVasc /> : <FeNa />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>
    </LanguageProvider>
  )
}

export default App
