import React from 'react'
import "./Keypad.css";
import Backspace from "@material-ui/icons/Backspace";

interface Props {
  onChange: any;
  clear: any;
}
export const Keypad = ({ onChange,clear } : Props) => {
  return (
    <div className="pad">
      <div className="row">
        <button value={1} className="key" onClick={(e) => onChange(e)}>
          1
        </button>
        <button value={2} className="key" onClick={(e) => onChange(e)}>
          2
        </button>
        <button value={3} className="key" onClick={(e) => onChange(e)}>
          3
        </button>
      </div>
      <div className="row">
        <button value={4} className="key" onClick={(e) => onChange(e)}>
          4
        </button>
        <button value={5} className="key" onClick={(e) => onChange(e)}>
          5
        </button>
        <button value={6} className="key" onClick={(e) => onChange(e)}>
          6
        </button>
      </div>
      <div className="row">
        <button value={7} className="key" onClick={(e) => onChange(e)}>
          7
        </button>
        <button value={8} className="key" onClick={(e) => onChange(e)}>
          8
        </button>
        <button value={9} className="key" onClick={(e) => onChange(e)}>
          9
        </button>
      </div>
      <div className="row">
        <button
          className="key-action"
          disabled={true}
        >
        </button>
        <button value={0} className="key" onClick={(e) => onChange(e)}>
          0
        </button>
        <button className="key-action" onClick={(e) => clear(e)}>
          <Backspace />
        </button>
      </div>
    </div>
  )
}
