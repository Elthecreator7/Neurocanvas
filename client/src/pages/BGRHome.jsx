import React from 'react'
import BGRHeader from '../components/BGRHeader'
import BGRSteps from '../components/BGRSteps'
import BGRSlider from '../components/BGRSlider'
import UploadBtn from '../components/UploadBtn'

const BGRHome = () => {
  return (
    <div>
        <BGRHeader></BGRHeader>
        <BGRSteps></BGRSteps>
        <BGRSlider></BGRSlider>
        <UploadBtn></UploadBtn>
    </div>
  )
}

export default BGRHome