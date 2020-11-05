import { Component, OnInit } from '@angular/core';



import {UrlService} from '../url.service'

declare var Razorpay: any; 
declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
order_id = ""
mainres;
stripe;
primarypaymentmode="card";
  constructor(private urlservice:UrlService) { 
   
  
  
  // document.getElementById('rzp-button1').onclick = function(e){
     
  //     e.preventDefault();
  // }

 this.stripe = Stripe("pk_test_51He0yQHWswhGwF5xMLEsVCG7duIHF0e3sCmJTocVgj59pQ2BhXEMRLnn1p0BmF6GLPDYAFSH5NnwOAt1AVbNGFWE00r5nXI8fe")
 
 urlservice.createorder({"data":"init"}).subscribe((data)=>{
  console.log(data)
  this.order_id=data.data.id


})
  }


  ngOnInit(): void {
    
  }
  async pay()

  {
    var options :any= {
      "key": "rzp_test_Xg0FLdhPVPs7oM", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": this.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // "handler": function (response){
      //   console.log(response)
      //     alert(response.razorpay_payment_id);
      //     alert(response.razorpay_order_id);
      //     alert(response.razorpay_signature);
      //     this.mainres=response;
      //     this.urlservice.securepayment(response).subscribe((data)=>{
      //       console.log(data)
            
          
          
      //     })
          
         

      // },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#F12344"
      }
  };
  options.handler = ((response) => {
    //options.response = response;
    console.log(response);
    console.log(options);
    this.urlservice.securepayment(response).subscribe((data)=>{
            console.log(data)
            
          
          
           })
    // call your backend api to verify payment signature & capture transaction
  });
  // options.modal.ondismiss = (() => {
  //   // handle the case when user closes the form while transaction is in progress
  //   console.log('Transaction cancelled.');
  // });
    var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response){
    console.log(response)
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata);
  });
   rzp1.open();
  //  this.urlservice.securepayment(this.mainres).subscribe((data)=>{
  //   console.log(data)
    
  
  
  // })
   //this.verifypaymentsecurity(this.mainres);
  

  }
  // verifypaymentsecurity(response)
  // {
   
  //  this.urlservice.securepayment(response).subscribe((data)=>{
  //     console.log(data)
      
    
    
  //   })
  // }
  stripepay()
  {
    this.urlservice.stripepay({"data":"test"}).subscribe((data)=>{
      console.log(data)
     
      return this.stripe.redirectToCheckout({ sessionId: data.id });
      
    
    
     })
    
  }
  rpcus()
  {
    var razorpay = new Razorpay({
      key: 'rzp_test_Xg0FLdhPVPs7oM',
        // logo, displayed in the popup
      image: 'https://i.imgur.com/n5tjHFD.png',
    });
    razorpay.once('ready', function(response) {
      console.log(response.methods);
    })

    var data = {
      amount: 50000, // in currency subunits. Here 1000 = 1000 paise, which equals to ₹10
      currency: "INR",// Default is INR. We support more than 90 currencies.
      email: 'gaurav.kumar@example.com',
      contact: '9123456780',
      notes: {
        address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
      },
      order_id: this.order_id,// Replace with Order ID generated in Step 4
      method: 'netbanking',
    
      // method specific fields
      bank: 'HDFC'
    };
    
  
      // has to be placed within user initiated context, such as click, in order for popup to open.
      razorpay.createPayment(data);
    
      razorpay.on('payment.success', function(resp) {
        alert(resp.razorpay_payment_id),
        alert(resp.razorpay_order_id),
        alert(resp.razorpay_signature)}); // will pass payment ID, order ID, and Razorpay signature to success handler.
    
      razorpay.on('payment.error', function(resp){alert(resp.error.description)}); // will pass error object to error handler
    
    
  }
  setpaymentmode(paymentmode){
    this.primarypaymentmode=paymentmode
  }
}
