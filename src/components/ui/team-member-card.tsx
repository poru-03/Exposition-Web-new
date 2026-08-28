'use client'

/**
 * @author: @emerald-ui
 * @description: Editorial-style team member card with overlapping layers and motion
 * @version: 2.0.0
 * @date: 2026-02-19
 * @license: MIT
 * @website: https://emerald-ui.com
 *
 */
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position?: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  className?: string
  onCtaClick?: () => void
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  description = 'Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.',
  className,
  onCtaClick,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-6 flex flex-col justify-center w-full', className)}
    >
      {/* jobPosition label — editorial uppercase tracking */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            'mb-4 text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase dark:text-zinc-500',
            isPositionRight && 'text-right'
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0'>
        {/* Portrait image with reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative h-72 sm:h-96 w-full sm:w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl',
            isPositionRight && 'sm:order-1'
          )}
        >
          {/* Subtle grain overlay for texture */}
          <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
          <img
            src={imageUrl}
            alt={fullName}
            className='h-full w-full object-cover object-top duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
          />
        </motion.div>

        {/* Info block — overlaps image via negative margin on sm screens */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative sm:-left-8 z-2 flex w-full sm:w-[calc(100%-250px)] flex-col gap-6 sm:gap-10 p-4 sm:p-6 bg-[#121215]/90 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl',
            isPositionRight && 'sm:left-8 sm:items-end'
          )}
        >
          {/* Display name — large editorial type */}
          <div>
            <p className='text-3xl sm:text-4xl leading-[1.1] font-extralight tracking-tight text-white'>
              {firstName}
              <br />
              <span className='font-normal text-[#E8C896]'>{lastName}</span>
            </p>
          </div>

          {/* Details row — toggle + bio */}
          <div className={cn('flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center', isPositionRight && 'sm:justify-end')}>
            {/* Circular CTA with hover pulse */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCtaClick}
              className={cn(
                'group flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-[#E8C896] hover:bg-[#B8894F]/20 bg-black/60 shadow-lg',
                isPositionRight && 'sm:order-1'
              )}
            >
              <ArrowRight
                size={22}
                className={cn(
                  'text-[#E8C896] transition-all duration-300 group-hover:-rotate-45 group-hover:text-white',
                  isPositionRight && 'rotate-180 group-hover:rotate-225'
                )}
              />
            </motion.div>

            {/* Bio copy — restrained body text */}
            <div className='w-full sm:w-[75%]'>
              <p
                className={cn(
                  'text-xs sm:text-sm leading-[1.7] text-zinc-300 font-light',
                  isPositionRight && 'sm:text-right'
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
