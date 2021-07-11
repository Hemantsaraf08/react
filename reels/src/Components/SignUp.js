import React, { useContext, useState } from 'react'
import AuthProvider, { AuthContext } from '../Context/AuthProvider'
import styles from "./signup.module.css"
import { storage, database } from '../firebase';
function SignUp() {
    const { signup, currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(Email, password);
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
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
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
    return (
        <div className={styles.signupcomp}>
            <div className={styles.appname}>
                RollingStones
            </div>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="">UserName</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="">Email ID</label>
                    <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='profile'>Profile image</label>
                    <input type='file' accept='image/*' onChange={handleFileSubmit}></input>
                </div>
                <button type="submit" disabled={loading}>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp