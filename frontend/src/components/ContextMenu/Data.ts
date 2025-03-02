export interface Option {
	title: string
	action: (id?: string) => void
	icon: React.FC
}

export interface Position {
	position: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static'
	top?: string | undefined
	left?: string | undefined
	right?: string | undefined
	bottom?: string | undefined
}

export interface ContextMenuState {
	visible: boolean
	position: Position
	options: Option[]
}
