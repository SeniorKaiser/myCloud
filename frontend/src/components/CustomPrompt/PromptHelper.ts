import React from 'react'
import { createRoot } from 'react-dom/client'
import CustomPrompt from './CustomPrompt'

const customPrompt = (message: string): Promise<string | null> => {
	return new Promise(resolve => {
		const container = document.createElement('div')
		document.body.appendChild(container)

		const handleClose = (result: string | null) => {
			resolve(result)
			root.unmount()
			document.body.removeChild(container)
		}

		const root = createRoot(container)
		root.render(
			React.createElement(CustomPrompt, { message, onClose: handleClose })
		)
	})
}

export default customPrompt
