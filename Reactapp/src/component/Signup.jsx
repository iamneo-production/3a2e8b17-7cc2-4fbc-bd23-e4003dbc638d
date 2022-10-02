import userEvent from '@testing-library/user-event';
import React,{useRef} from 'react'
import { Navbar,Container,Nav, } from 'react-bootstrap';
import axios from 'axios';
import  { useNavigate } from 'react-router-dom'

const Signup = ()=>{

    const email = useRef("");
    const password = useRef("");
    const cnfPassword = useRef("");
    const userName = useRef("");
    const mobileNum = useRef("");
    const role = useRef("");
    const navigate = useNavigate();

    const handlesignUp = ()=>{
        
        const emailV = email.current.value;
        const passwordV = password.current.value;
        const roleV = role.current.value;
        const cnfPasswordV = cnfPassword.current.value;
        const mobileNumV = mobileNum.current.value;
        const userNameV = userName.current.value;

        if(roleV=="" || emailV=="" || passwordV=="" || cnfPasswordV=="" ||  mobileNumV=="" || userNameV==""){
            alert("please fill all the required fields");
            return;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[com]+$/.test(emailV))) {
            alert("email is not valid");
            return;
        }
        if(!(/^[0-9]/.test(mobileNumV))){
            alert("Invalid mobile number");
            return;
        }
        if(cnfPasswordV!=passwordV){
            alert("password didn't match");
            return;
        }
        const obj = {
            email: emailV,
            password: passwordV,
            userName: userNameV,
            mobileNumber: mobileNumV,
            userRole: roleV
        }
        console.log(obj)
        if(roleV == "USER"){
            axios.post("http://localhost:8081/user/signup",obj)
            .then((resp)=>{
                if(resp.data == "User added"){
                    alert("user registered");
                    navigate('/login');
                }
                else{
                    alert("user registration failed:: "+resp.data);
                }
            })
            .catch((err)=>{
                alert("Something went wrong");
            })
        }
        else{
            axios.post("http://localhost:8081/admin/signup",obj)
            .then((resp)=>{
                if(resp.data == "Admin added"){
                    alert("admin registered");
                    navigate('/login');
                }
                else{
                    alert("admin registration failed:: "+resp.data);
                }
            })
            .catch((err)=>{
                alert("Something went wrong");
            })
        }
    }

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
            <Navbar.Brand href="#"  style={{ paddingLeft: '0px' }} ><h3>ABACUS ACADEMY ADMISSION PORTAL</h3><a href="/"></a></Navbar.Brand>
                    
            <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    ></Nav>
                    
            </Container>
            </Navbar>
            <h5><marquee>A foundation that can help you advance into higher math algebra, geometry and modern math. Learn easy tricks and shortcuts.</marquee></h5>
            <div class="mh-100  col-7 mt-5 d-inline-block bg-info bg-gradient rounded-lg border border-white">
            
                <div  class="container col-3 mt-5  mb-5 form-group col-lg-">
                <h3> Register</h3>
                    <select  id="user/admin" class="form-control" aria-label="Default select example" ref={role}>
                        <option value="" selected>Admin/User</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select><br/><br></br>
                    <input type="text" id="email" ref={email} class='form-control' placeholder="Enter Email Address" aria-label="Username" aria-describedby="basic-addon1" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    <input type="text" id="username" ref={userName} class='form-control' placeholder="Enter Username" aria-label="Username" aria-describedby="basic-addon1" /><br/>
                    <input type="text" id="mobileNumber" ref={mobileNum} class='form-control' placeholder="Enter mobileNumber" aria-label="Username" aria-describedby="basic-addon1" /><br/>
                    <input type="password" id="password" ref={password} class='form-control' placeholder="Enter password" aria-label="Username" aria-describedby="basic-addon1" /><br/>
                    <input type="password" id="confirmPassword" ref={cnfPassword} class='form-control' placeholder="Enter confirm Password" aria-label="Username" aria-describedby="basic-addon1" /><br/>
                    <button type="button" id="submitButton" class="btn btn-secondary" onClick={handlesignUp}>Submit</button><br/>
                    Already Have Account?
                    <a id="signinLink" href="/login">Login</a>
                </div>
            </div>
            
        </>
    )
}

export default Signup;