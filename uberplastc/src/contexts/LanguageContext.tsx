'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'sw' | 'pt'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Home page
    'home.title': 'Uber Plastic',
    'home.subtitle': 'Sustainable Waste Management',
    'home.description': 'Transform waste into value through technology',
    'home.tagline': 'Advanced Circular Economy Platform',
    'home.impact.title': 'Environmental Impact of Plastic Bottle Waste',
    'home.impact.bottles': 'Bottles Collected',
    'home.impact.bottles.desc': 'Prevented from ocean',
    'home.impact.co2': 'CO₂ Emissions Prevented',
    'home.impact.co2.desc': 'Equivalent to 400 cars',
    'home.impact.ocean': 'Ocean Pollution Reduced',
    'home.impact.ocean.desc': 'Plastic waste diverted',
    'home.impact.energy': 'Energy Saved',
    'home.impact.energy.desc': 'From recycling process',
    'home.impact.decompose': 'Years to decompose',
    'home.impact.decompose.desc': 'Time saved per bottle',
    'home.impact.efficient': 'More efficient',
    'home.impact.efficient.desc': 'Than traditional recycling',
    'home.impact.traceable': 'Traceable impact',
    'home.impact.traceable.desc': 'Every bottle tracked',
    'home.access': 'Access Platform',
    'home.analytics': 'View Analytics',
    'home.features.title': 'Platform Features',
    'home.features.subtitle': 'Advanced technology for sustainable waste management',
    'home.features.ai.title': 'AI Waste Management',
    'home.features.ai.desc': 'Smart collection and processing systems with real-time tracking',
    'home.features.reward.title': 'Reward System',
    'home.features.reward.desc': 'Financial incentives for proper waste disposal and recycling',
    'home.features.analytics.title': 'Analytics Dashboard',
    'home.features.analytics.desc': 'Data insights to measure and optimize environmental impact',
    'home.features.community.title': 'Community Platform',
    'home.features.community.desc': 'Connect individuals and organizations in waste management',
    'home.roles.title': 'Choose Your Role',
    'home.roles.subtitle': 'Whether you\'re an individual, organization, collector, or depot - we have you covered',
    'home.roles.individual.title': 'Eco Citizen',
    'home.roles.individual.desc': 'Join the ecosystem restoration movement and track your environmental impact',
    'home.roles.hub.title': 'Eco Hub',
    'home.roles.hub.desc': 'Transform your business into an ecosystem-positive organization and collection hub',
    'home.roles.collector.title': 'Eco Collector',
    'home.roles.collector.desc': 'Be the bridge between waste and ecosystem restoration',
    'home.roles.depot.title': 'Eco Processing Center',
    'home.roles.depot.desc': 'Transform waste into ecosystem resources and biodiversity support',
    'home.getStarted': 'Get Started',
    'home.join.title': 'Join Our Initiative',
    'home.join.subtitle': 'Technology-driven waste management for sustainable impact',
    'home.join.getStarted': 'Get Started',
    'home.join.viewData': 'View Impact Data',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.dashboard': 'Dashibodi',
    'nav.profile': 'Wasifu',
    'nav.logout': 'Ondoka',
    'nav.login': 'Ingia',
    'nav.register': 'Jisajili',
    
    // Home page
    'home.title': 'Uber Plastic',
    'home.subtitle': 'Usimamizi wa Taka Endelevu',
    'home.description': 'Badilisha taka kuwa thamani kupitia teknolojia',
    'home.tagline': 'Jukwaa la Uchumi wa Mzunguko wa Juu',
    'home.impact.title': 'Athari ya Mazingira ya Taka za Chupa za Plastiki',
    'home.impact.bottles': 'Chupa Zilizokusanywa',
    'home.impact.bottles.desc': 'Zilizozuiwa kutoka baharini',
    'home.impact.co2': 'Uzalishaji wa CO₂ Uliozuiliwa',
    'home.impact.co2.desc': 'Sawa na magari 400',
    'home.impact.ocean': 'Uchafuzi wa Bahari Ulioongezwa',
    'home.impact.ocean.desc': 'Taka za plastiki zilizoelekezwa',
    'home.impact.energy': 'Nishati Iliyohifadhiwa',
    'home.impact.energy.desc': 'Kutoka mchakato wa kuchakata',
    'home.impact.decompose': 'Miaka ya kuharibika',
    'home.impact.decompose.desc': 'Muda uliohifadhiwa kwa kila chupa',
    'home.impact.efficient': 'Ufanisi zaidi',
    'home.impact.efficient.desc': 'Kuliko kuchakata kwa kawaida',
    'home.impact.traceable': 'Athari inayoweza kufuatwa',
    'home.impact.traceable.desc': 'Kila chupa inafuatwa',
    'home.access': 'Fikia Jukwaa',
    'home.analytics': 'Ona Takwimu',
    'home.features.title': 'Vipengele vya Jukwaa',
    'home.features.subtitle': 'Teknolojia ya juu ya usimamizi wa taka endelevu',
    'home.features.ai.title': 'Usimamizi wa Taka wa AI',
    'home.features.ai.desc': 'Mifumo ya ukusanyaji na usindikaji wa akili na ufuatiliaji wa wakati halisi',
    'home.features.reward.title': 'Mfumo wa Malipo',
    'home.features.reward.desc': 'Motisha za kifedha za utupaji sahihi wa taka na kuchakata',
    'home.features.analytics.title': 'Dashibodi ya Takwimu',
    'home.features.analytics.desc': 'Ufahamu wa data wa kupima na kuboresha athari ya mazingira',
    'home.features.community.title': 'Jukwaa la Jamii',
    'home.features.community.desc': 'Unganisha watu binafsi na mashirika katika usimamizi wa taka',
    'home.roles.title': 'Chagua Jukumu Lako',
    'home.roles.subtitle': 'Iwe wewe ni mtu binafsi, shirika, mkusanyaji, au kituo - tumekufunika',
    'home.roles.individual.title': 'Mwananchi wa Mazingira',
    'home.roles.individual.desc': 'Jiunge na harakati ya kurejesha mfumo wa mazingira na ufuatilie athari yako ya mazingira',
    'home.roles.hub.title': 'Kituo cha Mazingira',
    'home.roles.hub.desc': 'Badilisha biashara yako kuwa shirika la mazingira chanya na kituo cha ukusanyaji',
    'home.roles.collector.title': 'Mkusanyaji wa Mazingira',
    'home.roles.collector.desc': 'Kuwa daraja kati ya taka na kurejesha mfumo wa mazingira',
    'home.roles.depot.title': 'Kituo cha Usindikaji wa Mazingira',
    'home.roles.depot.desc': 'Badilisha taka kuwa rasilimali za mfumo wa mazingira na msaada wa bioanuwai',
    'home.getStarted': 'Anza',
    'home.join.title': 'Jiunge na Mpango Wetu',
    'home.join.subtitle': 'Usimamizi wa taka unaoendeshwa na teknolojia kwa athari endelevu',
    'home.join.getStarted': 'Anza',
    'home.join.viewData': 'Ona Data ya Athari',
    
    // Common
    'common.loading': 'Inapakia...',
    'common.error': 'Hitilafu',
    'common.success': 'Mafanikio',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.close': 'Funga',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.dashboard': 'Painel',
    'nav.profile': 'Perfil',
    'nav.logout': 'Sair',
    'nav.login': 'Entrar',
    'nav.register': 'Registrar',
    
    // Home page
    'home.title': 'Uber Plastic',
    'home.subtitle': 'Gestão Sustentável de Resíduos',
    'home.description': 'Transforme resíduos em valor através da tecnologia',
    'home.tagline': 'Plataforma de Economia Circular Avançada',
    'home.impact.title': 'Impacto Ambiental dos Resíduos de Garrafas Plásticas',
    'home.impact.bottles': 'Garrafas Coletadas',
    'home.impact.bottles.desc': 'Prevenidas do oceano',
    'home.impact.co2': 'Emissões de CO₂ Prevenidas',
    'home.impact.co2.desc': 'Equivalente a 400 carros',
    'home.impact.ocean': 'Poluição Oceânica Reduzida',
    'home.impact.ocean.desc': 'Resíduos plásticos desviados',
    'home.impact.energy': 'Energia Economizada',
    'home.impact.energy.desc': 'Do processo de reciclagem',
    'home.impact.decompose': 'Anos para decompor',
    'home.impact.decompose.desc': 'Tempo economizado por garrafa',
    'home.impact.efficient': 'Mais eficiente',
    'home.impact.efficient.desc': 'Que reciclagem tradicional',
    'home.impact.traceable': 'Impacto rastreável',
    'home.impact.traceable.desc': 'Cada garrafa rastreada',
    'home.access': 'Acessar Plataforma',
    'home.analytics': 'Ver Análises',
    'home.features.title': 'Recursos da Plataforma',
    'home.features.subtitle': 'Tecnologia avançada para gestão sustentável de resíduos',
    'home.features.ai.title': 'Gestão de Resíduos com IA',
    'home.features.ai.desc': 'Sistemas inteligentes de coleta e processamento com rastreamento em tempo real',
    'home.features.reward.title': 'Sistema de Recompensas',
    'home.features.reward.desc': 'Incentivos financeiros para descarte adequado de resíduos e reciclagem',
    'home.features.analytics.title': 'Painel de Análises',
    'home.features.analytics.desc': 'Insights de dados para medir e otimizar o impacto ambiental',
    'home.features.community.title': 'Plataforma Comunitária',
    'home.features.community.desc': 'Conecte indivíduos e organizações na gestão de resíduos',
    'home.roles.title': 'Escolha Seu Papel',
    'home.roles.subtitle': 'Seja você um indivíduo, organização, coletor ou depósito - temos você coberto',
    'home.roles.individual.title': 'Cidadão Eco',
    'home.roles.individual.desc': 'Junte-se ao movimento de restauração do ecossistema e acompanhe seu impacto ambiental',
    'home.roles.hub.title': 'Hub Eco',
    'home.roles.hub.desc': 'Transforme seu negócio em uma organização positiva para o ecossistema e hub de coleta',
    'home.roles.collector.title': 'Coletor Eco',
    'home.roles.collector.desc': 'Seja a ponte entre resíduos e restauração do ecossistema',
    'home.roles.depot.title': 'Centro de Processamento Eco',
    'home.roles.depot.desc': 'Transforme resíduos em recursos do ecossistema e suporte à biodiversidade',
    'home.getStarted': 'Começar',
    'home.join.title': 'Junte-se à Nossa Iniciativa',
    'home.join.subtitle': 'Gestão de resíduos orientada por tecnologia para impacto sustentável',
    'home.join.getStarted': 'Começar',
    'home.join.viewData': 'Ver Dados de Impacto',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.close': 'Fechar',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only access localStorage and window after component mounts
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('ecotrack-language') as Language
      if (savedLanguage && ['en', 'sw', 'pt'].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        // Try to detect language from browser
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith('sw')) {
          setLanguage('sw')
        } else if (browserLang.startsWith('pt')) {
          setLanguage('pt')
        } else {
          setLanguage('en')
        }
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('ecotrack-language', language)
      // Update HTML lang attribute
      document.documentElement.lang = language === 'sw' ? 'sw' : language === 'pt' ? 'pt' : 'en'
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  // Always render children, but provide default values during SSR
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}



