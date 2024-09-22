import React from 'react'
import GetWords from './GetWords'
import GetWordsSettings from './GetWordsSettings'
import GetTotalWords from './GetTotalWords'
import GetWordsSQL from './GetWordsSQL'

export default function page() {
  return (<>
    <GetWords/>
    <GetWordsSettings/>
    <GetTotalWords/>
    <GetWordsSQL/>
  </>)
}
