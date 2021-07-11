import React, { useState } from 'react'

function TestQ1() {
    const [name, setName] = useState("Backbencher");
    const [age, setAge] = useState(23);
    return (
        <div>
            <form>
                <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input
                    type="text"
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                />
                <h2>
                    Name: {name}, Age: {age}
                </h2>
            </form>
        </div>
    )
}

export default TestQ1
