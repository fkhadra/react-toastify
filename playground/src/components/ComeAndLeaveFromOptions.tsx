import { comeAndLeaveFrom } from './constants.ts';
import React from 'react';

export interface ComeAndLeaveFromProps  {
  onChange : (e:React.ChangeEvent<HTMLSelectElement>) => void;
  comeFromValue : string;
  leaveFromValue : string;
}


export const ComeAndLeaveFromOptions: React.FC<ComeAndLeaveFromProps> = ({onChange, comeFromValue, leaveFromValue}) => {
  const options = [
    "comeFrom",
    "leaveFrom"
  ]
  return (

    <div className={`comeAndLeaveFromContainer`}>
      {
        options.map((option) =>  <select
        value={option === "comeFrom"? comeFromValue : leaveFromValue}
        name={option}
        id={option}
        onChange={onChange}
        key={option}
      >
        <option>
          select {option}
        </option>
        {
          Object.values(comeAndLeaveFrom).map(option => <option key={option} value={option}>
            {option}
          </option>)
        }

      </select>
)
      } 
    
    </div>
  )
}