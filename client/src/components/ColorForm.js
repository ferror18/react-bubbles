import React,{ useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const ColorForm = ({setColorList})=>{
    const [ newColor, setNewColor ] = useState({
        color: "",
        code: {hex: ''}
      })
      const onChange = event=>{
        event.preventDefault()
        if (event.target.name === 'color') {
            setNewColor({...newColor, color: event.target.value})
        } else {
            setNewColor({...newColor, code: {...newColor.code, hex: event.target.value}})
        }
      }
      const onSubmit = event=>{
        event.preventDefault()
        console.log(newColor);
        axiosWithAuth()
        .post('colors', newColor)
        .then(response=>{
            console.log(response);
        })
        .catch(error=>console.log('Error==>', error)
        )
        .finally(()=>{
            axiosWithAuth()
        .get('colors')
        .then((response) => {
            console.log(response)
            setColorList(response.data)
        })
        })
      }
    //   useEffect(()=>{
    //     axiosWithAuth()
    //     .get('colors')
    //     .then((response) => {
    //         console.log(response)
    //         setColorList(response.data)
    //     })
    //     },[newColor])
    return (
        <form onChange={onChange} onSubmit={onSubmit}>
            <br/><br/><br/>
            <label>Color Name:</label>
            <input type='text' name='color' value={newColor.color}/>
            <br/><br/><br/>
            <label>Hex Code:</label>
            <input type='text' name='code' value={newColor.code.hex}/>
            <br/><br/><br/>
            <input type='submit' value='Add'/>
            <br/><br/><br/>
        </form>
    )
}