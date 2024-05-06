import { Typography } from "antd"


function AppFooter(){
    return(
        <>
          <div className="footer">
           <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
           <Typography.Link href="https://www.google.com" target="_blank">Privacy Policy</Typography.Link>
           <Typography.Link href="https://www.google.com" target="_blank">Term of Use</Typography.Link>

          </div> 
        </>
    )
}
export default AppFooter