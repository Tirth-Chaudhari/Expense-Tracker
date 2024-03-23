
import { signout } from "../utils/Icon";
import ReactDOM from 'react-dom'
import { Menu } from "../utils/Menu";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { pen } from "../utils/Icon";
import user_logo from "../img/user_logo.jpg"
import { useGlobalContext } from "../context/globalcontext";
import { Upload_Preset } from "../config/CloudConfig";
import { Cloudinary_Name } from "../config/CloudConfig";

const Nav = ({active,setActive,isSidebarOpenFunc})=>
{
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);

    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      isSidebarOpenFunc();
    };

    const [profileImage, setProfileImage] = useState(localStorage.getItem("photoImage")); // Default image path
    const [userName, setUserName] = useState(localStorage.getItem("name"));
    const [isEditingName, setIsEditingName] = useState(false);
    const {setUserImage,setUserProfileName,Username,ImageUrl}=useGlobalContext();

    useEffect(()=>{
        const ImageUrl=localStorage.getItem("ImageUrl");
        const  Username=localStorage.getItem("name1");
        console.log(ImageUrl);
        console.log(Username);
        if(ImageUrl!='undefined')
        {
         setProfileImage(ImageUrl);
        }
        if(Username!='undefined')
        {
        setUserName(Username);
        }
    
    },[])
    
    const handleImageChange = (event) => {
        
        
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
       
        reader.readAsDataURL(file);
        
        uploadToCloudinary(file);
      }
     
      
    };

    
 const uploadToCloudinary=(image)=>
    {
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset",Upload_Preset);
        data.append("cloud_name", Cloudinary_Name);

        fetch(`https://api.cloudinary.com/v1_1/${Cloudinary_Name}/image/upload`,{
            method:"post",
            body:data
        }).then(response => response.json())
        .then(data => {
            setProfileImage(data.url);
            localStorage.setItem("ImageUrl",data.url);
            setUserImage(data.url);
        }) .catch(error => {
            console.error('Error uploading to Cloudinary:', error);
          });
    }


   
  
    const handleNameChange = (event) => 
    {
      setUserName(event.target.value)
     
    };
    const handleEditNameClick = () => {
        setIsEditingName(true);
      };
    
      const handleSaveNameClick = () => {
        setUserProfileName(userName);
        localStorage.setItem("name1",userName);
        setIsEditingName(false);
      };
    
    return(<>

        
            <ToggleButton onClick={handleToggleSidebar}>
                    <span>&#9776;</span>
            </ToggleButton>

           
            <Navstyle isSidebarOpen={isSidebarOpen}>
        
                    <div className="item" id="profile">
                            <ProfileContainer>
                                <ProfileImage src={profileImage}
                                                alt="Profile"
                                                onClick={() => document.getElementById("profileImageInput").click()} />
                                <input
                                type="file"
                                id="profileImageInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                />
                            {isEditingName ? (
                                <>
                            <ProfileNameInput
                                type="text"
                                placeholder="Enter name"
                                // value={newName}
                                onChange={handleNameChange}
                            />
                            </>
                        ) : (
                            <ProfileName>{userName}</ProfileName>
                        )}
                        <EditButton onClick={isEditingName ? handleSaveNameClick : handleEditNameClick}>
                            {isEditingName ? "Save" : pen}
                        </EditButton>

                            </ProfileContainer>
            </div>
                        <ul className="menu-items">
                                {Menu.map((item)=>
                                {
                                    const {id,title,icon,link}=item;
                                    return(
                                        <li key={id} onClick={()=>setActive(id)}
                                        className={active===id ? 'active': ''}>
                                            <span className="icon">{icon}</span>
                                            <span className="title">{title}</span>
                                        </li>
                                    )
                                    
                                })}
                        </ul>
                       
         
                
            </Navstyle>
    
        </>
    )
}




const ToggleButton = styled.button` 
  display:none;
  @media screen and (max-width: 1000px) { 
    display: block; /* show the button when screen width is 600 pixels or less */
    position: fixed;
    top: .1rem;
    left: .5rem;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1001;
     }
`;  
const Navstyle=styled.nav`
    padding: 1.5rem 0rem;
    width: 13rem;
    overflow-x: hidden;
    transition: width 0.5s;
    ${'' /* height: 100%;    */}
    ${'' /* background: rgba(250, 250 , 250, 0.75 ); */}
    background:rgba(0, 0, 0, 0.01) ;
    border: 0.02rem solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:2rem;
    &:hover
    {
        width:13rem;
    }
    .user-con{
        height: 6.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        img{
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
    ul
    {
        padding:0rem;
    }
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap:1rem;    
        margin-left:1rem;
        .title
        {
            margin-left:1.3rem;
        }
        .icon
        {
           
        } 
        li{ 
            display: grid;
            grid-template-columns: 40px auto;
            margin: .6rem 0;
           
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);    
            position: relative;     
            i{
                color: rgba(34, 34, 96, 0.6);
                
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }   

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
      
    }
    .bottom-nav
    {
        padding:0rem;
        gap:1rem;    
        margin-left:1rem;
        li
        {
            display: grid;
            grid-template-columns: 40px auto;
            margin: .6rem 0;
           
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);    
            position: relative;     
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
        i
        {
            font-size: 1.4rem;
            color: rgba(34, 34, 96, 0.6);
            transition: all .4s ease-in-out;
        }
            

            
    }
    @media screen and (max-width: 1000px) {
    
        width: ${(props) => (props.isSidebarOpen ? "25%":"0%")};
        position: fixed;
        background-color:rgb(240, 230, 235);
        ${'' /* overflow-y:auto; */}
        top: 0;
        left: 0;
        height: 100%;
        z-index: 1000;
        &:hover {
        width: 13rem;
        }
    }
    @media screen and (max-width: 815px) {
    
    width: ${(props) => (props.isSidebarOpen ? "30%":"0%")};
    position: fixed;
    background-color:rgb(240, 230, 235);
    overflow-y:auto;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    &:hover {
    width: 13rem;
    }
}
    @media screen and (max-width:560px) {
    
    width: ${(props) => (props.isSidebarOpen ? "50%":"0%")};
    position: fixed;
    background-color:rgb(240, 230, 235);
    overflow-y:auto;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    &:hover {
    width: 13rem;
    }
}

`;



const ProfileContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ProfileImage = styled.img`
  width:9rem;
  height:8rem;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor:pointer;
`;

const ProfileName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProfileNameInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  width: 80%;
  border:none;
  outline:none;
  padding:2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: transparent;
`;
const EditButton = styled.button`

  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 2px 10px;
  cursor: pointer;
`;

export default Nav;