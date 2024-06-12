import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import { apiUrls, baseUrl } from '../lib/constants';
import Swal from 'sweetalert2';
export default function Carouselslide() {
  const [halls,sethalls]=useState([])
  const [date,setdate]=useState('')
  const [concertName,setconcertName]=useState('')
  const [slot,setslot]=useState(0)
  const [hallId,sethallId]=useState(0)
  const [data,setData]=useState([])
  const handleSearch=e=>{
      e.preventDefault()
      if(hallId || date || concertName || slot)
      {
        axios.get(baseUrl+apiUrls.SEARCH_SHOWS+'?hallId='+hallId+"&date="+date+"&concertName="+concertName+"&slot="+slot)
        .then((resp) => {
        setData(resp.data)   
      })
    }
    else{
      Swal.fire('Message','Please select any one parameter')
    }
  }
  useEffect(()=>{
    axios.get(baseUrl+apiUrls.HALLS_URL)
    .then(resp=>{
      sethalls(resp.data)
    }).catch(err=>{
      console.log(err)
    })
    axios.get(baseUrl+apiUrls.TODAYS_SHOWS).then((resp) => {
      setData(resp.data)
    })
  },[])
  return (
    <>
    <div className='mt-5'>
      <div className="d-block w-100"
         style={{height:"500px",backgroundImage:"url('header.jpg')",backgroundSize:"100% 100%"}}>
           <form className="d-block mx-auto" style={{width:"80%",position:"absolute",top:"44%",left:"50%",transform:"translate(-50%,-50%)"}}>
             <div className='row'>
                <div className='col-sm-3'>
                <select className="form-control me-2" value={slot} onChange={e=>setslot(e.target.value)}>
                  <option value=''>Select Time Slot</option>
                  <option value='1'>10:00AM to 01:00PM</option>
                  <option value='2'>12:00PM to 03:00PM</option>
                  <option value='3'>03:00AM to 06:00PM</option>

                </select>
                </div>
               <div className='col-sm-2'>
                <select className="form-control me-2" value={hallId} onChange={e=>sethallId(e.target.value)}>
                    <option value="">Select Hall</option>
                    {halls.map(x=>(
                    <option value={x.hallId}>{x.hallDesc}</option>
                    ))}
                </select>
                </div>
                <div className='col-sm-3'>
                <input type='search' placeholder='Search By Name' className="form-control me-2" value={concertName} onChange={e=>setconcertName(e.target.value)}/>
                </div>
                <div className='col-sm-3'>
                <input type="date" className='form-control me-2' value={date} onChange={e=>setdate(e.target.value)} />
                </div>                
                <div className='col-sm-1'>
                <button onClick={handleSearch} className="btn btn-warning bg-gradient text-white" type="submit"><i className="fa fa-search"></i></button>
                </div>
                </div>
            </form>
         </div>
    </div>
    <SearchResult data={data} />
    </>
  );
}
