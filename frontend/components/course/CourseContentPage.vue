<template>
  <div class="course-content-page">
    <!-- Page Header -->
    <div class="bg-gradient-to-r from-green-500/10 via-transparent to-transparent border-b border-dark-border p-6 md:p-8">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div class="flex-1">
          <div class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500/20 text-green-400 mb-4 border border-green-500/30">
            <svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Page {{ pageNumber }} of {{ totalPages }}
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{{ page.title }}</h1>
        </div>
        
        <!-- TTS Controls -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <button 
            @click="toggleTTS"
            :class="[
              'flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all font-medium',
              isSpeaking
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50'
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50'
            ]"
            :title="isSpeaking ? 'Stop reading' : 'Listen to this page'"
          >
            <svg v-if="!isSpeaking" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            <span class="hidden sm:inline text-sm">{{ isSpeaking ? 'Stop' : 'Listen' }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Page Content -->
    <div class="p-6 md:p-8">
      <div class="course-markdown max-w-none">
        <div v-html="renderedContent" class="course-content-body"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: {
    title: string
    content_md: string
  }
  pageNumber: number
  totalPages: number
}>()

const { speakText, stopSpeaking, isSpeaking } = useTTS()

// Toggle TTS - start speaking or stop if already speaking
const toggleTTS = () => {
  if (isSpeaking.value) {
    stopSpeaking()
  } else {
    speakText(props.page.content_md, 'default')
  }
}

// Simple markdown parser
const parseMarkdown = (text: string): string => {
  if (!text) return ''
  
  let html = text
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Lists
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br>')
  
  // Wrap list items
  html = html.replace(/(<li>.*<\/li>)/gim, (match) => {
    if (!match.includes('<ul>') && !match.includes('<ol>')) {
      return '<ul>' + match + '</ul>'
    }
    return match
  })
  
  // Wrap paragraphs
  html = '<p>' + html + '</p>'
  html = html.replace(/<p><(h[1-6]|ul|ol|pre|blockquote)/gim, '<$1')
  html = html.replace(/<\/(h[1-6]|ul|ol|pre|blockquote)><\/p>/gim, '</$1>')
  html = html.replace(/<p><\/p>/gim, '')
  html = html.replace(/<p>(<li>)/gim, '<ul>$1')
  html = html.replace(/(<\/li>)<\/p>/gim, '$1</ul>')
  
  return html
}

const renderedContent = computed(() => {
  if (!props.page || !props.page.content_md) {
    return '<p class="text-gray-400">Content is being loaded...</p>'
  }
  return parseMarkdown(props.page.content_md)
})

// Stop speaking when component is unmounted
onUnmounted(() => {
  stopSpeaking()
})
</script>

<style scoped>
.course-markdown :deep(h1) {
  @apply text-2xl md:text-3xl font-bold text-white mt-10 mb-5 font-display leading-tight;
  line-height: 1.3;
}

.course-markdown :deep(h2) {
  @apply text-xl md:text-2xl font-bold text-white mt-8 mb-4 font-display leading-tight;
  line-height: 1.35;
}

.course-markdown :deep(h3) {
  @apply text-lg md:text-xl font-semibold text-white mt-7 mb-3 leading-tight;
  line-height: 1.4;
}

.course-markdown :deep(p) {
  @apply text-gray-300 leading-relaxed mb-5 text-base md:text-lg;
  line-height: 1.7;
  color: #d1d5db;
}

.course-markdown :deep(strong) {
  @apply text-white font-semibold;
}

.course-markdown :deep(em) {
  @apply text-gray-200 italic;
}

.course-markdown :deep(ul), .course-markdown :deep(ol) {
  @apply text-gray-300 mb-6 space-y-3 ml-6;
}

.course-markdown :deep(li) {
  @apply leading-relaxed text-base md:text-lg;
  line-height: 1.7;
  color: #d1d5db;
}

.course-markdown :deep(ul li) {
  @apply list-disc;
  padding-left: 0.5rem;
}

.course-markdown :deep(ol li) {
  @apply list-decimal;
  padding-left: 0.5rem;
}

.course-markdown :deep(code) {
  @apply bg-dark-surface text-green-400 px-2 py-1 rounded text-sm font-mono;
  font-size: 0.9em;
  padding: 0.2em 0.4em;
}

.course-markdown :deep(pre) {
  @apply bg-dark-surface p-5 rounded-lg overflow-x-auto mb-6 border border-dark-border;
  line-height: 1.6;
}

.course-markdown :deep(pre code) {
  @apply bg-transparent p-0 text-sm;
  color: #86efac;
}

.course-markdown :deep(blockquote) {
  @apply border-l-4 border-green-500 pl-6 pr-4 py-3 italic text-gray-300 my-6 bg-dark-surface/50 rounded-r;
  line-height: 1.7;
}

.course-markdown :deep(a) {
  @apply text-green-400 hover:text-green-300 underline;
  transition: color 0.2s;
}

.course-markdown :deep(hr) {
  @apply border-dark-border my-8;
  border-width: 1px;
}

.course-markdown :deep(img) {
  @apply rounded-lg my-6 max-w-full h-auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.course-content-body {
  max-width: 100%;
  word-wrap: break-word;
}
</style>

