import { motion, HTMLMotionProps } from 'framer-motion'
import { useEffect } from 'react'
import cn from 'classnames'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export { Page, type PageProps }

interface PageProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  title?: string
  animate?: boolean
  children: React.ReactNode
}

function Page({
  animate = true,
  children,
  title,
  className,
  ...props
}: PageProps) {
  useEffect(() => {
    if (title) document.title = title + '- react-boilerplate'
    else document.title = 'react-boilerplate'
  }, [title])

  return animate ? (
    <AnimatedPage title={title} children={children} {...props} />
  ) : (
    <motion.div
      className={cn('text-black dark:text-white', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function AnimatedPage({
  className,
  children,
  ...props
}: Omit<PageProps, 'animate'>) {
  return (
    <motion.div
      className={cn('text-black dark:text-white', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.2, type: 'easeInOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
