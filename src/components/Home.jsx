import React, { useContext, useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { BsArrowDownSquare } from "react-icons/bs";
// import { FaUserCircle } from "react-icons/fa";
import quescon from '../contextapi/QuesContext';
// import { BsThreeDots } from "react-icons/bs";
import { FaArchive, FaUserAlt } from "react-icons/fa";
// import { MdIosShare } from "react-icons/md";
// import { FaPencilAlt } from 'react-icons/fa';
import { ImBin } from "react-icons/im";
import Getanswer from './Getanswer';
import Signup from './Signup';
export default function Home() {
  const context=useContext(quescon)
  const [showOptions, setShowOptions] = useState(false);
  const{questions,getQuestions,getAnswer,user,getUser,delQues}=context
  const[question,setquestion]=useState("")
  const[showques,setshowques]=useState(false)
  const [loading,setloading]=useState(true)
  const[questionarr,setquestionarr]=useState([]);
  const[arr,setarr]=useState([])
  const[anss,setanss]=useState("")
  const[transu,settransu]=useState({
    translate:'-0rem 0rem',
  })
  const toggleshow=()=>{
    setshowques(true)
  }
  const togglestyle = () => {
    if (transu.translate=='-100rem 0rem') {
        settransu({
          translate:'-0rem 0rem',
        })
    }
    else {
        settransu({
          translate:'-100rem 0rem',
                })
    }
}
  useEffect(()=>{
    if(
      localStorage.getItem('auth-token')
    ){

      getQuestions();
    }
 
    
  },[])
      //Show signup page
  const[showsign,setshowsign]=useState(false);
  const handleonClose=()=> setshowsign(false);
  useEffect(
    ()=>{
      setTimeout(() => {
        if(!localStorage.getItem('auth-token')){

          setshowsign(true);
        }
        else{
          getUser();
          getQuestions();
        }
      },600);
    },[])
  return (
    <>
     <Signup visible={showsign} onClose={handleonClose}/>
      <div className='flex'>
      <div className="hamburger  cursor-pointer 
       md:hidden 
         absolute p-1 z-50  hover:border-[1px] border-white
         rounded-lg"  onClick={togglestyle}>
        <div className="line h-0.5 w-5 my-1 bg-white"></div>
        <div className="line h-0.5 w-5 my-1 bg-white"></div>
        <div className="line h-0.5 w-5 my-1 bg-white"></div>
    </div>
        <div className={`bg-black absolute z-40  md:mt-0 md:relative md:block
         md:w-[20%] h-screen /md:translate-x-[100rem] md:${
          transu.translate=='-100rem 0rem'? 'translate-x-[100rem]' :'translate-x-0'
         }
         
         `} style={transu}>

        <div className='flex justify-around py-5 hover:bg-[#383838] cursor-pointer align-top bg-fixed h-[15%]'
        onClick={()=>window.location.reload()}>
            <div className='flex space-x-3 '>
                <img src='data:image/png;base64,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'
                 className='h-9 w-9 rounded-full'/>
                <h1 className='text-white  text-sm font-extrabold pt-1 '>New chat</h1>
            </div>
            <div className='pt-2'>
                <FiEdit className='text-white h-4 w-4'></FiEdit>
            </div>
        </div>
        <div className='flex-col px-3 h-[60%] lg:h-[70%] space-y-4 overflow-y-scroll scrollbar 
         scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-rounded-full
          scrollbar-thumb-[#383838] scrollbar-w-3'>
            {
            
             localStorage.getItem('auth-token') && questions.length!=0 && questions.map((element,key)=>(
                <div key={element._id}>
                  <div className='hover:bg-[#383838] cursor-pointer
                   px-2 py-1 sm:py-2 rounded-sm sm:rounded-md flex group' 
                   >
                  <h1 className=' text-xs sm:text-sm font-semibold
                   text-white pl-2 w-[70%] overflow-hidden ' 
                   onClick={async()=>{
                    setquestion(element.question)
                    var a=await getAnswer(question)
                    setanss(a)
                    questionarr.push({"question":question,"answer":a})
                    setarr(questionarr)
                    // console.log(questionarr)
                    setTimeout(() => {
                    toggleshow();
                    setloading(false)
                    getQuestions();
                  }, 600)}}>
                    {element.question.substr(0,16)}...</h1>
                    <ImBin  className='text-red-500 h-3 w-3 sm:h-4 sm:w-4 hidden group-hover:block mt-1 mx-2 text-right 
                  cursor-pointer' onClick={()=>delQues(element.question)}/>
                    <FaArchive className='text-white h-3 w-3 sm:h-4 sm:w-4 hidden group-hover:block mt-1 mx-2 text-right'/>
                   
                </div>
                  </div>
              ))

            }
            
            
        </div> 
        <div className='h-[15%] align-bottom bg-fixed'>
            <div className='flex px-6 space-x-2'>
                <div>
            <BsStars className='text-white h-6 w-6'/>
                </div>
                <div>
            <p className='sm:text-sm text-xs font-semibold  text-white'>Upgrade plan</p>
            <p className='text-xs text-white p-1'>Get GPT-4, DALL·E, and more</p>

                </div>
             </div>
             <div className='text-center flex justify-start px-4 space-x-2'>
              <div className='group'>
             { localStorage.getItem('auth-token') && <FaUserAlt className='h-5 w-5 text-white mt-1 border-[1px] border-white rounded-full 
              cursor-pointer'  onClick={()=>{localStorage.removeItem('auth-token');
              window.location.reload()}}/>}
              <p className='hidden group-hover:block text-white p-1 text-xs font-mono border-white border-2 absolute bottom-10
               bg-[#383838]'>Logout</p>

              </div>
                <h1 className='text-white sm:text-xs overflow-hidden font-semibold mt-2'>{user.email}</h1>
             </div>
            
        </div> 
                 
                 
        </div>
        <div className='md:w-[80%] w-full bg-[rgba(29,32,36,0.9)] h-screen'>
            <div className='p-8 flex justify-between align-top h-[5%] md:h-[10%]'>
                <div className='flex space-x-2'>
                <h1 className='text-md font-extrabold text-white'>
                PRINCEKAGPT
                </h1>  
                <p className=' text-slate-300 text-lg'>3.5</p>
              </div>
              <div className='text-white'>
                <h1>{user.name}</h1>
              </div>
            </div>

            {/* intial stage */}
            <div className='align-middle overflow-y-scroll scrollbar md:h-[72%] h-[50%]
         scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-rounded-full
          scrollbar-thumb-[#696767] scrollbar-w-3'>

            {
             showques?(
              <Getanswer loading={loading} arr={arr}/>
              ):
             ( <div className='intialtext'> 
              {/* Remove on asking question bro */}

                <div className='text-center'>
                    <img src='data:image/png;base64,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' 
                    className='h-20 w-20 rounded-full mx-auto'/>
                    <h1 className='text-white text-2xl font-extrabold py-3'>How can I help you today?</h1>
                </div>
                
                <div className='pt-16'>
                <div className='flex justify-center space-x-4 py-4'>
                    <div className=' border-[1px] p-3 hover:bg-[#282828] hover:cursor-pointer border-white h-16 w-72
                     rounded-lg text-white' onClick={async()=>{
                      setquestion("Tell me a Fun fact");
                      document.getElementById('inpu').value="Tell me a Fun fact"
                     }}
                     >Tell me a Fun fact</div>
                    <div className=' border-[1px] p-3 hover:bg-[#282828] hover:cursor-pointer border-white
                     h-16 w-72 rounded-lg text-white'
                     onClick={async()=>{
                      setquestion("Brainstorm names");
                      document.getElementById('inpu').value="Brainstorm names"
                     }}>Brainstorm names</div>
                    
                </div>
                <div className=' md:flex justify-center space-x-4 hidden'>
                    <div className=' border-[1px] p-3 hover:bg-[#282828] hover:cursor-pointer border-white h-16 w-72 
                    rounded-lg text-white'
                    onClick={async()=>{
                      setquestion("Create a work out plan");
                      document.getElementById('inpu').value="Create a work out plan"
                     }}
                    >Create a work out plan</div>
                    <div className=' border-[1px] p-3 hover:bg-[#282828] hover:cursor-pointer border-white h-16 w-72 rounded-lg
                     text-white'
                     onClick={async()=>{
                      setquestion("Plan a trip for me");
                      document.getElementById('inpu').value="Plan a trip for me"
                     }}>Plan a trip for me</div>
                    
                </div>
                </div>
                   </div>
                )}
                </div>
                <div className='pt-8 text-center align-bottom fixed bottom-2 
                lg:right-48 md:right-[20vw] sm:right-[10vw] right-[2vw] '>
                     { localStorage.getItem('auth-token')? (     <div className='flex text-center justify-center group'>

           <input id='inpu' className=' h-14 lg:w-[600px] w-80 sm:w-96 
                     text-white rounded-xl bg-transparent border-2
                      group-hover:placeholder:text-white
                     border-slate-400 placeholder:text-slate-400 p-3' name='input' placeholder='Message ApnaGPT.....'
                     
                     onChange={(e)=>{
                      setquestion( e.target.value)
                    }} 
                    
                     />
                     <BsArrowDownSquare className='h-6 w-6 group-hover:text-white text-slate-400 rotate-180 relative right-10 top-4
                     cursor-pointer' onClick={
                      async()=>{
                        var a=await getAnswer(question)
                        setanss(a)
                        questionarr.push({"question":question,"answer":a})
                        setarr(questionarr)
                        // console.log(questionarr)
                        setTimeout(() => {
                        toggleshow();
                        setloading(false)
                        getQuestions();
                      }, 600);
                        
                      }}/>
                  </div>):(
                    <div className=' justify-start'>

                  <button className=' bg-green-500 p-2 font-extrabold text-sm
                  hover:p-3 duration-1000 hover:text-white
                  ' onClick={()=>{setshowsign(true)}}>Please Login first</button>
                  </div>)}

                     <p className='text-white text-xs pt-3'>ChatGPT can make mistakes. 
                     Consider checking important information.</p>
                </div>
            
        </div>
      </div>
    </>
  )
}
