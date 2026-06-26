import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon-512.png', 'pwa-icon-maskable-512.png'],
      manifest: {
        name: 'Pocket MedCalc — 臨床醫學計算機',
        short_name: 'MedCalc',
        description: '專為醫護人員設計的臨床計算與風險評估工具。離線可用，涵蓋心臟、腎臟、胸腔等 21 個科別共 218+ 個計算機。',
        theme_color: '#faf8f5',
        background_color: '#faf8f5',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/Pocket_medicine_calculator/',
        start_url: '/Pocket_medicine_calculator/',
        categories: ['medical', 'health', 'education'],
        icons: [
          {
            src: 'pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [],
        shortcuts: [
          {
            name: 'CHA₂DS₂-VASc 評分',
            short_name: 'CHA₂DS₂-VASc',
            url: '/Pocket_medicine_calculator/',
            icons: [{ src: 'pwa-icon-512.png', sizes: '512x512' }]
          }
        ]
      },
      workbox: {
        // Precache all static assets for complete offline support
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Cache Google Fonts for offline use
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/Pocket_medicine_calculator/',
})
