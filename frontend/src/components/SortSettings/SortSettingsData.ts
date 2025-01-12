import SortFilesByName from '@services/functions/Sort/SortFilesByName.ts'
import { TempFilesList } from '@app/data'

interface SortFunction {
	title: string
	action: () => void
}

export const SortFunctions: SortFunction[] = [
	{ title: 'Name', action: () => {} },
	{ title: 'Size', action: () => {} },
	{ title: 'Date', action: () => {} },
]
