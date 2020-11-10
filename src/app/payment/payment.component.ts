import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';


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
credit_debit_form;
stripeclientid;
stripecarrdnumber;
  constructor(private urlservice:UrlService) { 

    this.credit_debit_form = new FormGroup({
      cardnumber:new FormControl('',[Validators.required,]),
      expiry:new FormControl('',[Validators.required]),
      cvv:new FormControl('',Validators.required),
      nameoncard:new FormControl('',Validators.required)
     
      
    })
    
  
  
  // document.getElementById('rzp-button1').onclick = function(e){
     
  //     e.preventDefault();
  // }

 this.stripe = Stripe("pk_test_51He0yQHWswhGwF5xMLEsVCG7duIHF0e3sCmJTocVgj59pQ2BhXEMRLnn1p0BmF6GLPDYAFSH5NnwOAt1AVbNGFWE00r5nXI8fe")
 
 urlservice.createorder({"data":"init"}).subscribe((data)=>{
  console.log(data)
  this.order_id=data.data.id


})

this.stripepaymentint();
  }


  ngOnInit(): void {
 
  }
  ngAfterViewInit(){
    setTimeout(() => {
      var getEl = document.getElementById.bind(document)

    var formatter = Razorpay.setFormatter(getEl('card_payment'))
    formatter.add('card', getEl('card_number'))
    formatter.add('expiry', getEl('card_expiry'))
    formatter.add('number', getEl('card_cvv'))
    }, 2000);
    
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
      //     console.log(response.razorpay_payment_id);
      //     console.log(response.razorpay_order_id);
      //     console.log(response.razorpay_signature);
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
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata);
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
        console.log(resp.razorpay_payment_id),
        console.log(resp.razorpay_order_id),
        console.log(resp.razorpay_signature)}); // will pass payment ID, order ID, and Razorpay signature to success handler.
    
      razorpay.on('payment.error', function(resp){console.log(resp.error.description)}); // will pass error object to error handler
    
    
  }
  setpaymentmode(paymentmode){
    this.primarypaymentmode=paymentmode
  }
  dummyfunc()
  {
    console.log(this.credit_debit_form.value)
    var cardnum = this.credit_debit_form.value.cardnumber;
    var expslit = this.credit_debit_form.value.expiry.split('/')
    //.replace(/\s+/g, '')
    var expmonth = expslit[0].trim()
    var expyear =  expslit[1].trim()
    console.log(cardnum,expslit,expmonth,expyear)
    var razorpay = new Razorpay({
      key: 'rzp_test_Xg0FLdhPVPs7oM',
        // logo, displayed in the popup
      image: 'https://i.imgur.com/n5tjHFD.png',
      redirect:true
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
      method: 'card',
      'card[number]': cardnum, 
      'card[name]': this.credit_debit_form.value.nameoncard,
      'card[expiry_month]': expmonth,
      'card[expiry_year]' :expyear,
      'card[cvv]': this.credit_debit_form.value.cvv,
      "callback_url": 'http://localhost:4123/paymentsucess',
     
      
     };
    //"callback_url": 'http://localhost:4123/paymentsucess',
  
      // has to be placed within user initiated context, such as click, in order for popup to open.
      razorpay.createPayment(data);
    
      razorpay.on('payment.success', function(resp) {
        console.log(resp.razorpay_payment_id),
        console.log(resp.razorpay_order_id),
        console.log(resp.razorpay_signature)}); // will pass payment ID, order ID, and Razorpay signature to success handler.
    
      razorpay.on('payment.error', function(resp){console.log(resp.error.description)
        alert(resp.error.code);
        alert(resp.error.description);
        alert(resp.error.source);
        alert(resp.error.step);
        alert(resp.error.reason);
        alert(resp.error.metadata);
      }); // will pass error object to error handler
  }
  paywithcashfree(){
    console.log(this.credit_debit_form.value)
    this.urlservice.cashfreepay({total:500}).subscribe((data)=>{
      console.log(data)
      setTimeout(() => {
        this.urlservice.confirmcashfreepayment({postdata:data.postdata},data.url).subscribe((data)=>{
          console.log(data)
        })
      }, 3000);
    
  })

  }
  stripepaymentint()
  {
    console.log("stripe payment in init")
    
    var elements = this.stripe.elements();
    
    
    this.urlservice.stripePaymentIntent({total:500}).subscribe((data)=>{
      console.log(data)
      this.stripeclientid= data.clientSecret;
    
    
     })
    // Stripe injects an iframe into the DOM
    setTimeout(() => {
      this.stripecarrdnumber = elements.create('cardNumber',
     
      {
        placeholder:'',
        style: {
        base: {
        
          fontWeight: 300,
          fontFamily: 'Montserrat',
          fontSize: '16px',
          
          lineHeight:"35px",

          '::placeholder': {
            color: '#87BBFD',
            
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    });
      this.stripecarrdnumber.mount('#card_number');
      var cardExpiry = elements.create('cardExpiry',{style: {
        base: {
        
          fontWeight: 300,
          fontFamily: 'Montserrat',
          fontSize: '16px',
          
          lineHeight:"35px",

          '::placeholder': {
            color: '#87BBFD',
            
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    });
      cardExpiry.mount('#card_expiry');
      var cardCvc = elements.create('cardCvc',{style: {
        base: {
        
          fontWeight: 300,
          fontFamily: 'Montserrat',
          fontSize: '16px',
          
          lineHeight:"35px",

          '::placeholder': {
            color: '#87BBFD',
            
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    });
      cardCvc.mount('#card_cvv');
    }, 3000);
    
   // var cardNumberElement = elements.create('cardNumber');
  }
  paywithstripe()
  { 
   // loading(true);
    this.stripe
      .confirmCardPayment(this.stripeclientid, {
        payment_method: {
          card: this.stripecarrdnumber
        }
      })
      .then(function(result) {
        if (result.error) {
          // Show error to your customer
          console.log(result.error.message);
        } else {
          // The payment succeeded!
          console.log(result.paymentIntent);
        }
      });
    // this.stripe.createToken(this.stripecarrdnumber).then(function(result){
    //   console.log(result)
    // });
  };
  
}
