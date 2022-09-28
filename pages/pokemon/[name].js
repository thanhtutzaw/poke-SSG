import React from 'react'
import s from '../../styles/Poke.module.css'
import { MdKeyboardBackspace } from 'react-icons/md'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Image from 'next/image'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  const data = await resp.json()
  const pokemon = data.filter(entry => entry)
    .slice(0, 80);
  const paths = pokemon.map((poke) => {
    return {
      params: { name: poke.name.toLowerCase() }
    }
  })
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  const d = await resp.json()
  const pokemon = d.filter(entry => entry)
    .slice(0, 80);
  const findObj = pokemon.find(poke => poke.name.toLowerCase() == params.name)

  const data = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${findObj.id}.json`)
  const poke = await data.json()
  return {
    props: { poke }
  }
}

export default function Single({ poke }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!poke) return null;
  console.log(typeof (poke), poke)
  return (
    <>
      <div className={s.viewContainer} >
        <div className={s.backIcon} onClick={() => window.history.back()}>
        <MdOutlineArrowBackIosNew  
        />
          <p style={{marginTop:"25px"}}>Back</p>
        </div>

        <Image priority={true} className={s.image} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
          width="300" height="300" layout='fixed' // width = 100 no delay
          // placeholder='blur'
          alt={`${poke.name}`} />

        <div className={s.details}>
          <h2>{poke.name}</h2>
          <ul >Type - 
            <li style={{ textTransform: 'uppercase' }}>{ poke.type}</li>
          </ul>
        </div>
      </div>
    </>
    
  )
}
