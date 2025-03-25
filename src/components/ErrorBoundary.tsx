import React, { ErrorInfo, ReactNode } from 'react'

import { Button } from './ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('错误边界捕获到一个错误:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex items-center justify-center'>
            <h1>糟糕！出现了一些问题。</h1>
            <Button
              onClick={() => {
                window.location.reload()
              }}
              size='sm'
            >
              刷新
            </Button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
