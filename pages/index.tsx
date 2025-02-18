// pages/index.tsx

import React from 'react'
import type { NextPage } from 'next'
import SplashScreen from '../components/SplashScreen'

const Home: NextPage = () => {
  return <SplashScreen duration={2000} />
}

export default Home
