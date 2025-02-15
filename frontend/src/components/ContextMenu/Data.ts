export interface Option {
	title: string
	action: (id?: string) => void
	icon: React.FC
}
