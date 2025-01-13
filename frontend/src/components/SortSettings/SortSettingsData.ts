interface SortFunction {
	title: string
	action: () => void
}

export const SortFunctions: SortFunction[] = [
	{ title: 'Name', action: () => {} },
	{ title: 'Size', action: () => {} },
	{ title: 'Date', action: () => {} },
]
