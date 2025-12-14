export type VoiceStyle = 'calm' | 'excited' | 'child-friendly' | 'deep' | 'female-teacher' | 'default'

export const useTTS = () => {
  const isSupported = computed(() => {
    if (process.client) {
      return 'speechSynthesis' in window;
    }
    return false;
  });

  const isSpeaking = ref(false);
  const currentVoiceStyle = ref<VoiceStyle>('default')
  let currentUtterance: SpeechSynthesisUtterance | null = null;

  const getVoices = (): SpeechSynthesisVoice[] => {
    if (!process.client || !window.speechSynthesis) return []
    return window.speechSynthesis.getVoices()
  }

  const getVoiceForStyle = (style: VoiceStyle): SpeechSynthesisVoice | null => {
    const voices = getVoices()
    if (voices.length === 0) return null

    switch (style) {
      case 'excited':
        return voices.find(v => v.name.includes('Female') || v.name.includes('Zira')) || voices[0]
      case 'calm':
        return voices.find(v => v.name.includes('Male') || v.name.includes('David')) || voices[0]
      case 'child-friendly':
        return voices.find(v => 
          v.name.includes('Samantha') || 
          v.name.includes('Female') ||
          v.name.includes('Google')
        ) || voices[0]
      case 'deep':
        return voices.find(v => 
          v.name.includes('Male') || 
          v.name.includes('David') ||
          v.name.includes('Microsoft')
        ) || voices[0]
      case 'female-teacher':
        return voices.find(v => 
          v.name.includes('Female') || 
          v.name.includes('Zira') ||
          v.name.includes('Samantha')
        ) || voices[0]
      default:
        return voices.find(v => v.lang.startsWith('en') && !v.localService) || voices[0]
    }
  }

  const speakText = (text: string, style: VoiceStyle = 'default') => {
    if (!process.client || !window.speechSynthesis) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Text-to-speech is not supported in this browser');
      }
      return;
    }

    if (!text?.trim()) {
      return;
    }

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text.trim());
    currentVoiceStyle.value = style

    const selectedVoice = getVoiceForStyle(style)
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    switch (style) {
      case 'excited':
        utterance.rate = 1.15
        utterance.pitch = 1.2
        break
      case 'calm':
        utterance.rate = 0.9
        utterance.pitch = 0.95
        break
      case 'child-friendly':
        utterance.rate = 1.05
        utterance.pitch = 1.15
        break
      case 'deep':
        utterance.rate = 0.95
        utterance.pitch = 0.85
        break
      case 'female-teacher':
        utterance.rate = 1.0
        utterance.pitch = 1.1
        break
      default:
        utterance.rate = 1.0
        utterance.pitch = 1.0
    }

    utterance.volume = 1.0;

    utterance.onstart = () => {
      isSpeaking.value = true;
    };

    utterance.onend = () => {
      isSpeaking.value = false;
      currentUtterance = null;
    };

    utterance.onerror = (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('TTS error:', error);
      }
      isSpeaking.value = false;
      currentUtterance = null;
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (process.client && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeaking.value = false;
      currentUtterance = null;
    }
  };

  const pauseSpeaking = () => {
    if (process.client && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  };

  const resumeSpeaking = () => {
    if (process.client && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  };

  if (process.client && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
    };
  }

  if (process.client && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
    }
    if (window.speechSynthesis.getVoices().length === 0) {
      setTimeout(() => {
        getVoices()
      }, 100)
    }
  }

  return {
    isSupported: readonly(isSupported),
    isSpeaking: readonly(isSpeaking),
    currentVoiceStyle: readonly(currentVoiceStyle),
    speakText,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    getAvailableVoices: getVoices,
  };
};
