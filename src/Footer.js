import React from 'react'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import "./assets/dashboard.css"

export default function footer() {
  return (
      <footer className=" footer--pin bg-dark text-center text-white">
      <div className=" p-4 pb-0">
     <section className="mb-4">
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fa fa-twitter"></i></a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fa fa-github"></i></a>
    </section>
  
    </div>
    </footer>
  )
}
