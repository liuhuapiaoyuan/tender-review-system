export function EditorSkeleton() {
  return (
    <div className='h-full w-full  overflow-hidden flex flex-col'>
      <div className='flex-1 relative py-5 h-1 w-full flex justify-center bg-[#e3e9ed] shadow-lg'>
        <div className='w-full max-w-4xl p-6 bg-white rounded-lg shadow-md flex flex-col items-center'>
          {/* 加载动画 */}

          <div className='flex items-center justify-center mb-8 mt-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary'></div>

            <span className='ml-3 text-base font-medium text-gray-700'>文档加载中...</span>
          </div>

          {/* 文档预览骨架屏 */}

          <div className='w-full max-w-2xl mx-auto space-y-6'>
            {/* 文件头部 - 类似图片中的文件编号 */}

            <div className='flex justify-end'>
              <div className='h-5 bg-gray-200 rounded w-1/4 animate-pulse'></div>
            </div>

            {/* 文档标题骨架 - 类似图片中的红头文件标题 */}

            <div className='h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse mt-8'></div>

            {/* 文档副标题骨架 - 类似图片中的文件说明 */}

            <div className='h-5 bg-gray-200 rounded w-11/12 mx-auto animate-pulse mt-2'></div>

            <div className='h-5 bg-gray-200 rounded w-10/12 mx-auto animate-pulse'></div>

            {/* 文档正文骨架 - 类似图片中的文件内容 */}

            <div className='space-y-3 mt-10'>
              <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>

              <div className='h-4 bg-gray-200 rounded w-11/12 animate-pulse'></div>

              <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>

              <div className='h-4 bg-gray-200 rounded w-10/12 animate-pulse'></div>

              <div className='h-4 bg-gray-200 rounded w-full animate-pulse'></div>
            </div>

            {/* 文档落款骨架 - 类似图片中的落款日期 */}

            <div className='flex flex-col items-start mt-12 ml-16'>
              <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse'></div>

              <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse mt-2'></div>
            </div>
          </div>

          <p className='mt-8 text-sm text-gray-500'>正在准备文件，请稍候...</p>
        </div>
      </div>

      {/* 模拟底部工具栏 */}

      <div className='h-12 border-t border-gray-200 bg-white'></div>
    </div>
  )
}
