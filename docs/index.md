---
title: ""
pagination_next: null
pagination_prev: null
---

import DynamicText from '@site/src/components/DynamicText';
import React, { useState } from 'react';

export default function Homepage() {
  const [hoverStart, setHoverStart] = useState(false);
  const [hoverKB, setHoverKB] = useState(false);

  return (
    <>
      <h1 style={{ color: '#004FDB' }}>Welcome to the Xemelgo API Documentation Portal</h1>

      <p>Use the <strong>sidebar on the left</strong> to navigate through the available API documentation.</p>

      <h2>Manage your <strong><DynamicText /></strong> from anywhere.</h2>

      <p>
        The Xemelgo suite of solutions helps businesses improve efficiency, reduce waste, and boost profitability. 
        From raw materials to finished goods, our award-winning solutions transform your operations with real-time visibility.
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Get Started Button */}
        <a
          href="https://xemelgo.com/demo"
          style={{
            display: 'inline-block',
            padding: '15px 30px', /* Increased size */
            background: hoverStart ? '#003EA5' : '#004FDB',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px', /* Bigger text */
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '6px',
            transition: 'background 0.2s ease-in-out, box-shadow 0.3s ease',
            boxShadow: hoverStart ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.15)',
            border: 'none',
            width: '180px',
            height: '60px', /* Equal height for balance */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={() => setHoverStart(true)}
          onMouseLeave={() => setHoverStart(false)}
        >
          Get Started
        </a>

        {/* Knowledge Base Button */}
        <a
          href="https://xemelgo.freshdesk.com/support/home"
          style={{
            display: 'inline-block',
            padding: '15px 30px', /* Same increased size */
            background: hoverKB ? '#003EA5' : '#004FDB',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px', /* Bigger text */
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '6px',
            transition: 'background 0.2s ease-in-out, box-shadow 0.3s ease',
            boxShadow: hoverKB ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.15)',
            border: 'none',
            width: '180px',
            height: '60px', /* Equal height for balance */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={() => setHoverKB(true)}
          onMouseLeave={() => setHoverKB(false)}
        >
          Knowledge Base
        </a>
      </div>
    </>
  );
}
