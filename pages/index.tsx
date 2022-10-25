import Link from 'next/link'

export default function IndexPage() {
  const name = 'hj'
  return (
    <div>
      Hello World {name}<br />
      <Link href="/about">
        <a>About</a>
      </Link>
      <br />
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  )
}
