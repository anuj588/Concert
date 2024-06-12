import axios from 'axios'
import { useEffect, useState } from 'react'
import swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function Concert() {
  const [data, setData] = useState([])
  const [concertName, setconcertName] = useState()
  const [artist,setartist]=useState()
  const [address,setaddress]=useState()
  const [description,setdescription]=useState()
  const [year,setyear]=useState()
  const [concertid,setconcertid]=useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (concertName === undefined || year===undefined || description === undefined ||
      artist === undefined || address === undefined) {
      swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please fill all details',
      })
      return
    }
    const formData = new FormData()
    formData.append('photo', selectedPhoto)
    formData.append('concertName', concertName)
    formData.append('year', year)
    formData.append('artist', artist)
    formData.append('address', address)
    formData.append('description', description)
    formData.append('concertId',concertid)
    axios
      .post(baseUrl+apiUrls.CONCERT_URL, formData)
      .then((resp) => {
        console.log(resp)
        swal.fire({
          title: 'Success',
          text: resp.data,
        })
        setconcertName('')
        setartist('')
        setaddress('')
        setyear('')
        setdescription('')
        setconcertid(0)
        setSelectedPhoto(null)
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'error',
          icon: 'error',
          text: 'Cannot save Concert',
        })
      })
  }

  const handleEdit = (concert) =>{
      setconcertName(concert.concertName)
      setyear(concert.year)
      setartist(concert.artist)
      setaddress(concert.address)
      setdescription(concert.description)
      setconcertid(concert.concertId)
  }

  const handleDelete = (id) => {
    axios
      .delete(baseUrl+apiUrls.CONCERT_URL + id)
      .then((resp) => {
        swal.fire({
          icon: 'error',
          title: 'Deleted',
          text: resp.data,
        })
        loadData()
      })
      .catch((err) => {
        swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Cannot delete Concert',
        })
      })
  }
  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0])
  }
  const loadData = () => {
    axios.get(baseUrl+apiUrls.CONCERT_URL).then((resp) => {
      setData(resp.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-8'>
            <h5 className='p-2'>Concert List</h5>
            <table className='table table-bordered'>
              <thead>
                <th>Id</th>
                <th>Concert Name</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data?.map((x) => (
                  <tr key={x?.concertId}>
                    <td>{x?.concertId}</td>
                    <td>
                      <img
                      className='float-start'
                        src={'http://localhost:8080/' + x?.poster}
                        style={{
                          width: '100px',
                          height: '120px',
                          marginRight: '10px',
                        }}
                      />
                      {x?.concertName}<br/>
                      Artist: {x?.artist}<br/>
                      address: {x?.address}
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(x.concertId)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => handleEdit(x)}
                        className='btn btn-primary btn-sm ms-2'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-sm-4'>
            <h5>Add Concert</h5>
            <form>
              <div className='mb-2'>
                <label>Concert Name</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={concertName}
                  onChange={(e) => setconcertName(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Artist Name</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={artist}
                  onChange={(e) => setartist(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Address</label>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>year</label>
                <input
                  type='number'
                  className='form-control form-control-sm'
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                />
              </div>
              <div className='mb-2'>
                <label>Description</label>
                <textarea
                  rows={3}
                  className='form-control form-control-sm'
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
              </div>
              <div className='mb-2'>
                <label>Concert Poster</label>
                <input
                  type='file'
                  onChange={handleFileInput}
                  className='form-control-file form-control'
                />
              </div>
              <button
                onClick={handleSubmit}
                className='btn btn-primary btn-sm float-end'
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
