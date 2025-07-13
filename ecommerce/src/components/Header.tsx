import React from 'react'

const Header = () => {
  return (
    <div className='header'>
        <h1>Welcome to Our E-commerce Store</h1>
        <nav>
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header