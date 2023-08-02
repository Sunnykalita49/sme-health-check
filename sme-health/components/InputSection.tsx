import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import Accept from "./DropZone";
// import {myAxios} from '../utils/myAxios'
import axios from "axios";

const InputSection = () => {
  const [data, setData] = useState<any>({});
  const [step, setStep] = useState(1)

  useEffect(() => {
    //   console.log(data);
  }, [data]);

  const [checked, setChecked] = useState(false);

  const getValue = (value: any) => {
    setData({
      ...data,
      [value.label]: value.value,
    });
  };
  const handleClick = () => {
    console.log(data, "dddd");
    let formData = new FormData();

    for (let i in data) {
      formData.set(i, data[i]);
    }
    axios
      .post("http://localhost:8000/submit", formData)
      .then((res: any) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const step1Check = () =>{
    if(data['Company UEN'] && data['Company Name']) return true
    return false
  }

  const step2Check = () =>{
    if(data['Full Name'] && data['Position within company'] && data['Email Address'] && data['Re-Enter Email Address'] && data['Mobile Number'])return true
    return false
  }
  const step3Check = () =>{
    if(data['uploadFile'])return true

    return false
  }

  const dataCheck = () =>{
    let updateStep = 1
    if(step1Check()){
        updateStep = 2
    }
    if(step2Check()){
        updateStep = 3
    }
    if(step3Check()){
        updateStep = 4
    }
   
    setStep(updateStep)
  }



  useEffect(()=>{

    dataCheck();

  },[data])

  return (
    <div className="container">
      <div className="first-container">
        <div className="section-header">
          <div className={step>1?"round completed-section-round makeGreen": step  === 1 ? "round completed-section-round makeRed" : "round completed-section-round disabled"}>1</div>
        </div>
        <div className="section-input">
          <div className="section-heading">Company Information</div>
          <div className="inputs">
            <InputField label="Company UEN" change={getValue} />
            <InputField label="Company Name" change={getValue} />
          </div>
        </div>
      </div>
      <div className="first-container">
        <div className="section-header">
          <div className={step>2?"round completed-section-round makeGreen": step  === 2 ? "round completed-section-round makeRed" : "round completed-section-round disabled"} >2</div>
        </div>
        <div className="section-input">
            <div className="section-heading">Application Information</div>
            <div className="inputs">
                <InputField label="Full Name" change={getValue} disabled={step>1?false:true} />
                <InputField label="Position within company" change={getValue} disabled={step>1?false:true} />
            </div>
            <div className="inputs">
                <InputField label="Email Address" change={getValue} disabled={step>1?false:true}/>
                <InputField label="Re-Enter Email Address" change={getValue} disabled={step>1?false:true} />
            </div>
            <div className="inputs">
            <InputField label="Mobile Number" change={getValue} disabled={step>1?false:true} />
            </div>
        </div>
      </div>
      <div className="first-container">
        <div className="section-header">
          <div className={step>3?"round completed-section-round makeGreen": step  === 3 ? "round completed-section-round makeRed" : "round completed-section-round disabled"}>3</div>
        </div>
        <div>
          <div className="section-heading">Upload Documents</div>
          <div>
            <Accept change={getValue} label="uploadFile" disabled={step>2?false:true}/>
          </div>
          <div>
            <ul>
              <li>
                PDFs (not scanned copies) of company's operating bank current
                account(s) statements for the past 6 months. Example: If today
                is 02 Aug 23, then please upload bank statements from Feb 23 to
                Jul 23 (both months inclusive)
              </li>
              <li>
                If your company is multi-banked, then please upload 6 months
                bank statements for each bank account
              </li>
              <li>
                If your file is password protected, we request you to remove the
                password and upload the file to avoid submission failure
              </li>
              <li>
                In case if you are facing any issue while uploading bank
                statements, Please contact us on support@credilinq.ai
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="first-container">
        <div className="section-header">
          <div className={checked?"round completed-section-round makeGreen": step  === 4 ? "round completed-section-round makeRed" : "round completed-section-round disabled"}>4</div>
        </div>
        <div>
          <div className="section-heading">Terms and Conditions</div>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => { step === 4 && setChecked(e.target.checked)}}
          />
          <span>
            By ticking, you are confirming that you have understood and are
            agreeing to the details mentioned:
          </span>
        <div>
          <ul>
            <li>
              I confirm that I am the authorized person to upload bank
              statements on behalf of my company
            </li>
            <li>
              I assure you that uploaded bank statements and provided company
              information match and are of the same company, if there is a
              mismatch then my report will not be generated
            </li>
            <li>
              I understand that this is a general report based on the bank
              statements and Credilinq is not providing a solution or guiding me
              for my business growth
            </li>
            <li>I have read and understand the Terms & Conditions</li>
          </ul>
        </div>
        </div>
      </div>
        <button disabled={!checked} onClick={handleClick}>
          Submit
        </button>
    </div>
  );
};

export default InputSection;
