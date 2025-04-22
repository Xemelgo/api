---
title: ""
pagination_next: null
pagination_prev: null
---

import DynamicText from '@site/src/components/DynamicText';
import React from 'react';

export default function Homepage() {
  return (
    <>
      <h1 style={{ color: '#0D8CFF', fontSize: '2.5rem' }}>Xemelgo API Documentation</h1>

      <h2 style={{ fontSize: '2rem' }}>
        Manage your <strong><DynamicText /></strong> from anywhere.
      </h2>

      <p style={{ fontSize: '1.2rem' }}>
        The Xemelgo suite of solutions helps businesses improve efficiency, reduce waste, and boost profitability. 
        From raw materials to finished goods, our award-winning solutions transform your operations with real-time visibility.
      </p>

      <h2 style={{ color: '#0D8CFF', fontSize: '2rem' }}>About Xemelgo</h2>
      <p style={{ fontSize: '1.2rem' }}>
        Xemelgo is a suite of intelligent software solutions designed to bring real-time visibility and efficiency to 
        manufacturing, supply chain operations, and more! Whether you're tracking assets, managing inventory, or streamlining 
        production workflows, Xemelgo empowers businesses to reduce waste, boost productivity, and make data-driven decisions.
      </p>

      <h2 style={{ color: '#0D8CFF', fontSize: '2rem' }}>About this Documentation</h2>
      <p style={{ fontSize: '1.2rem' }}>
        This API documentation is your gateway to integrating with the Xemelgo platform. Here, you’ll find detailed guides 
        and references for working with our Asset, Inventory, Transfer Order, and Work-In-Process APIs — everything you 
        need to automate processes, connect systems, and unlock the full potential of your operations.
      </p>
    </>
  );
}
