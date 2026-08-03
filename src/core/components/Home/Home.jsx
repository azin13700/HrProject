import "./Home.scss";
import {
    getUserData,
    getSelectedRole,
    
  } from "../../../api/authService";


function Home(){
    const userData  = getUserData();
   const userFullName = userData.fullName;
   const selectedRole = getSelectedRole();
  const userRole = selectedRole?.roleDescription || '';

 const userUnitName = selectedRole?.unitName || 'واحد نامشخص';

    return (
        <div class="home-container">
  
        <div class="home-content" >
          
          <div class="user-card">
            <div class="user-avatar">
              <i class="pi pi-user"></i>
            </div>
            <div class="user-info">
              <h2>خوش آمدید</h2>
              <h1>{ userFullName }</h1>
              <div class="user-details">
                <span class="detail-item">
                  <i class="pi pi-shield"></i>
                  نقش: <strong>{ userRole }</strong>
                </span>
                <span class="detail-item">
                  <i class="pi pi-building"></i>
                  واحد: <strong>{ userUnitName }</strong>
                </span>
              </div>
            </div>
          </div>
      
        </div>
      
      </div>
    )
}

export default Home;