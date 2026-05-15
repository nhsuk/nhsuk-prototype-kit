import 'express-flash'
import 'express-session'

declare module 'express-serve-static-core' {
  interface Locals extends ApplicationLocals {
    data: Record<string, unknown> & ApplicationData
  }
}

declare module 'express-session' {
  interface SessionData {
    data: Record<string, unknown> & ApplicationData
    referrer: string
  }
}

interface ApplicationData {
  features?: BreastFeature[]
  organisationName?: string
}

interface ApplicationLocals extends ApplicationData {
  currentPage?: string
}
