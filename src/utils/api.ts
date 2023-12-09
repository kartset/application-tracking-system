import { create } from 'apisauce'

// const naviMonitor = (response:any) => console.log('hey!  listen! ', response)

export const api = create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
  timeout: 10000
})
// .addMonitor(naviMonitor)
