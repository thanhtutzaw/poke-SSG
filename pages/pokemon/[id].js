import React from 'react'
import styles from '../../styles/Poke.module.css'
import { MdKeyboardBackspace } from 'react-icons/md'
import Image from 'next/image'
import { useRouter } from 'next/router'



export async function getStaticPaths(){
  // const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  // const data = await resp.json()
  // const pokemon = data.filter(entry => entry)
  //   .slice(0, 80);

  // const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  // const data = await resp.json()
  // const pokemon = data.filter(entry => entry)
  //   .slice(0, 80);
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  const data = await resp.json()
  const pokemon = data.filter(entry => entry)
    .slice(0, 80);
  const paths = pokemon.map((poke) => {
    return{
      params: {id: poke.id.toString()}
    }
  })
  return {
    paths ,
    fallback : true
  }
}

export async function getStaticProps({params}) {
  const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)
  // const data = await resp.json()
  // const poke = data.filter(entry => entry)
  //   .slice(0, 80);

  // const poke = pokemon.find(poke =>poke.id == id)
  return {
    props: { poke : await resp.json() }
  }

}


export default function Single({poke}) {
  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  if(!poke) return null;

  return (
    <>
      <div className={styles.viewContainer} >
        <MdKeyboardBackspace onClick={()=>window.history.back()} className={styles.backIcon} />
        
        <Image priority={true} className={styles.image} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
        width="300" height="300" // width = 100 no delay
        placeholder='blur'
        alt={`${poke.name}`} />





        {/* {JSON.stringify(poke)} */}
        <div >
          <h2>{poke.name}</h2>
          <h3>Type - {poke.type}</h3>
        </div>
        {/* <p>{poke.id}. {poke.name}</p> */}
        
      </div>
    </>
  )
}
