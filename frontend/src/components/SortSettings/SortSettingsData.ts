import { Signature, Clock, File } from '@components/Icons/Icons'

interface SortFunction {
	title: string
	action: () => void
	icon: React.FC | undefined
}

export const SortFunctions: SortFunction[] = [
	{ title: 'Name', action: () => {}, icon: Signature },
	{ title: 'Size', action: () => {}, icon: File },
	{ title: 'Date', action: () => {}, icon: Clock },
]
