import type { ComponentType } from 'react'

export interface QuestionFaq {
  question: string
  reponse: string
}

export interface ContenuArticle {
  Corps: ComponentType
  faq?: QuestionFaq[]
}
