import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function Getanswer(props) {
    console.log(props.arr)
    return (
        <>
            {
                props.arr.map((element) => (

                    <div className='lg:w-[700px] w-[85%]  p-3 mx-auto'>

                        <div className='flex  space-x-4 '>
                            <FaUserCircle className='h-6 w-6 text-white' />


                            <p className='text-white text-md font-sans leading-loose '>{element.question}
                            </p>


                        </div>
                        <div className='flex pt-7  space-x-4 '>
                            <FaUserCircle className='h-6 w-6 text-red-400' />
                            {!props.loading && <p className='text-white font-sans text-sm font-semibold leading-loose  '>

                                {

                                    element.answer
                                }
                            </p>
                            }

                        </div>
                    </div>
                ))
            }
        </>
    )
}
