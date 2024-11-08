"use client";

import Header from "@/components/student/header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { captureAndFinalizePaymentService } from "@/actions/payment/payment";
import { Suspense } from "react";
const PaymentReturn = () => {
 const searchParams = useSearchParams()
 const paymentId = searchParams.get('paymentId') ;
 const payerId= searchParams.get('PayerID') 
  



 useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student/boughtCourse";
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);
 
  


  return (
    <Suspense>
    <div>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Processing payment... Please wait</CardTitle>
        </CardHeader>
      </Card>
    </div>
    </Suspense>
  );
};

export default PaymentReturn;
