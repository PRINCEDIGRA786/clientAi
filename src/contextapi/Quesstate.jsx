import React, { useEffect, useState } from 'react'
import quescon from './QuesContext';
// import Cookies from 'universal-cookie';
export default function Quesstate(props) {
    const host = "http://localhost:5000"


    const[user,setuser]=useState({})
    const [questions, setquestions] = useState([]);
    const[answer,setanswer]=useState("")
    const getQuestions = async () => {
        const response = await fetch(`${host}/api/ques/fetchallques`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('auth-token')
            },
        });

        var json = await response.json();
        // console.log(json)
        // if(json.length==0){
        //     json.push("Ask your questions")
        // }
        await setquestions(json)

    }

    const getAnswer = async (question) => {
        const response = await fetch(`${host}/api/ques/`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ "question":question})
        });

        var json = await response.json();
    
        return json[0].answer;
    }


     // Del a list:
     const delQues = async (question) => {
        const response = await fetch(`${host}/api/ques/delete`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ "question":question})
        });
        const newquestions = questions.filter((element) => { return element.question !== question})
        
        setquestions(newquestions)

    }

    //Getuser details
    const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            },
            
        });
        var json = await response.json();
       
        setuser(json);
        // console.log(json);


    }

    return (
        <>

            <quescon.Provider value={{ questions,getQuestions,getAnswer,delQues,user,getUser }}>
                {props.children}
            </quescon.Provider>

        </>
    )
}
