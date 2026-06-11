import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { Layout } from './components/Layout'
import { DynamicCalculator } from './components/DynamicCalculator'
import { calculatorsList, type Calculator } from './calculators/definitions'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  // Set the first calculator in our metadata definitions as the default selected view
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator>(() => {
    return calculatorsList[0] || {
      id: 'empty',
      name: { zh: '無資料', en: 'No Data' },
      subtitle: { zh: '', en: '' },
      category: 'cardiology',
      inputs: [],
      calculate: () => ({ description: { zh: '', en: '' } }),
      reference: '',
      pearls: { zh: [], en: [] },
      mdcalcLink: ''
    };
  })

  return (
    <LanguageProvider>
      <Layout selectedCalculator={selectedCalculator} onSelectCalculator={setSelectedCalculator}>
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCalculator.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="w-full"
            >
              <DynamicCalculator 
                calculator={selectedCalculator} 
                onSelectCalculator={setSelectedCalculator} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>
    </LanguageProvider>
  )
}

export default App
