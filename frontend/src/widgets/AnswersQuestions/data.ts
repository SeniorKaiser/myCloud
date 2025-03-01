interface Question {
	question: string
	answer: string
}

export const questionList: Question[] = [
	{
		question: 'How much storage is available for free?',
		answer:
			'We provide 20 GB of free storage for all users. You can expand the volume by subscribing.',
	},
	{
		question: 'What types of files can be uploaded?',
		answer:
			'Our service supports downloading most popular file formats, including documents, images, videos, and archives.',
	},
	{
		question: 'How secure is the storage?',
		answer:
			'All files are protected using end-to-end encryption, and access to the data is carried out only with your permission.',
	},
	{
		question: 'Are there any restrictions on the size of uploaded files?',
		answer: 'The maximum size of the uploaded file is 5GB for all',
	},
	{
		question: 'How can I access files from another device?',
		answer:
			'You can log into your account via a web browser to access your files at any time and from any device.',
	},
]
