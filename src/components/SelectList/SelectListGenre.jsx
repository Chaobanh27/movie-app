/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { getListGenre } from '../../api'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const SelectListGenre = () => {
  const [data, setData] = useState([])
  const [selectedValue, setSelectedValue] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const results = await getListGenre()
      setData(results)
      //console.log(results)
    }
    fetchData()
  }, [])

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value) => {
        return (
          <option key={value.id} value={value.id}>{value.name}</option>
        )
      })
    }
  }

  const handleSelectChange = (e) => {
    let selectVal = parseInt(e.target.value)
    setSelectedValue(selectVal)
    navigate('/movie/filter/Genre/' + selectVal)
  }
  return (
    <>
      <Form.Select value={selectedValue} onChange={handleSelectChange} aria-label="Default select example">
        <option>Select movies by genre</option>
        {renderData()}
      </Form.Select>
    </>
  )
}

export default SelectListGenre