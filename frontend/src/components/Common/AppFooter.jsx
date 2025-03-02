import React from 'react';

const AppFooter = () => {
  return (
    <>
        <footer id="f_content_sticky" className="site-footer bg-dark text-center py-4">
            <div className="container">
              <div className="row">
                {/* Logo Section */}
                <div className="col-md-12 mb-4">
                  <figure>
                    <a href="#">
                    <img src="assets/images/logo.png" alt="Site Logo" className="site_logo" />
                    </a>
                  </figure>
                </div>

                {/* Address Section */}
                <div className="col-md-12 mb-4">
                  <p>
                    Address: 12, Civil Line Dewas (M.P.) 455001 | Phone: +999 2345 4321 | E-mail: info@itgeeksin.com
                  </p>
                </div>
              </div>
            </div>
        </footer>
    </>  
  )
}

export default AppFooter;
