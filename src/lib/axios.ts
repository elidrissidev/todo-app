import Axios from 'axios'

import { SUPABASE_API_BASE_URL, SUPABASE_KEY } from '@/config'

const apiClient = Axios.create({
  baseURL: SUPABASE_API_BASE_URL,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  },
})

export default apiClient
