import React, {useState} from 'react'
import TextField from '@mui/material/TextField';

const InputField = (props: any) => {
    const [value, setValue] = useState('')

    return (
        <TextField className='text-field' id="outlined-basic" label={props.label} variant="outlined" value={value} onChange={(e) => {setValue(e.target.value); props.change({label: props.label, value: e.target.value})}} disabled ={props.disabled} />
    )
}

export default InputField