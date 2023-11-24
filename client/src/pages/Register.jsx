import { useContext } from 'react'
import { Alert , Button , Col , Stack , Form , Row } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

function Register() {
  const {registerInfo , updateRegisterInfo ,registerUser , registerError , isRegisterLoading} = useContext(AuthContext)



  return (
    <>
    <Form onSubmit={registerUser}>
      <Row style={{
        height: "100vh",
        justifyContent: "center",
        paddingTop: "10%"
      }}>
        <Col  xs={6}>
        <Stack gap={3}>
          <h2>Register</h2>


          <Form.Control type="text" placeholder='Name' onChange={(e) => {
            updateRegisterInfo({...registerInfo, name: e.target.value})
            console.log(registerInfo)
          }}/>
          <Form.Control type="email" placeholder='Email' onChange={(e) => {
            updateRegisterInfo({...registerInfo, email: e.target.value})
            console.log(registerInfo)
          }} />
          <Form.Control type="password" placeholder='Password' onChange={(e) => {
            updateRegisterInfo({...registerInfo, password: e.target.value})
            console.log(registerInfo)
          }}/>
          <Button type="submit" variant='primary'>{isRegisterLoading? "creating your account" : "Register"}</Button>
          {
            // console.log(registerError) 
            registerError?.error &&  <Alert variant='danger'>
            <p>{registerError.message.msg}</p>  
          </Alert>
          }
          
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register