import { motion } from 'framer-motion'
import { useEffect } from 'react'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export interface PageProps {
  title?: string
  animate?: boolean
  children: React.ReactNode
}

export default function Page({
  animate = true,
  children,
  title
}: PageProps): JSX.Element {
  useEffect(() => {
    if (title) document.title = title + '- react-boilerplate'
    else document.title = 'react-boilerplate'
  }, [title])

  return animate ? (
    <AnimatedPage title={title} children={children} />
  ) : (
    <>{children}</>
  )
}

function AnimatedPage(props): JSX.Element {
  return (
    <motion.div
      className="text-black dark:text-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.2, type: 'easeInOut' }}
    >
      {props.children}
    </motion.div>
  )
}
