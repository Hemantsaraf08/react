import React, {useState, useEffect, useContext} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LinearProgress from '@material-ui/core/LinearProgress';
function Uploadfile() {
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const types =['video/mp4','video/webm','video/ogg'];
    console.log("out")
    const handleOnChange=(e)=>{
        console.log("in")
        const file=e.target.file[0];
        if(!file){
            setError("Please select a file");
            setTimeout(()=>setError(null), 3000)
            return;
        }
    }
    return (
        <>
            {
                error!=null?<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>:<>
                <input
                color="primary"
                type="file"
                id='icon-button-file'
                onChange={handleOnChange}
                style={{display: "none"}}
                />
                <label htmlFor='icon-button-file'>
                <IconButton color="inherit">
                    <PhotoCamera/>
                </IconButton>
                </label>
                {loading?<LinearProgress color="secondary" style={{width: "100vw", marginTop:"6%"}}></LinearProgress>:<></>}
                </>
            }            
        </>
    )
}

export default Uploadfile
