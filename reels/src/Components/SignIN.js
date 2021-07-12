import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../Context/AuthProvider';
import { Link } from '@material-ui/core';
// import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '25ch'
    },
}));


function SignIN() {
    const {login}=useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [loading, setLoading]=useState("false")
    const [error, setError]=useState("")
    const [passwordObj, setPasswordObj] = useState({
        password: "",
        showPassword: false
    })
    const classes = useStyles();
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setPasswordObj({ ...passwordObj, showPassword: !passwordObj.showPassword });
    };
    const handlePasswordChange=(e)=>{
        setPasswordObj({...passwordObj, password:e.target.value})
    }
    const handleSignIn=async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            let res= await login(email,passwordObj.password);
            let uid = res.user.uid;
            console.log(uid);
            setLoading(false);
            console.log('User has Signed IN');
        }catch(error){
            setError(e)
            setTimeout(() => setError(''), 2000);
            setLoading(false)
        }
    }
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSignIn}>
                <TextField id="outlined-basic"
                    type="email"
                    placeholder="Enter Email" variant="outlined" required autoFocus
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={passwordObj.showPassword ? 'text' : 'password'}
                    value={passwordObj.password}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {passwordObj.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Password"
                    variant="outlined" required
                />
                <Link>Forgot Password?</Link>
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    LOG IN
                </Button>
            </form>
        </div>
    )
}

export default SignIN
