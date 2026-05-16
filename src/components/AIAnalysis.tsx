import Anthropic from '@anthropic-ai/sdk'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'

const client = new Anthropic({
	apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
	dangerouslyAllowBrowser: true,
})

type AIAnalysisProps = {
	title: string | null
	author: string | null
}

function AIAnalysis({
	title,
	author
} : AIAnalysisProps) {

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [analysis, setAnalysis] = useState<string | null>(null)

	const handleAnalysis = async () => {
		try {
			setIsLoading(true)
			setError(null)
			const message = await client.messages.create({
				model: 'claude-sonnet-4-6',
				max_tokens: 1024,
				messages: [
					{
						role: 'user',
						content: `Describe the book ${title} by ${author} to someone who has never read it, and explain why they should read it based on their likely tastes and, more generally, on the book's universally recognized value (if it has any), or why, for the same reason, they should not read it.`,
					},
				],
			})
			const content = message.content[0]
			if (content.type === 'text') {
				setAnalysis(content.text)
			}
		} catch(err) {
			setError(`Something went wrong while loading: ${err}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			{error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
			{analysis && (
			<ReactMarkdown>{analysis}</ReactMarkdown>
			)}
			<Button
				className="analyse-button w-full"
				onClick={handleAnalysis}
			>{isLoading ? `Loading...` : `Analyse this book`}</Button>
		</>
	)
}
export default AIAnalysis