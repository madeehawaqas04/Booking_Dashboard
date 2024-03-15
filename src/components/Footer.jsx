import React from 'react'

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      {/* /.content-wrapper */}
     
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <div className="text-muted text-center text-sm-centre d-block d-sm-inline-block">
                <span><strong>Copyright &copy; {year} Stack Soft </strong></span>
              </div>
            </div>
          </footer>
    </>
  )
}

export default Footer
