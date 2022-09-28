import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import s from '../styles/Home.module.css'

export async function getStaticProps() {
  const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  const data = await resp.json()
  return {
    props: {
      pokemon: data.slice(0, 80)
    }
  }
}

export default function Home({ pokemon }) {

  function Card({ id, name, image }) {
    return (
      <>
        <li className={s.card} >
          <Link prefetch={true} href={`/pokemon/${name.toLowerCase()}`}>
            <a className={s.cardItems}>
              <Image className={s.images} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`}
                width="200" height="200" layout="fixed" priority={true}
                alt={`${name}`} />
              <h3>{`${id}. ${name}`}</h3>
            </a>
          </Link>
        </li>
      </>
    )
  }

  return (
    <div className={s.container}>
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
