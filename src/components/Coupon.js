// src/components/Coupon.js
import React, { useState } from 'react';

const Coupon = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    onApplyCoupon(couponCode);
  };

  return (
    <div className="coupon">
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default Coupon;