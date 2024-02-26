import React, { useEffect, useState } from "react";
import axios from "axios";
import { useId } from "./IdContext";

function Invoiceview() {
  const [invoice, setInvoice] = useState(null);
  const { id } = useId(); // Retrieve the invoice ID from context

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

  return (
    <div>
      {invoice ? (
        <div className="invoice">
          <h2>Invoice No: {invoice.invoicedetails.invoiceno}</h2>
          <p>Invoice Date: {invoice.invoicedetails.invoicedate}</p>
          <div className="company-details">
            <h3>Company Details:</h3>
            <p>Name: {invoice.companydetails.companyname}</p>
            <p>
              Registration Type:{" "}
              {invoice.companydetails.companyregistrationtype}
            </p>
            <p>Party Type: {invoice.companydetails.companypartytype}</p>
            <p>GST No: {invoice.companydetails.companygstno}</p>
            <p>Contact: {invoice.companydetails.companycontact}</p>
            <p>State: {invoice.companydetails.companystate}</p>
            <p>Pincode: {invoice.companydetails.companypincode}</p>
            <p>Office Address: {invoice.companydetails.companyofficeaddress}</p>
          </div>
          <div className="seller-details">
            <h3>Seller Details:</h3>
            <p>Company Name: {invoice.sellerdetails.sellercompanyname}</p>
            <p>GST No: {invoice.sellerdetails.sellercompanygstno}</p>
            <p>Address: {invoice.sellerdetails.sellercompanyaddress}</p>
            <p>State Name: {invoice.sellerdetails.sellercompanystatename}</p>
            <p>State Code: {invoice.sellerdetails.sellercompanystatecode}</p>
          </div>
          <div className="buyer-details">
            <h3>Buyer Details:</h3>
            <p>Company Name: {invoice.buyerdetails.buyercompanyname}</p>
            <p>GST No: {invoice.buyerdetails.buyercompanygstno}</p>
            <p>Address: {invoice.buyerdetails.buyercompanyaddress}</p>
            <p>State Name: {invoice.buyerdetails.buyercompanystatename}</p>
            <p>State Code: {invoice.buyerdetails.buyercompanystatecode}</p>
          </div>
          <div className="vehicle-details">
            <h3>Vehicle Details:</h3>
            <p>Driver Number: {invoice.vehicledetails.drivernumber}</p>
            <p>Vehicle Number: {invoice.vehicledetails.vechiclenumber}</p>
            <p>Vehicle Model: {invoice.vehicledetails.vechiclemodel}</p>
          </div>
          <div className="consignment-details">
            <h3>Consignment Details:</h3>
            {invoice.consignmentdetails.itemdetails.map((item, i) => (
              <div key={i} className="item">
                <p>Name: {item.itemname}</p>
                <p>Description: {item.itemdesc}</p>
                <p>Quantity: {item.itemquantity}</p>
                <p>HSN: {item.itemhsn}</p>
                <p>Price: {item.itemprice}</p>
                <p>Tax Rate: {item.itemtaxrate}</p>
                <p>Weight: {item.itemweight}</p>
              </div>
            ))}
          </div>
          <div className="invoice-details">
            <h3>Invoice Details:</h3>
            <p>Invoice ID: {invoice.invoicedetails.invoiceid}</p>
            <p>Invoice Date: {invoice.invoicedetails.invoicedate}</p>
            <p>
              Invoice Create Date: {invoice.invoicedetails.invoicecreatedate}
            </p>
            <p>Invoice Maker Name: {invoice.invoicedetails.invoicemakername}</p>
          </div>
          <div className="boarding-details">
            <h3>Boarding Details:</h3>
            <p>Date of Loading: {invoice.boardingdetails.dateofloading}</p>
            <p>Watermark: {invoice.boardingdetails.watermark}</p>
            <p>Party Name: {invoice.boardingdetails.partyname}</p>
            <p>Party Reference: {invoice.boardingdetails.partyref}</p>
            <p>Party Rate: {invoice.boardingdetails.partyrate}</p>
          </div>
          <div className="loading-details">
            <h3>Loading Details:</h3>
            <p>Start State: {invoice.loadingdetails.startstate}</p>
            <p>End State: {invoice.loadingdetails.endstate}</p>
            <p>Rate: {invoice.loadingdetails.rate}</p>
            <p>Start Point: {invoice.loadingdetails.startpoint}</p>
            <p>End Point: {invoice.loadingdetails.endpoint}</p>
          </div>
          <div className="pdfUrl">
            <p>PDF URL: {invoice.pdfUrl}</p>
          </div>
          <div className="preSignedUrl">
            <p>Pre-Signed URL: {invoice.preSignedUrl}</p>
          </div>
        </div>
      ) : (
        <p>No invoice found with the provided ID</p>
      )}
    </div>
  );
}

export default Invoiceview;
