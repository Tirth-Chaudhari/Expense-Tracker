import styled from "styled-components";
import bg from '../img/bg.png';
export const MainLayout=styled.div`  
    padding:2rem;
    ${'' /* padding-left:0rem; */}
    ${'' /* padding-right:0rem; */}
    height:100% ;
    display:flex;
    gap:1rem;
    background-image: url(${bg});
    @media screen and (max-width: 1000px) {
        padding:0rem;
        gap:0rem;
       
    }  
`;

export const InnerLayout=styled.div`
    padding:2rem 1.5rem;
    width:95%;
    
    
`;