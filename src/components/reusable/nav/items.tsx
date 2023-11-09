import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'
import 'lib/styles/nav/items.css'

export { NavItems, type NavItemsProps }

interface NavItemsProps extends React.HTMLProps<HTMLUListElement> {
  items: { title: string; href: string; tag?: string }[]
  addItems?: NavItemsProps['items']
  extend?: boolean
}

function NavItems({
  extend,
  items,
  addItems,
  className,
  ...props
}: NavItemsProps) {
  const [active, setActive] = useState(false)
  const [index, setIndex] = useState<null | number>(null)

  const [translateX, setTranslateX] = useState(0)
  const [width, setWidth] = useState(100)

  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (!!itemRefs?.current[0] && index !== null) {
      const itemElem = itemRefs.current[index]
      const widths = itemRefs.current.map(elem =>
        !!elem ? elem.offsetWidth : 0
      )

      setTranslateX(
        (() => {
          let tmp = 0
          for (let i = 0; i < index; i++) {
            if (i === index) tmp += widths[i] / 2
            else tmp += widths[i]
          }
          return tmp
        })()
      )
      setWidth(widths[index])
    }
  }, [index])

  return (
    <ul
      {...props}
      className={cn(
        className,
        'nav-items relative flex items-center rounded-full py-0.5 px-1.5'
      )}
      onMouseLeave={() => {
        setActive(false)
        setIndex(null)
      }}
    >
      <motion.div
        className="nav-item-ghost"
        animate={{
          opacity: active ? 1 : 0,
          translateX,
          width
        }}
        transition={{ duration: 0.25, delay: 0.05 }}
      />
      {items.map((item, i) => (
        <Link
          className="rounded-full outline-none relative z-[2]"
          key={i}
          to={item.href}
          onFocus={() => {
            setActive(true)
            setIndex(i)
          }}
          onBlur={() => {
            setActive(false)
            if (active) setIndex(null)
          }}
          onMouseOver={() => {
            setActive(true)
            setIndex(i)
          }}
          onMouseLeave={() => {
            setActive(false)
            setIndex(null)
          }}
        >
          <li
            ref={elem => (itemRefs.current[i] = elem)}
            className="rounded-full py-2.5 px-6 text-sm text-[#e2e8ffbf]"
          >
            {item.title}
          </li>
        </Link>
      ))}
      <AnimatePresence mode="wait">
        {!!addItems?.length && extend && (
          <motion.div
            key={extend ? 'active' : ''}
            initial={{ width: '0px' }}
            animate={{ width: 'auto' }}
            exit={{ width: '0px' }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 items-center">
              <div className="h-5 min-w-[1px] bg-[#e2e8ff14] ml-1" />
              {addItems.map((item, i) => (
                <Link
                  to={item.href}
                  key={i}
                  className="nav-item-action text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ul>
  )
}
