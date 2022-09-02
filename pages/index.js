import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import s from '../styles/Home.module.css'
// import {audio} from '/025-kanto-pikachu.mp3';

// export async function getStaticProps() {
//   const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
//   const data = await resp.json()
//   const filter = data.filter(entry => entry)
//     .slice(0, 80);
//   return {
//     props: {
//       Pokemon: filter,
//     }
//   };
// }
export async function getStaticProps() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  const data = await resp.json()
  // const filter = data.filter(entry => entry)
  //   .slice(0, 80);

  return {
    props: {
      pokemon: data.slice(0, 80)
    }
  }
}
// export async function getServerSideProps() {
//   const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
//   const data = await resp.json()
//   const filter = data.filter(entry => entry)
//     .slice(0, 80);
//   return {
//     props: { pokemon: filter }
//   }
// }
export default function Home({ pokemon }) {
  // const [Pokemon, setPokemon] = useState([]);
  // const text = "pika pika"
  // const useThis = new SpeechSynthesisUtterance(text)
  // function speak() {
  //   // window.speechSynthesis.speak(useThis)
  // }

  // function startVoice() {
  //   const audio = document.getElementById('source')
  //   audio.volume = 0.2;
  //   // console.log("audio")
  //   audio.play()
  // }
  // function stopVoice() {
  //   const audio = document.getElementById('source')
  //   audio.volume = 0.2;
  //   // console.log("audio")
  //   audio.stop()
  // }

  // let msg
  // if(typeof window !== 'undefined'){
  //   msg = new SpeechSynthesisUtterance("hello");

  // }

  // useEffect(() => {
  //   // const msg = new SpeechSynthesisUtterance("hey how are you doing")
  //   // speechSynthesis.speak(msg)
  //   // let text = "pika pika"
  //   // let usethis = new SpeechSynthesisUtterance(text)
  //   // document.onclick(()=>{
  //   //   speechSynthesis.speak(usethis)
  //   // })
  //   async function getPokemon() {
  //     console.log("fetched")

  //     setPokemon(await filter)

  //   }
  //   getPokemon()

  // }, [])



  function Card({ id, name, image }) {
    return (
      <>
        <Link prefetch={true} href={`/pokemon/${name.toLowerCase()}`}>
          <a className={s.card}>
            <li className={s.cardItems} >

              <Image className={s.images} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`}
                width="200" height="200" layout="fixed"
                alt={`${name}`} />
              <h3>{`${id}. ${name}`}</h3>
            </li>
          </a>
        </Link>
      </>
    )
  }

  return (
    <div className={s.container}>

      {/* <audio id="source"
        src="/025-kanto-pikachu.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio> */}

      <h2>Hello Pokemon</h2>
      <main className={s.main}>
        <ul className={s.cardContainer}>
          {pokemon.map((poke, index) => (
            <Card key={poke.id} {...poke} />
          ))}
        </ul>
      </main>


    </div>
  )
}
