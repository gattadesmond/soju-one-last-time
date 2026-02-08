"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"

function SiteHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <header className="backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64 fixed top-0 left-0 right-0 z-10 bg-white ">
      <div className="flex justify-between items-center py-3.5  container  ">
        <div className="relative">
          <div className="flex items-center">
            <Link href="/" className="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 69 69"
                className="w-8 h-8"
              >
                <rect width="69" height="69" fill="currentColor" />
                <path
                  className="fill-primary-foreground"
                  d="M27.933 31.768c.262 1.083.467 1.941.616 2.576l4.2 19.6V54c-1.12.224-2.352.299-3.696.224a20.46 20.46 0 0 1-3.808-.448h-.056a24.495 24.495 0 0 1-.672-2.128 81.715 81.715 0 0 0-.616-2.52 39.522 39.522 0 0 0-.616-2.464 13.72 13.72 0 0 0-.728-2.016 7.933 7.933 0 0 0-1.12-.112h-.728c-.186 0-.41.019-.672.056h-.952c-.261.597-.485 1.307-.672 2.128a149.5 149.5 0 0 1-.504 2.52c-.149.859-.317 1.699-.504 2.52a8.837 8.837 0 0 1-.784 2.184c-.037 0-.074.019-.112.056h-.056c-.298.075-1.045.075-2.24 0-1.194-.075-3.061-.093-5.6-.056-.037 0-.074-.019-.112-.056.075-.261.206-.99.392-2.184.187-1.195.448-2.744.784-4.648.336-1.904.728-4.088 1.176-6.552a261.182 261.182 0 0 1 1.68-7.952c.635-2.8 1.326-5.712 2.072-8.736.747-3.024 1.568-6.03 2.464-9.016.262-.037.542-.056.84-.056h3.024a73.11 73.11 0 0 0 3.024-.224c.112.485.28 1.232.504 2.24.262.97.523 2.09.784 3.36.299 1.232.598 2.557.896 3.976.336 1.419.654 2.781.952 4.088.299 1.307.579 2.501.84 3.584ZM20.71 38.04a40.52 40.52 0 0 1 2.128-.056c-.373-3.21-.709-5.712-1.008-7.504-.261-1.792-.504-3.005-.728-3.64-.186-.635-.392-.765-.616-.392-.186.336-.373 1.045-.56 2.128-.149 1.083-.336 2.445-.56 4.088-.186 1.643-.41 3.416-.672 5.32a34.43 34.43 0 0 0 2.016.056Zm14.258 3.976v-.112l7.952-.28v.168c.037.037.056.075.056.112.149 1.381.56 2.315 1.232 2.8.672.485 1.437.635 2.296.448 1.306-.224 2.258-.84 2.856-1.848a6.363 6.363 0 0 0 .952-3.36 6.971 6.971 0 0 0-.896-3.416c-.56-1.083-1.4-1.792-2.52-2.128-.971-.15-1.998-.205-3.08-.168-1.046 0-2.11.037-3.192.112-1.083.037-2.128.075-3.136.112a20.6 20.6 0 0 1-2.688-.056c-.075 0-.112-.019-.112-.056v-5.152c0-1.605-.02-3.155-.056-4.648 0-1.53-.02-3.061-.056-4.592v-4.928h.056c.112 0 .746-.019 1.904-.056 1.157-.037 2.576-.075 4.256-.112 1.717-.037 3.546-.075 5.488-.112a295.28 295.28 0 0 1 5.544-.056c1.717-.037 3.192-.056 4.424-.056 1.232 0 1.978.019 2.24.056.037.037.056.261.056.672v1.512c0 .597-.02 1.25-.056 1.96-.038.71-.075 1.363-.112 1.96 0 .597-.02 1.12-.056 1.568v.616c-.262.037-.803.075-1.624.112-.784.037-1.718.075-2.8.112-1.046 0-2.166.019-3.36.056a959.47 959.47 0 0 0-3.304.112h-4.256v.28c.037 0 .056.019.056.056.074.299.112.635.112 1.008s.074.672.224.896l.056.056.056.056h.056c2.09-.41 4.05-.448 5.88-.112 2.24.336 4.05 1.213 5.432 2.632 1.38 1.381 2.426 3.061 3.136 5.04.709 1.979 1.1 4.125 1.176 6.44a37.018 37.018 0 0 1-.28 6.776c-.374 1.717-1.232 3.192-2.576 4.424-1.344 1.195-2.931 2.09-4.76 2.688-1.792.597-3.696.896-5.712.896-2.016 0-3.864-.336-5.544-1.008-1.643-.672-3.006-1.68-4.088-3.024-1.083-1.381-1.606-3.117-1.568-5.208 0-.97.112-2.053.336-3.248Z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex bg-accent rounded-full p-1 cursor-pointer transition-all">
          <Link target="_self" href="/">
            <div className="py-1 px-2 rounded-full transition-all bg-primary text-primary-foreground">
              About
            </div>
          </Link>
          <Link target="_self" href="/blogs">
            <div className="py-1 px-2 rounded-full transition-all bg-transparent text-foreground hover:bg-border hover:text-accent-foreground">
              Blog
            </div>
          </Link>
          <Link target="_self" href="/about">
            <div className="py-1 px-2 rounded-full transition-all bg-transparent text-foreground hover:bg-border hover:text-accent-foreground">
              Video
            </div>
          </Link>
          <Link target="_self" href="/jobs">
            <div className="py-1 px-2 rounded-full transition-all bg-transparent text-foreground hover:bg-border hover:text-accent-foreground">
              Pomodoro
            </div>
          </Link>
        </div>
      </div>
    </header>


  )
}

export { SiteHeader }
