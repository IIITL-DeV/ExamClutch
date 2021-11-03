import { useState } from 'react'
import '../index.css';
var days2=0;
const calculateDays = (exams, days) => {
    days = parseInt(days)
    days2=days;
    var dict = {};
    exams.map((exam) => (
        dict[exam.text] = parseInt(exam.diff) + parseInt(exam.score)
    ))
    var total = 0;
    for (var key in dict) {
        total = total + dict[key]
    }

    var retVal = {}
    for (var temp in dict) {
        retVal[temp] = Math.round(dict[temp] / total * days)
    }
    return retVal

}

const PrintResult = (results,days) => {
    days = parseInt(days)
    var out = results.results;
    // var hrs = Math.floor(10*Math.random());
    const horizontalStyle = {
        border :  '2px solid black'
    };
    return (
        <>
        <h2 align='center'>Recommended Study Plan</h2><br />
        {
            Object.keys(out).map((key,index) => (
                
                <div className='exam' key={index}>
                    <h3>{key}</h3>
                    <p>Recommend studying for {out[key]} days</p>
                    <div>
                        <br></br>
                    </div>
                    <div>
                        <hr style={horizontalStyle}></hr>
                    </div>
                    <div>
                        <br></br>
                    </div>
                   
                    <p>Dedicate atleast <b>{parseInt((out[key]/days2)*16)} </b>hours a day to prepare well for the exam </p>
                </div>
            ))
        }
        </>
    )
}

const AddPlan = ({exams}) => {
    const [days, setDays] = useState('')
    const [done, setDone] = useState(false)
    const [result, setResult] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        if(days==1){
            alert('Please add atleast 2 days before the exam')
            return
        }
        if (!days) {
            alert('Please add how many days left to your exam week')
            return
        } else {
            var result = calculateDays(exams, days);
            alert('Successfully generated your study plan')
            setResult(result)
            setDone(true)
        }

        setDays('')
    }
    return (
        <>
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Days to Exam Week</label>
                <input type='text' placeholder='Example: 30' 
                value={days} onChange={(e) => 
                setDays(e.target.value)} />
            </div>
            <input type='submit' value='Generate Study Plan' 
            className='btn btn-block' />
        </form>
        {done && <PrintResult results={result}/>}
        </>
    )
}

export default AddPlan