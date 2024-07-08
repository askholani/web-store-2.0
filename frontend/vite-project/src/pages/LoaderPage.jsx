import { motion } from 'framer-motion'

const LoaderPage = () => {
  const rippleAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 6],
      opacity: [1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  }

  const rippleAnimation2 = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 8],
      opacity: [1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  }
  return (
    <section className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center overflow-hidden z-50 bg-white'>
      <motion.div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
        <motion.div
          className='w-12 h-12 rounded-full border border-slate-700 fixed top-0 left-0'
          variants={rippleAnimation}
          initial='initial'
          animate='animate'
        />
        <motion.div
          className='w-12 h-12 rounded-full border border-slate-700 fixed bottom-0 right-0'
          variants={rippleAnimation2}
          initial='initial'
          animate='animate'
        />
      </motion.div>
      <div className='flex gap-x-2 items-center justify-center font-bold text-3xl relative z-50'>
        <span className='bg-slate-600 rounded-full w-12 h-12 text-white flex justify-center items-center'>
          k
        </span>
        <span className='text-3xl'>fashion.</span>
      </div>
    </section>
  )
}

export default LoaderPage
