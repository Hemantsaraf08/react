import React, { useContext, useState } from 'react'
import { storage, database } from '../../firebase';
import { AuthContext} from "../../Context/AuthProvider"
import styles from "./signup.module.css"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import bpic from "./signup_bg.png"

const useStyles = makeStyles((theme) => ({
    formBlock: {
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-evenly",
        // padding: "5px",
        "& *":{
            // textAlign: "center",
            margin: ".15rem"
        }
    },
    // root>*{ //see how to select children above
    //     margin:"5px"
    // }
    SignUpcomp:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "100% 100%",
        height: "100vh",
    },
    signUpcard:{
        backgroundColor: "white",
        width: "21rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "32rem",
        boxShadow: "5px 10px 30px 10px darkslategrey",
        borderRadius: "13px"
    },
    messageLogin:{
        width: "100%",
        height: "15px",
        borderBottom: "1px solid black",
        textAlign:"center",
        opacity: "0.3"
    },
    messageBody: {
        fontSize: "20px",
        backgroundColor: "white",
        padding: "5px",
        fontStyle:"sans-serif cursive",
    },
    ForgotPassword:{
        textAlign: "center",
        margin: "5px",
        marginBottom: "10px"
    },
    message:{
        fontSize: "18px",
        fontStyle: "italic",
        
    }
}));
function SignUp() {
    const { signup, currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    const [Email, setEmail] = useState("");
    const [passwordObj, setPasswordObj] = useState({
        password: "",
        showPassword: false
    });
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const classes = useStyles();
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(Email, passwordObj.password);
            let uid = res.user.uid;
            console.log(uid);
            setLoading(false);
            const uploadTaskListener = storage.ref(`/user/${uid}/profileImage`).put(file);  //here file is stored in state
            uploadTaskListener.on("state_changed", fn1, fn2, fn3);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            function fn1(snapshot) {
                //snapshot is given by firestore and applies to both image and audio all file types
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false)
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();//snapshot means any file audio, video, image==> given by firebase
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: Email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
            }
            setLoading(false);
            console.log('User has Signed up');
        } catch (e) {
            setError(e)
            setTimeout(() => setError(''), 2000);
            setLoading(false)
        }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setPasswordObj({ ...passwordObj, showPassword: !passwordObj.showPassword });
    };
    const handlePasswordChange=(e)=>{
        setPasswordObj({...passwordObj, password:e.target.value})
    }
    return (
        <div className={classes.SignUpcomp}  
        style={{backgroundImage:`url(${bpic})`,
        }}>
        {error?<h1>{error}</h1>:<div className={classes.signUpcard}>
            <div className={styles.appName}>RollingStones</div>
            <p className={classes.message}>A place to share your travel memories</p>
            <div className={classes.messageLogin}>
                <span className={classes.messageBody}>Sign Up</span>
            </div>
        <form className={classes.formBlock} noValidate autoComplete="off" onSubmit={handleSignUp}>
            
            <TextField id="outlined-basic"
                type="email"
                placeholder="Enter Email"
                variant="outlined" required autoFocus
                onChange={(e)=>setEmail(e.target.value)}
                value={Email}
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
            <Link className={classes.ForgotPassword}>Forgot Password?</Link>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                Create Account
            </Button>
        </form>
        <p>Don't have an account? <Link>Sign up</Link></p>
        </div>
    }
    </div>
    )
}

export default SignUp