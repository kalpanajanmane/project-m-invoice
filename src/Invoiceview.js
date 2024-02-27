import React, { useEffect, useState } from "react";
import axios from "axios";
import { useId } from "./IdContext";
import QRCode from "qrcode.react";
import commaNumber from 'comma-number';


function Invoiceview() {
  const [invoice, setInvoice] = useState(null);
  const { id } = useId(); // Retrieve the invoice ID from context
  const qrCodeValue = `https://project-m-invoice.vercel.app/${id}`;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const API = `https://52.66.122.244:8000/`;
        const response = await axios.get(`${API}invoice`);
        const filteredInvoice = response.data.find(
          (inv) => inv.invoicedetails.invoiceno === id
        );
        setInvoice(filteredInvoice);
      } catch (error) {
        console.error("Error fetching Invoice data:", error);
      }
    };
    fetchInvoice();
  }, [id]);

 // Calculate interStateTax based on company pin code and buyer company state code
 const interStateTax = invoice ? 
    (parseInt(invoice.companydetails.companypincode) === parseInt(invoice.buyerdetails.buyercompanystatecode)) 
    ? false : true : false;


 // Initialize variables
 let itemQuantitySum = 0;
 let itemAmountSum = 0;
 let itemTaxSum = 0;
 let adjustedValue = 0;
 let totalAmount = 0;

if (invoice && invoice.consignmentdetails && invoice.consignmentdetails.itemdetails && invoice.consignmentdetails.itemdetails.length > 0) {
    invoice.consignmentdetails.itemdetails.forEach((item, index) => {
        itemQuantitySum += item.itemquantity;
        const itemAmount = Math.round(item.itemprice * item.itemquantity * 100) / 100;
        itemAmountSum += itemAmount;
        itemTaxSum += Math.round(18 * itemAmount) / 100;
    });
}

// Calculate adjustedValue
const roundedOffItemAndTax = Math.round(itemAmountSum + itemTaxSum);
if (roundedOffItemAndTax <= itemAmountSum + itemTaxSum) {
    adjustedValue = -(itemAmountSum + itemTaxSum - roundedOffItemAndTax);
} else {
    adjustedValue = -(itemAmountSum + itemTaxSum - roundedOffItemAndTax);
}

// Calculate totalAmount
totalAmount = itemAmountSum + itemTaxSum + adjustedValue;

let totalAmountTax = 0
// Check if invoice.consignmentdetails exists before proceeding
// Check if invoice exists before accessing its properties
if (invoice && invoice.consignmentdetails) {
    // Calculate total tax amount
    totalAmountTax = invoice.consignmentdetails.itemdetails.reduce((total, item) => {
        const taxAmount = (18/100 * item.itemprice * item.itemquantity);
        return total + taxAmount;
    }, 0);
    
    // Now you can use totalAmountTax as needed
} else {
    // Handle the case where invoice or invoice.consignmentdetails is null or undefined
    console.log("Invoice or consignment details are missing.");
}


// Calculate the total amount in words with paisa
const totalAmountInWords = amountToWordsWithPaisa(totalAmountTax);

function numberToWords(num) {
    const units = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const teens = ['', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', 'TEN', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

    const getUnit = (n) => units[n];
    const getTeen = (n) => teens[n - 10];
    const getTens = (n) => tens[Math.floor(n / 10)];
    const getHundreds = (n) => units[Math.floor(n / 100)] + ' HUNDRED';

    if (num === 0) return 'ZERO';

    let words = '';
    if (num >= 10000000) {
        words += numberToWords(Math.floor(num / 10000000)) + ' CRORE ';
        num %= 10000000;
    }
    if (num >= 100000) {
        words += numberToWords(Math.floor(num / 100000)) + ' LAKH ';
        num %= 100000;
    }
    if (num >= 1000) {
        words += numberToWords(Math.floor(num / 1000)) + ' THOUSAND ';
        num %= 1000;
    }
    if (num >= 100) {
        words += getHundreds(num) + ' ';
        num %= 100;
    }
    if (num >= 20) {
        words += getTens(num) + ' ';
        num %= 10;
    }
    if (num >= 11 && num <= 19) {
        words += getTeen(num) + ' ';
        num = 0;
    }
    if (num >= 1 && num <= 9) {
        words += getUnit(num) + ' ';
    }
    return words.trim().toUpperCase();
}

function paisaToWords(paisa) {
    const tens = ['', 'TEN', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    const units = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const getUnit = (n) => units[n];
    const getTens = (n) => tens[Math.floor(n / 10)];

    if (paisa === 0) return '';

    let words = '';
    if (paisa >= 20) {
        words += getTens(paisa) + ' ';
        paisa %= 10;
    }
    if (paisa >= 1 && paisa <= 9) {
        words += getUnit(paisa) + ' ';
    }
    return words.trim().toUpperCase();
}

function amountToWordsWithPaisa(amount) {
    const rupees = Math.floor(amount);
    const paisa = Math.round((amount - rupees) * 100);

    let amountWords = numberToWords(rupees);
    if (paisa > 0) {
        amountWords += ' RUPEES AND ' + paisaToWords(paisa) + ' PAISE';
    } else {
        amountWords += ' RUPEES';
    }
    return amountWords + ' ONLY';
}

// Convert total amount to words
let amountInWords = numberToWords(totalAmount);
amountInWords += ' RUPEES ONLY';


let formattedDateStr = null; // Define formattedDateStr outside of the if block

// Check if invoice exists before accessing its properties
if (invoice && invoice.invoicedetails) {
    const originalDateStr = invoice.invoicedetails.invoicedate;
    const originalDate = new Date(originalDateStr);

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    formattedDateStr = formatDate(originalDate); // Update formattedDateStr within the if block
} else {
    console.log("Invoice or invoicedetails are missing.");
}

// Now you can safely use formattedDateStr outside of the if block
// However, ensure that the logic using formattedDateStr is placed after the if block


  return (
    <div>
      {invoice ? (


<div>

<div class="container">
<p class="copy">
    <b>ORIGINAL COPY</b>
</p>
<div class="content">
    <div id="background">
        <p id="bg-text">MAHAVEER TRADING COMPANY</p>
    </div>
    <p class="style">
        TAX INVOICE
    </p>
    <div class="invoice-header">

        <div class="d-flex">
            <div class="logo">
                <img src="https://github.com/AJ-ES/project-m-client/blob/master/public/logo.png?raw=true" alt="Logo" />
            </div>
            <div class="comAddress">
                <p class="companyname1">
                    <b>
                    {invoice.companydetails.companyname}
                    </b>
                    <br />
                    {invoice.companydetails.companyofficeaddress} <br />
                    GSTIIN/UN : {invoice.companydetails.companygstno} <br />
                    State Name : {invoice.companydetails.companystate}, Code : {invoice.companydetails.companypincode}
                </p>
            </div>
        </div>



        <div class="qr">
             <QRCode class="img" value={qrCodeValue} size={80} fgColor="#000" />
        </div>
    </div>

    <div class="section1  d-flex">
        <div class="s1-part1">
            <div class="left">
                <b>Invoice No</b>
                : {invoice.invoicedetails.invoiceid} &nbsp;
            </div>
            <div>
                <p class="alignleft mb-1">
                    <b>BUYER</b> (if other than Consignee)<br />
                    {invoice.buyerdetails.buyercompanyname} <br />
                    {invoice.buyerdetails.buyercompanyaddress}<br />
                    GSTIN/UIN : {invoice.buyerdetails.buyercompanygstno} <br />
                    State Name : {invoice.buyerdetails.buyercompanystatename}, Code : {invoice.buyerdetails.buyercompanystatecode}
                </p>
            </div>

        </div>
        <div class="s1-part2">
            <div class="right">
                <b>Date</b>
                : {formattedDateStr} &nbsp;
            </div>
            <div>
                <p class="alignright mb-1">
                    <b>Consignee</b> <br />
                    {invoice.sellerdetails.sellercompanyname} <br />
                    {invoice.sellerdetails.sellercompanyaddress}<br />
                    GSTIN/UIN : {invoice.sellerdetails.sellercompanygstno}
                    <br />
                    State Name : {invoice.sellerdetails.sellercompanystatename}, Code : {invoice.sellerdetails.sellercompanystatecode}
                </p>
            </div>
        </div>



    </div>

    <div class="section2">
        <div class="line-text">
            <b>Vehicle Number :</b>:{invoice.vehicledetails.vechiclenumber} &nbsp;&nbsp; <b> Driver Number: </b>{invoice.vehicledetails.drivernumber} &nbsp;&nbsp;
            <b>Load From </b> :{invoice.loadingdetails.startpoint}&nbsp; <b>To </b> :{invoice.loadingdetails.endpoint}&nbsp;&nbsp;&nbsp;<b>Ref. </b>:{invoice.boardingdetails.partyref}
        </div>
    </div>

    <div className="section3">
        <table className="table01">
          <thead>
            <tr>
              <th>S/N</th>
              <th>DESCRIPTION OF GOODS</th>
              <th>HSN/SAC</th>
              <th>QUANTITY(Kgs.)</th>
              <th>PRICE(Per Kg)</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.consignmentdetails.itemdetails.map((item, index) => (
              <tr key={index} className="border-less">
                <td>{index + 1}</td>
                <td>
                  {item.itemname}
                  <br />
                  {item.itemdesc}
                  <br />
                </td>
                <td>{item.itemhsn}</td>
                <td>{item.itemquantity}</td>
                <td>{item.itemprice}</td>
                <td className="text-end">{commaNumber((item.itemprice * item.itemquantity).toFixed(2))}</td>
              </tr>
            ))}
            <tr className="border-less">
              <td></td>
              <td className="text-end">
    <br />
    ITEM TOTAL
    <br />
    <br />
    {interStateTax === false ? (
        <div>
            OUTPUT CGST @ 9%
            <br />
            OUTPUT SGST @ 9%
            <br />
            ROUND OFF
        </div>
    ) : (
        <div>
            OUTPUT IGST @ 18%
            <br />
            ROUND OFF
        </div>
    )}
</td>

              <td></td>
              <td></td>
              <td></td>
              <td className="text-end">
      {commaNumber(itemAmountSum.toFixed(2))}
      <br />
      <br />
      {interStateTax === false ? (
            <div>
                {commaNumber((9/100 * itemAmountSum).toFixed(2))}
                <br />
                {commaNumber((9/100 * itemAmountSum).toFixed(2))}
                <br />
                {adjustedValue.toFixed(2) < 0 ? '(-)' : '(+)'}{Math.abs(adjustedValue.toFixed(2))}
            </div>
        ) : (
            <div>
                {commaNumber((18/100 * itemAmountSum).toFixed(2))}
                <br />
                {adjustedValue.toFixed(2) < 0 ? '(-)' : '(+)'}{Math.abs(adjustedValue.toFixed(2))}
            </div>
        )    
    } 
    </td>
            </tr>
            <tr>
              <td>
                <p>&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br /></p>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="cus_tr">
              <td></td>
              <td>TOTAL</td>
              <td></td>
              <td>{itemQuantitySum}</td>
              <td></td>
              <td className="text-end">{commaNumber(totalAmount.toFixed(2))}</td>
            </tr>
            <tr className="cus_tr">
              <td colSpan="2">
                <div className="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
              </td>
              <td colSpan="4">{amountInWords}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="section4">
    <table className="table2">
        <thead>
            <tr>
                <th>S/N</th>
                <th>HSN/SAC</th>
                <th>TAXABLE VALUE</th>
                <th colSpan="6">TAX CALCULATION</th>
                <th>AMOUNT</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th colSpan="2" className="al-center">CGST</th>
                <th colSpan="2" className="al-center">SGST</th>
                <th colSpan="2" className="al-center">IGST</th>
                <th></th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th></th>
            </tr>
            
        </thead>
        <tbody>
            {invoice.consignmentdetails.itemdetails.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.itemhsn}</td>
                    <td className="text-end">{commaNumber((item.itemprice * item.itemquantity).toFixed(2))}</td>
                    {interStateTax === false ? (
                        <>
                            <td>9%</td>
                            <td className="text-end">{commaNumber((9/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                            <td>9%</td>
                            <td className="text-end">{commaNumber((9/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                            <td>-</td>
                            <td>-</td>
                        </>
                    ) : (
                        <>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>18%</td>
                            <td className="text-end">{commaNumber((18/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                        </>
                    )}
                    <td className="text-end">{commaNumber((18/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                </tr>
                
            ))}
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-end">TOTAL</th>
                <th className="text-end">{commaNumber(totalAmountTax.toFixed(2))}</th>
            </tr>
            <tr className="cus_tr">
                <td colSpan="3">
                    <div className="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
                </td>
                <td colSpan="7">{totalAmountInWords}</td>
            </tr>
        </tbody>
    </table>
</div>

    <div class="section5">
        <div class="s5-part1 flex">
            <p class="disclaimer"><b>DISCLAIMER</b></p>
            <p >
                <b> FOR {invoice.companydetails.companyname}</b>
            </p>
        </div>
        <div class="bottomleft">
            <p class="disfont">
                WE DECLARED THAT THIS INVOICE SHOWS THE ACTUAL PRICE <br />
                OF THE GOOD DESCRIBED AND THAT ALL PARTICULAR ARE
            </p>
           
        </div>

        <div class="bottomright">
            <p>Authorized Signature</p>

        </div>
        <div class="center">
            <p>This is a computer generated invoice</p>
        </div>

    </div>

</div>
</div>
<div class="container">
<p class="copy">
    <b>DUPLICATE COPY</b>
</p>
<div class="content">
    <div id="background">
        <p id="bg-text">MAHAVEER TRADING COMPANY</p>
    </div>
    <p class="style">
        TAX INVOICE
    </p>
    <div class="invoice-header">

        <div class="d-flex">
            <div class="logo">
                <img src="https://github.com/AJ-ES/project-m-client/blob/master/public/logo.png?raw=true" alt="Logo" />
            </div>
            <div class="comAddress">
                <p class="companyname1">
                    <b>
                    {invoice.companydetails.companyname}
                    </b>
                    <br />
                    {invoice.companydetails.companyofficeaddress} <br />
                    GSTIIN/UN : {invoice.companydetails.companygstno} <br />
                    State Name : {invoice.companydetails.companystate}, Code : {invoice.companydetails.companypincode}
                </p>
            </div>
        </div>



        <div class="qr">
             <QRCode class="img" value={qrCodeValue} size={80} fgColor="#000" />
        </div>
    </div>

    <div class="section1  d-flex">
        <div class="s1-part1">
            <div class="left">
                <b>Invoice No</b>
                : {invoice.invoicedetails.invoiceid} &nbsp;
            </div>
            <div>
                <p class="alignleft mb-1">
                    <b>BUYER</b> (if other than Consignee)<br />
                    {invoice.buyerdetails.buyercompanyname} <br />
                    {invoice.buyerdetails.buyercompanyaddress}<br />
                    GSTIN/UIN : {invoice.buyerdetails.buyercompanygstno} <br />
                    State Name : {invoice.buyerdetails.buyercompanystatename}, Code : {invoice.buyerdetails.buyercompanystatecode}
                </p>
            </div>

        </div>
        <div class="s1-part2">
            <div class="right">
                <b>Date</b>
                : {formattedDateStr} &nbsp;
            </div>
            <div>
                <p class="alignright mb-1">
                    <b>Consignee</b> <br />
                    {invoice.sellerdetails.sellercompanyname} <br />
                    {invoice.sellerdetails.sellercompanyaddress}<br />
                    GSTIN/UIN : {invoice.sellerdetails.sellercompanygstno}
                    <br />
                    State Name : {invoice.sellerdetails.sellercompanystatename}, Code : {invoice.sellerdetails.sellercompanystatecode}
                </p>
            </div>
        </div>



    </div>

    <div class="section2">
        <div class="line-text">
            <b>Vehicle Number :</b>:{invoice.vehicledetails.vechiclenumber} &nbsp;&nbsp; <b> Driver Number: </b>{invoice.vehicledetails.drivernumber} &nbsp;&nbsp;
            <b>Load From </b> :{invoice.loadingdetails.startpoint}&nbsp; <b>To </b> :{invoice.loadingdetails.endpoint}&nbsp;&nbsp;&nbsp;<b>Ref. </b>:{invoice.boardingdetails.partyref}
        </div>
    </div>

    <div className="section3">
        <table className="table01">
          <thead>
            <tr>
              <th>S/N</th>
              <th>DESCRIPTION OF GOODS</th>
              <th>HSN/SAC</th>
              <th>QUANTITY(Kgs.)</th>
              <th>PRICE(Per Kg)</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.consignmentdetails.itemdetails.map((item, index) => (
              <tr key={index} className="border-less">
                <td>{index + 1}</td>
                <td>
                  {item.itemname}
                  <br />
                  {item.itemdesc}
                  <br />
                </td>
                <td>{item.itemhsn}</td>
                <td>{item.itemquantity}</td>
                <td>{item.itemprice}</td>
                <td className="text-end">{commaNumber((item.itemprice * item.itemquantity).toFixed(2))}</td>
              </tr>
            ))}
            <tr className="border-less">
              <td></td>
              <td className="text-end">
    <br />
    ITEM TOTAL
    <br />
    <br />
    {interStateTax === false ? (
        <div>
            OUTPUT CGST @ 9%
            <br />
            OUTPUT SGST @ 9%
            <br />
            ROUND OFF
        </div>
    ) : (
        <div>
            OUTPUT IGST @ 18%
            <br />
            ROUND OFF
        </div>
    )}
</td>

              <td></td>
              <td></td>
              <td></td>
              <td className="text-end">
      {commaNumber(itemAmountSum.toFixed(2))}
      <br />
      <br />
      {interStateTax === false ? (
            <div>
                {commaNumber((9/100 * itemAmountSum).toFixed(2))}
                <br />
                {commaNumber((9/100 * itemAmountSum).toFixed(2))}
                <br />
                {adjustedValue.toFixed(2) < 0 ? '(-)' : '(+)'}{Math.abs(adjustedValue.toFixed(2))}
            </div>
        ) : (
            <div>
                {commaNumber((18/100 * itemAmountSum).toFixed(2))}
                <br />
                {adjustedValue.toFixed(2) < 0 ? '(-)' : '(+)'}{Math.abs(adjustedValue.toFixed(2))}
            </div>
        )    
    } 
    </td>
            </tr>
            <tr>
              <td>
                <p>&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br />&nbsp;&nbsp;<br /></p>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="cus_tr">
              <td></td>
              <td>TOTAL</td>
              <td></td>
              <td>{itemQuantitySum}</td>
              <td></td>
              <td className="text-end">{commaNumber(totalAmount.toFixed(2))}</td>
            </tr>
            <tr className="cus_tr">
              <td colSpan="2">
                <div className="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
              </td>
              <td colSpan="4">{amountInWords}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="section4">
    <table className="table2">
        <thead>
            <tr>
                <th>S/N</th>
                <th>HSN/SAC</th>
                <th>TAXABLE VALUE</th>
                <th colSpan="6">TAX CALCULATION</th>
                <th>AMOUNT</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th colSpan="2" className="al-center">CGST</th>
                <th colSpan="2" className="al-center">SGST</th>
                <th colSpan="2" className="al-center">IGST</th>
                <th></th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th>RATE</th>
                <th>AMOUNT</th>
                <th></th>
            </tr>
            
        </thead>
        <tbody>
            {invoice.consignmentdetails.itemdetails.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.itemhsn}</td>
                    <td className="text-end">{commaNumber((item.itemprice * item.itemquantity).toFixed(2))}</td>
                    {interStateTax === false ? (
                        <>
                            <td>9%</td>
                            <td className="text-end">{commaNumber((9/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                            <td>9%</td>
                            <td className="text-end">{commaNumber((9/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                            <td>-</td>
                            <td>-</td>
                        </>
                    ) : (
                        <>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>18%</td>
                            <td className="text-end">{commaNumber((18/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                        </>
                    )}
                    <td className="text-end">{commaNumber((18/100 * item.itemprice * item.itemquantity).toFixed(2))}</td>
                </tr>
                
            ))}
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-end">TOTAL</th>
                <th className="text-end">{commaNumber(totalAmountTax.toFixed(2))}</th>
            </tr>
            <tr className="cus_tr">
                <td colSpan="3">
                    <div className="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
                </td>
                <td colSpan="7">{totalAmountInWords}</td>
            </tr>
        </tbody>
    </table>
</div>

    <div class="section5">
        <div class="s5-part1 flex">
            <p class="disclaimer"><b>DISCLAIMER</b></p>
            <p >
                <b> FOR {invoice.companydetails.companyname}</b>
            </p>
        </div>
        <div class="bottomleft">
            <p class="disfont">
                WE DECLARED THAT THIS INVOICE SHOWS THE ACTUAL PRICE <br />
                OF THE GOOD DESCRIBED AND THAT ALL PARTICULAR ARE
            </p>
           
        </div>

        <div class="bottomright">
            <p>Authorized Signature</p>

        </div>
        <div class="center">
            <p>This is a computer generated invoice</p>
        </div>

    </div>

</div>
</div>



</div>


        // <div className="invoice">
        //   <h2>Invoice No: {invoice.invoicedetails.invoiceno}</h2>
        //   <p>Invoice Date: {invoice.invoicedetails.invoicedate}</p>
        //   <div className="company-details">
        //     <h3>Company Details:</h3>
        //     <p>Name: {invoice.companydetails.companyname}</p>
        //     <p>
        //       Registration Type:{" "}
        //       {invoice.companydetails.companyregistrationtype}
        //     </p>
        //     <p>Party Type: {invoice.companydetails.companypartytype}</p>
        //     <p>GST No: {invoice.companydetails.companygstno}</p>
        //     <p>Contact: {invoice.companydetails.companycontact}</p>
        //     <p>State: {invoice.companydetails.companystate}</p>
        //     <p>Pincode: {invoice.companydetails.companypincode}</p>
        //     <p>Office Address: {invoice.companydetails.companyofficeaddress}</p>
        //   </div>
        //   <div className="seller-details">
        //     <h3>Seller Details:</h3>
        //     <p>Company Name: {invoice.sellerdetails.sellercompanyname}</p>
        //     <p>GST No: {invoice.sellerdetails.sellercompanygstno}</p>
        //     <p>Address: {invoice.sellerdetails.sellercompanyaddress}</p>
        //     <p>State Name: {invoice.sellerdetails.sellercompanystatename}</p>
        //     <p>State Code: {invoice.sellerdetails.sellercompanystatecode}</p>
        //   </div>
        //   <div className="buyer-details">
        //     <h3>Buyer Details:</h3>
        //     <p>Company Name: {invoice.buyerdetails.buyercompanyname}</p>
        //     <p>GST No: {invoice.buyerdetails.buyercompanygstno}</p>
        //     <p>Address: {invoice.buyerdetails.buyercompanyaddress}</p>
        //     <p>State Name: {invoice.buyerdetails.buyercompanystatename}</p>
        //     <p>State Code: {invoice.buyerdetails.buyercompanystatecode}</p>
        //   </div>
        //   <div className="vehicle-details">
        //     <h3>Vehicle Details:</h3>
        //     <p>Driver Number: {invoice.vehicledetails.drivernumber}</p>
        //     <p>Vehicle Number: {invoice.vehicledetails.vechiclenumber}</p>
        //     <p>Vehicle Model: {invoice.vehicledetails.vechiclemodel}</p>
        //   </div>
        //   <div className="consignment-details">
        //     <h3>Consignment Details:</h3>
        //     {invoice.consignmentdetails.itemdetails.map((item, i) => (
        //       <div key={i} className="item">
        //         <p>Name: {item.itemname}</p>
        //         <p>Description: {item.itemdesc}</p>
        //         <p>Quantity: {item.itemquantity}</p>
        //         <p>HSN: {item.itemhsn}</p>
        //         <p>Price: {item.itemprice}</p>
        //         <p>Tax Rate: {item.itemtaxrate}</p>
        //         <p>Weight: {item.itemweight}</p>
        //       </div>
        //     ))}
        //   </div>
        //   <div className="invoice-details">
        //     <h3>Invoice Details:</h3>
        //     <p>Invoice ID: {invoice.invoicedetails.invoiceid}</p>
        //     <p>Invoice Date: {invoice.invoicedetails.invoicedate}</p>
        //     <p>
        //       Invoice Create Date: {invoice.invoicedetails.invoicecreatedate}
        //     </p>
        //     <p>Invoice Maker Name: {invoice.invoicedetails.invoicemakername}</p>
        //   </div>
        //   <div className="boarding-details">
        //     <h3>Boarding Details:</h3>
        //     <p>Date of Loading: {invoice.boardingdetails.dateofloading}</p>
        //     <p>Watermark: {invoice.boardingdetails.watermark}</p>
        //     <p>Party Name: {invoice.boardingdetails.partyname}</p>
        //     <p>Party Reference: {invoice.boardingdetails.partyref}</p>
        //     <p>Party Rate: {invoice.boardingdetails.partyrate}</p>
        //   </div>
        //   <div className="loading-details">
        //     <h3>Loading Details:</h3>
        //     <p>Start State: {invoice.loadingdetails.startstate}</p>
        //     <p>End State: {invoice.loadingdetails.endstate}</p>
        //     <p>Rate: {invoice.loadingdetails.rate}</p>
        //     <p>Start Point: {invoice.loadingdetails.startpoint}</p>
        //     <p>End Point: {invoice.loadingdetails.endpoint}</p>
        //   </div>
        //   <div className="pdfUrl">
        //     <p>PDF URL: {invoice.pdfUrl}</p>
        //   </div>
        //   <div className="preSignedUrl">
        //     <p>Pre-Signed URL: {invoice.preSignedUrl}</p>
        //   </div>
        //   <QRCode value={qrCodeValue} size={256} fgColor="#000" />
        // </div> 
        
      ) : (
        <p>No invoice found with the provided ID</p>
      )}
    </div>
  );
}

export default Invoiceview;
