/*
 Copyright Fedyakov Mikhail  2025
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const container = document.getElementById('root')
const queryClient = new QueryClient

if (container) {
	const root = createRoot(container)

	root.render(
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	)
}

