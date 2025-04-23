import { ChevronDown, FileTextIcon, GraduationCap, LayoutDashboard, PenBox, StarIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from "next/link";
import { checkUser } from '@/lib/checkUser'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"


const header = async() => {
  await checkUser();
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/'>
          <Image src="/logo.png" alt='logo' width={300} height={80}
            className="h-15 w-auto object-contain py-1"
          />
        </Link>
        <div className='flex items-center space-x-2 md:space-x-4'>
          <SignedIn>
            <Link href={'/dashboard'}>
              <Button variant='outline'>
                <LayoutDashboard className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Industry Insights
                </span>

              </Button>
            </Link>
         
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <StarIcon className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Growth Tools
                </span>
                <ChevronDown className=" h-4 w-4" />

              </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Link href={'/resume'} className='flex items-center gap-2'><FileTextIcon className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Build Resume
                </span></Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={'/interview'} className='flex items-center gap-2'><GraduationCap className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Interview Prep
                </span></Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={'/ai-cover-letter'} className='flex items-center gap-2'><PenBox className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Cover Letter
                </span></Link></DropdownMenuItem>
             
                <DropdownMenuItem><Link href={'/interview'} className='flex items-center gap-2'><GraduationCap className="h-4 w-4 " />
                <span className='hidden md:block'>
                  Mock Interview
                </span></Link></DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={'outline'}>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
          <UserButton appearance={{elements:{avatarBox:"w-10 h-10",
          userButtonPopoverCard:"shadow-xl",
          userPreviewMainIdentifier:"font-semibold",}}} afterSignOutUrl='/'/>
          </SignedIn>

        </div>
      </nav>
    </header>
  )
}

export default header