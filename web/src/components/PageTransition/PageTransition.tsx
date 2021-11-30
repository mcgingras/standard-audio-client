import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

const PageTransition = () => {
  const [isShowing, setShowing] = useState<boolean>(true)
  const [t, st] = useState<boolean>(false)
  const [stage, setStage] = useState<number>(0)

  // kind of annoying that this runs many many times
  // you can tell it runs many times if you log something
  // I just want it to run once
  useEffect(() => {
    setInterval(() => {
      st(true)
    }, 1000)
  }, [])

  return (
    <Transition
      appear={true}
      show={true && (!t || stage !== 1)}
      as={'div'}
      leave="transition transform ease-in duration-300"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
      className="min-h-screen bg-black w-full fixed top-0 right-0 z-50 flex items-center justify-center"
    >
      <Transition
        appear={true}
        as={'div'}
        show={!t}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="text-4xl text-white text-center"
        // afterLeave={() => {
        //   setStage(1)
        // }}
      >
        <svg
          width="223"
          height="122"
          viewBox="0 0 223 122"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: 'url(#pattern)' }}
        >
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={750}
            height={800}
            className="text-white"
          >
            <rect className="w-full h-full text-white fill-current" />
            <Transition
              appear={true}
              as={'rect'}
              show={!t}
              leave="transition transform ease-in duration-300"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
              className="w-full h-full text-gray-600 fill-current"
              afterLeave={() => {
                setInterval(() => {
                  setStage(1)
                }, 500)
              }}
            />
          </pattern>
          <path
            d="M214.339 74.6866C212.839 74.6866 211.363 74.1162 210.22 72.9756L148.018 10.8812C145.733 8.59986 145.733 4.9165 148.018 2.65895C150.304 0.37764 153.993 0.37764 156.255 2.65895L218.457 64.7534C220.742 67.0347 220.742 70.718 218.457 72.9756C217.314 74.1162 215.815 74.6866 214.339 74.6866Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M149.09 74.6628C144.329 74.6628 139.592 72.8568 135.973 69.2447L82.936 16.323V63.2563C82.936 67.3198 80.5079 70.9557 76.7468 72.5241C72.9856 74.0925 68.6769 73.237 65.7966 70.3616L11.6644 16.323V68.7219C11.6644 71.93 9.04584 74.544 5.83218 74.544C2.61853 74.544 0 71.9538 0 68.7219V12.402C0 8.33846 2.42809 4.70262 6.21306 3.13422C9.97422 1.56582 14.2829 2.42132 17.1633 5.29672L71.2955 59.3353V12.4258C71.2955 8.36223 73.7236 4.72639 77.5085 3.15799C81.2697 1.58959 85.5784 2.44508 88.4588 5.32048L144.257 61.0225C146.947 63.7078 151.304 63.7078 153.993 61.0225L212.434 2.65895C214.72 0.37764 218.409 0.37764 220.671 2.65895C222.956 4.94026 222.956 8.62363 220.671 10.8812L162.206 69.2447C158.588 72.8568 153.827 74.6628 149.09 74.6628Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M116.906 121.335H110.431V101.92H105.075V96.4303H122.286V101.92H116.93V121.335H116.906Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M133.117 117.01L131.403 121.335H124.499L134.093 96.4303H141.163L150.566 121.335H143.638L142.02 117.01H133.117ZM137.64 104.13H137.568L134.878 112.067H140.282L137.64 104.13Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M156.731 96.4303H166.658C172.014 96.4303 175.727 98.9017 175.727 104.629C175.727 110.498 172.561 113.089 166.896 113.089H163.23V121.358H156.755V96.4303H156.731ZM163.23 107.861H164.325C166.682 107.861 168.991 107.861 168.991 104.819C168.991 101.682 166.848 101.658 164.325 101.658H163.23V107.861Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M189.225 101.92V106.078H196.533V111.568H189.225V115.869H196.938V121.358H182.75V96.4303H196.938V101.92H189.225Z"
            style={{ fill: 'url(#pattern)' }}
          />
          <path
            d="M218.767 102.846C217.576 101.848 216.053 101.183 214.458 101.183C213.268 101.183 211.673 101.872 211.673 103.274C211.673 104.724 213.434 105.294 214.553 105.651L216.22 106.15C219.695 107.171 222.385 108.93 222.385 112.946C222.385 115.417 221.79 117.96 219.814 119.647C217.862 121.311 215.244 122 212.744 122C209.602 122 206.531 120.954 203.984 119.148L206.769 113.92C208.388 115.346 210.316 116.487 212.53 116.487C214.053 116.487 215.672 115.726 215.672 113.968C215.672 112.162 213.125 111.52 211.744 111.116C207.674 109.952 204.984 108.906 204.984 104.082C204.984 99.0206 208.602 95.7174 213.577 95.7174C216.101 95.7174 219.171 96.5016 221.385 97.7611L218.767 102.846Z"
            style={{ fill: 'url(#pattern)' }}
          />
        </svg>
      </Transition>
    </Transition>
  )
}

export default PageTransition
