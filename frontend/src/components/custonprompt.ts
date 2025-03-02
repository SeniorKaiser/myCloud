export const customPrompt = (message: string): Promise<string | null> => {
	return new Promise(resolve => {
		const modal = document.createElement('div')
		modal.style.position = 'fixed'
		modal.style.top = '0'
		modal.style.left = '0'
		modal.style.width = '100vw'
		modal.style.height = '100vh'
		modal.style.background = 'rgba(0, 0, 0, 0.5)'
		modal.style.display = 'flex'
		modal.style.alignItems = 'center'
		modal.style.justifyContent = 'center'
		modal.style.zIndex = '1000'

		const dialog = document.createElement('div')
		dialog.style.background = 'white'
		dialog.style.padding = '20px'
		dialog.style.borderRadius = '8px'
		dialog.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
		dialog.style.display = 'flex'
		dialog.style.flexDirection = 'column'
		dialog.style.gap = '10px'

		const text = document.createElement('p')
		text.textContent = message

		const input = document.createElement('input')
		input.type = 'text'
		input.style.padding = '8px'
		input.style.border = '1px solid #ccc'
		input.style.borderRadius = '4px'

		const buttons = document.createElement('div')
		buttons.style.display = 'flex'
		buttons.style.justifyContent = 'flex-end'
		buttons.style.gap = '10px'

		const cancelButton = document.createElement('button')
		cancelButton.textContent = 'Отмена'
		cancelButton.style.padding = '8px 12px'
		cancelButton.style.border = 'none'
		cancelButton.style.background = '#ccc'
		cancelButton.style.borderRadius = '4px'
		cancelButton.style.cursor = 'pointer'

		const confirmButton = document.createElement('button')
		confirmButton.textContent = 'ОК'
		confirmButton.style.padding = '8px 12px'
		confirmButton.style.border = 'none'
		confirmButton.style.background = '#007bff'
		confirmButton.style.color = 'white'
		confirmButton.style.borderRadius = '4px'
		confirmButton.style.cursor = 'pointer'

		buttons.appendChild(cancelButton)
		buttons.appendChild(confirmButton)
		dialog.appendChild(text)
		dialog.appendChild(input)
		dialog.appendChild(buttons)
		modal.appendChild(dialog)
		document.body.appendChild(modal)

		const closeModal = (result: string | null) => {
			document.body.removeChild(modal)
			resolve(result)
		}

		cancelButton.onclick = () => closeModal(null)
		confirmButton.onclick = () => closeModal(input.value)
		input.onkeydown = e => {
			if (e.key === 'Enter') closeModal(input.value)
			if (e.key === 'Escape') closeModal(null)
		}

		input.focus()
	})
}
