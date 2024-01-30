import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [chartor, setchartor] = useState(false);
  const [color, setColor] = useState("bg-blue-700");
  const [number, Setnumber] = useState(false);
  const [Password, newpassword] = useState("");
  const passwordref = useRef(null);
  const passwordgenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567891011121314151617181920";
    if (chartor) str += "+_)(*&^%$#@!~:?></";
    for (let i = 1; i <= length; i++) {
      let find = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(find);
    } newpassword(pass);
  }, [length, number, chartor, Password, newpassword]);

  useEffect(() => { passwordgenrator() }, [length, number, chartor, newpassword]);
  // let color = "bg-blue-700";
  const handlecopy = useCallback(() => {
    setColor("bg-green-900");
    passwordref.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password, color]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow md rounded-lg px-4 my-8 text-orange-800 bg-gray-800">
        <h1 className="text-white text-center m-3">Password Genrator</h1>
        <div className="flex shodow rounded-lg overflow-hidden mb-4">
          <input type="text" className="outline-none w-full py-1 px-3 " value={Password} placeholder="Password" ref={passwordref} readOnly></input>
          <button className={`outline-none ${color} text-white px-4 py-0.5 shrink-0`} onClick={handlecopy}>Copy</button>
        </div>
        <div className="flex items-center gap-3">
          <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }}></input>
          <label >Length {length}</label>
          <div className="flex  gap-x-1"><label><input type="checkbox" defaultChecked={chartor} value={chartor} onChange={() => setchartor(!chartor)} /> Charcrter</label></div>
          <div className="flex  gap-x-1"><label><input type="checkbox" defaultChecked={number} value={number} onChange={() => Setnumber(!number)} />number</label></div></div>
      </div>

    </>
  )
}

export default App
