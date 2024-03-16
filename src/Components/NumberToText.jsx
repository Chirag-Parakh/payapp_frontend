import React, { useEffect, useState } from 'react'

function NumberToText({ toConvert }) {
  const [returnArray, setreturnArray] = useState('')
  const countingArray = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    'Twenty', 'Twenty One', 'Twenty Two', 'Twenty Three', 'Twenty Four', 'Twenty Five', 'Twenty Six', 'Twenty Seven', 'Twenty Eight', 'Twenty Nine',
    'Thirty', 'Thirty One', 'Thirty Two', 'Thirty Three', 'Thirty Four', 'Thirty Five', 'Thirty Six', 'Thirty Seven', 'Thirty Eight', 'Thirty Nine',
    'Forty', 'Forty One', 'Forty Two', 'Forty Three', 'Forty Four', 'Forty Five', 'Forty Six', 'Forty Seven', 'Forty Eight', 'Forty Nine',
    'Fifty', 'Fifty One', 'Fifty Two', 'Fifty Three', 'Fifty Four', 'Fifty Five', 'Fifty Six', 'Fifty Seven', 'Fifty Eight', 'Fifty Nine',
    'Sixty', 'Sixty One', 'Sixty Two', 'Sixty Three', 'Sixty Four', 'Sixty Five', 'Sixty Six', 'Sixty Seven', 'Sixty Eight', 'Sixty Nine',
    'Seventy', 'Seventy One', 'Seventy Two', 'Seventy Three', 'Seventy Four', 'Seventy Five', 'Seventy Six', 'Seventy Seven', 'Seventy Eight', 'Seventy Nine',
    'Eighty', 'Eighty One', 'Eighty Two', 'Eighty Three', 'Eighty Four', 'Eighty Five', 'Eighty Six', 'Eighty Seven', 'Eighty Eight', 'Eighty Nine',
    'Ninety', 'Ninety One', 'Ninety Two', 'Ninety Three', 'Ninety Four', 'Ninety Five', 'Ninety Six', 'Ninety Seven', 'Ninety Eight', 'Ninety Nine'
  ];
  //   console.log(countingArray[toConvert])
  useEffect(() => {
    const convert = () => {
      const len = toConvert.length;
      // console.log(len)
      if (len == 1 || len == 2) {
        const number = parseInt(toConvert);
        setreturnArray(`Rupee ${countingArray[number]} Only`)
      }
      else if (len == 3) {
        const hundered = toConvert[0]
        const TenthOnes = toConvert[1] + toConvert[2]
        setreturnArray(`Rupee ${countingArray[parseInt(hundered)]} Hundred ${countingArray[parseInt(TenthOnes)]} Only`)
      }
      else if (len == 4) {
        const thousandstr = toConvert[0] ;
        const thousandnum = parseInt(thousandstr);
        const hundredstr = toConvert[1]
        const hundrednum = parseInt(hundredstr);
        const tensoncestr = toConvert[2] + toConvert[3];
        const tensoncenum = parseInt(tensoncestr);
        setreturnArray(`Rupee ${countingArray[thousandnum]} Thousand ${countingArray[hundrednum]} ${hundrednum ? 'Hundred' : ''} ${countingArray[tensoncenum]} Only`)

      }
      else if (len == 5) {
        const thousandstr = toConvert[0] + toConvert[1];
        const thousandnum = parseInt(thousandstr);
        const hundredstr = toConvert[2]
        const hundrednum = parseInt(hundredstr);
        const tensoncestr = toConvert[3] + toConvert[4];
        const tensoncenum = parseInt(tensoncestr);
        setreturnArray(`Rupee ${countingArray[thousandnum]} Thousand ${countingArray[hundrednum]} ${hundrednum ? 'Hundred' : ''} ${countingArray[tensoncenum]} Only`)

      }
      else if (len > 5) {
        setreturnArray('You can pay upto One Lakh only')
      }
      else {
        setreturnArray('')
      }
    };
    convert();
  }, [toConvert])
  return (
    <div className='text-[10px] sm:text-xs h-8 text-center mt-2'>
      {returnArray}
    </div>
  )
}

export default NumberToText
