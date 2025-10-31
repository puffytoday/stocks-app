import Image from 'next/image'
import Link from 'next/link'
import NavItems from '@/components/NavItems'
import UserDropdown from '@/components/UserDropdown'

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="BigStonks logo"
            height={32}
            width={140}
          ></Image>
        </Link>
        <nav className="hidden sm:block">
          {' '}
          <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  )
}

export default Header
