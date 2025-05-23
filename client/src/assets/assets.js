import logo from './Neuro4.png'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './download.png'
import sample_img_2 from './download (1).png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './star_icon2.png'
import profile_icon from './profile_icon.png'
import tick_icon from './tick.webp'
import failed_icon from './failed_icon2.png'
import arrow_icon from './arrow_icon.svg'
import header_img from './header_img.png'
import remove_bg_icon from './remove_bg_icon.svg'
import upload_btn_icon from './upload_btn_icon.svg'
import upload_icon from './upload_icon.svg'
import download_icon from './download_icon.svg'
import image_w_bg from './image_w_bg.png'
import image_wo_bg from './image_wo_bg.png'
import google_plus_icon from './google_plus_icon.svg'
import download_icon2 from './download_icon2.svg'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    tick_icon,
    failed_icon,
    arrow_icon,
    header_img,
    remove_bg_icon,
    upload_btn_icon,
    upload_icon,
    download_icon,
    image_w_bg,
    image_wo_bg,
    google_plus_icon,
    download_icon2
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image:profile_img_1,
        name:'Kofi J.',
        role:'Digital Artist',
        stars:5,
        text:`NeuroCanvas turned my wildest thoughts into stunning visuals. It feels like I’ve got an entire design studio in my pocket!`
    },
    {
        image:profile_img_2,
        name:'David O.',
        role:'UX Designer',
        stars:4,
        text:`The interface is sleek, the results are premium, and the creativity is unmatched. My go-to tool for quick mockups.`
    },
    {
        image:profile_img_1,
        name:'Daniel R.',
        role:' Creative Director',
        stars:5,
        text:`Every image feels like it was crafted by a top-tier designer. I use NeuroCanvas for everything from pitches to posters.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 5000,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 25000,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 50000,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]