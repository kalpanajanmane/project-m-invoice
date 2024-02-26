import React, { useEffect, useState } from "react";
import axios from "axios";
import { useId } from "./IdContext";
import QRCode from "qrcode.react";

function Invoiceview() {
  const [invoice, setInvoice] = useState(null);
  const { id } = useId(); // Retrieve the invoice ID from context
  const qrCodeValue = `https://project-m-invoice.vercel.app/${id}`;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const API = `https://52.66.122.244:8000/`;
        const response = await axios.get(`${API}invoice`);
        console.log(response)
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

  return (
    <div>
        
      {invoice ? (




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
                <img src="logoPath" alt="Logo" />
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
                : {invoice.invoicedetails.invoiceno} &nbsp;
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
                : {invoice.invoicedetails.invoicedate} &nbsp;
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

    <div class="section3">
        <table class="table01" >
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
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
                <tr class="border-less" >
                    <td>1
                    </td>
                    <td>
                        MS PIPE
                        <br />
                        (DESCRIPTION)
                        <br />
                    </td>
                    <td>7306 </td>
                    <td>20330 </td>
                    <td>29.8</td>
                    <td class="text-end">605,834.00</td>
                </tr>
               


                <tr class="border-less">
                    <td></td>
                    <td class="text-end">
                        <br />
                        ITEM TOTAL
                        <br />
                        <br />
                        OUTPUT CGST @ 9% <br />
                        OUTPUT SGST @ 9% <br />
                        OUTPUT IGST @ 18% <br />

                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-end">
                        605,834.00
                        <br />
                        <br />
                        54,525.06 <br />
                        &nbsp;54,525.06 <br />
                        (-)0.12
                    </td>
                </tr>

                <tr>
                    <td>
                        <p>
                            &nbsp;&nbsp;<br />
                            &nbsp;&nbsp;<br />
                            &nbsp;&nbsp;<br />
                            &nbsp;&nbsp;<br />
                            &nbsp;&nbsp;<br />
                        </p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr class="cus_tr">
                    <td></td>
                    <td>TOTAL</td>
                    <td></td>
                    <td>20330</td>
                    <td></td>
                    <td class="text-end">
                        714,884.00
                    </td>
                </tr>

                <tr class="cus_tr">
                    <td colspan="2">
                        <div class="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
                    </td>
                    <td colspan="4">
                        SEVEN LAKH FOURTEEN THOUSAND EIGHT HUNDRED EIGHTY FOUR
                        RUPEES ONLY
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <br/>

    <div class="section4">
        <table class="table2">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>HSN/SAC</th>
                    <th>TAXABLE VALUE</th>
                    <th colspan="6">TAX CALCULATION</th>
                    <th>AMOUNT</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th colspan="2" class="al-center">CGST</th>
                    <th colspan="2" class="al-center" >SGST</th>
                    <th colspan="2" class="al-center" >IGST</th>
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
                <tr>
                    <td>1</td>
                    <td>7306</td>
                    <td class="text-end">
                        605,834.00
                    </td>

                   {/* <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td> 
                   <td>18%</td>
                    <td class="text-end">
                        <%= commaNumber((18/100 * (item.itemprice* item.itemquantity)).toFixed(2)) %>
                    </td>  */}

                    <td>9%</td>
                    <td class="text-end">
                        54,525.06
                    </td>
                    <td>9%</td>
                    <td class="text-end">
                        54,525.06
                    </td>
                    <td>-</td>
                    <td>-</td>


                    <td class="text-end">
                        109,050.12
                    </td>
                </tr>
                

           
                <tr class="cus_tr">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>TOTAL</td>
                    <td class="text-end">109,050.12</td>
                </tr>
               
                <tr class="cus_tr">
                    <td colspan="3">
                        <div class="amtword">AMOUNT CHARGEABLE (IN WORDS)</div>
                    </td>
                    <td colspan="7">
                        ONE LAKH NINE THOUSAND FIFTY RUPEES AND TWELVE PAISE ONLY

                    </td>
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
