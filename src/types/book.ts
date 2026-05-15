export type Book = {
	key: string
	title: string
	author_name?: string[]
	cover_i?: number
	first_publish_year?: number
}

export type BookDetail = {
    title: string
    description?: { type: string; value: string } | string
    covers?: number[]
    first_publish_date?: string
}